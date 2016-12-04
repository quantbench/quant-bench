export class SlidingWindow<TInputType> {

    static INVALID_WINDOW_SIZE = "Sliding window must have size of at least 1.";
    static INVALID_WINDOW_INDEX = "Sliding window index must be between 0 and count ";

    private data: TInputType[];
    private windowSize: number;

    constructor(windowSize: number) {
        this.data = new Array<TInputType>();

        if (windowSize < 1) {
            throw new Error(SlidingWindow.INVALID_WINDOW_SIZE);
        }
        this.windowSize = windowSize;
    }

    get count(): number {
        return this.data.length;
    }

    get size(): number {
        return this.windowSize;
    }

    add(valueToAdd: TInputType) {
        this.data.push(valueToAdd);
        if (this.data.length > this.windowSize) {
            this.data.splice(0, 1);
        }
    }

    getItem(index: number): TInputType {
        if (index >= this.data.length) {
            throw new Error(SlidingWindow.INVALID_WINDOW_INDEX + this.data.length + ": " + index);
        }
        return this.data[this.data.length - index - 1];
    }

    clear() {
        this.data.length = 0;
    }
}
