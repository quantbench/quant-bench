export class Queue<TInputType> {
    private data: TInputType[];

    constructor() {
        this.data = new Array<TInputType>();
    }

    get count(): number {
        return this.data.length;
    }

    enqueue(valueToEnqueue: TInputType) {
        this.data.push(valueToEnqueue);
    }

    dequeue() {
        this.data.splice(0, 1);
    }

    peek(): TInputType {
        return this.data[0];
    }
}
