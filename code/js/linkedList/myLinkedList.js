/*
  链表节点类
  element: 节点元素
  next: next指针
*/
class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

/*
  链表类
  add(index, element) 向链表指定索引添加元素
  add(element) 向链表末尾添加元素
  get(index) 获取链表某个索引的值
  set(index, element) 修改链表某个索引的值
  remove(index) 删除某个索引的值
  clear() 清空链表
*/

class LinkedList {
  constructor() {
    this.head = null
    this.size = 0
  }
  add(index, element) {
    const len = arguments.length  
    if (!len || (len == 2 && (index < 0 || index > this.size))) {
      throw new Error('索引越界')
    }
    if (arguments.length === 1) { // 向尾部添加
      element = index
      index = this.size
    }

    if (index === 0) { // 向头部添加
      const newNode = new Node(element, this.head)
      this.head = newNode
    } else {
      let currentPreEle = this.get(index - 1)
      currentPreEle.next = new Node(element,currentPreEle.next)
    }
    
    this.size++
  }
  get(index) {
    if (index < 0 || index > this.size - 1) {
      throw new Error('索引越界')
    }

    let currentNode = this.head
    for(let i = 0; i < index; i++) {
      currentNode = currentNode.next
    }
    return currentNode
  }
  set(index, element) {
    const currentNode = this.get(index)
    currentNode.element = element
    return currentNode
  }
  remove(index) {
    if (index < 0 || index > this.size - 1) {
      throw new Error('索引越界')
    }
    if (index === 0) {
      this.head = this.head.next
    } else {
      let currentPreEle = this.get(index - 1)
      currentPreEle.next = currentPreEle.next.next
    }
    this.size--
  }
  clear() {
    this.head = null
    this.size = 0
  }
  reverseDeep() { // 链表的反转，递归实现
    function reverse(head) {
      if (head === null || head.next === null) {
        return head
      } else {
        const newHead = reverse(head.next)
        head.next.next = head
        head.next = null
        return newHead
      }
    }
    this.head = reverse(this.head)
    return this.head
  }
  reverseWhile() {
    let head = this.head
    if(head === null || head.next === null) return head
    let newHead = null
    while (head !==null ) {
        let temp = head.next
        head.next = newHead
        newHead = head
        head = temp
    }
    this.head = newHead
    return newHead
  }
}
const ll = new LinkedList()
ll.add(1)
ll.add(2)
ll.add(3)
ll.add(4)
ll.add(5)
// ll.remove(0)

// console.dir(ll,{depth: 100})
// console.log(ll.get(0))
console.dir(ll.reverseWhile(), {depth: 100})
// console.dir(ll,{depth: 100})