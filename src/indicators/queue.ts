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

    dequeue(): TInputType {
        let dequeued = this.data[0];
        this.data.splice(0, 1);
        return dequeued;
    }

    peek(): TInputType {
        return this.data[0];
    }

    toArray(): TInputType[] {
        return this.data;
    }

    clear() {
        this.data.length = 0;
    }
}
