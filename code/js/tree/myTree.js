class Node {
  constructor(element, parent) {
    this.element = element
    this.parent = parent
    this.left = null
    this.right = null
  }
}

/*
  二叉树
  add(element) 添加节点
*/
class BST {
  constructor(compare) {
    this.root = null
    this.size = 0
    this.compare = compare || this.compare
  }
  compare(e1, e2) {
    return e1 - e2
  }
  add(element) {
    if (this.root === null) {
      this.root = new Node(element, null)
      this.size++
      return false
    }
    let currentNode = this.root
    let parent = null
    let compare = null
    while(currentNode) {
      compare = this.compare(element, currentNode.element)
      parent = currentNode
      if (compare > 0) {
        currentNode = currentNode.right
      } else if (compare < 0) {
        currentNode = currentNode.left
      } else {
        currentNode.element = element
      }
    }

    if (compare > 0) {
      parent.right = new Node(element, parent)
    } else {
      parent.left = new Node(element, parent)
    }
    this.size++
  }
}

const tree = new BST()
tree.add(10)
tree.add(6)
tree.add(15)
tree.add(9)
tree.add(12)
tree.add(11)
tree.add(3)

console.dir(tree, {depth: 100})