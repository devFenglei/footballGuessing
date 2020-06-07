class Promise{
    constructor(excutor) {
        this.status = 'pending';
        this.value = '';
        this.reason = '';
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = (value) => {
            if (this.status === 'pending') {
                this.status = 'resolved';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status === 'pending') {
                this.status = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }
        try {
            excutor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFullfilled, onRejected) {
        if (this.status === 'resolved') {
            onFullfilled(this.value);
        } else if (this.status === 'rejected') {
            onRejected(this.reason);
        } else if (this.status === 'pending') {
            this.onResolvedCallbacks.push(() => {
                onFullfilled(this.value);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}
let p = new Promise((resolve, reject) => {
    setTimeout(()=> {
        resolve('c');
    }, 1000)
})
p.then((value) => {
    console.log(value);
}, (reason) => {
    console.log(reason);
})