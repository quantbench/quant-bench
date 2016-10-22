export class SlidingWindow<TInputType> {
    public windowSize: number;
    private data: TInputType[];
    private dataSize: number;

    constructor(windowSize: number) {
        this.windowSize = windowSize;
        this.data = new Array<TInputType>(windowSize);
    }

    add(valueToAdd: TInputType) {
        if (this.dataSize < this.windowSize) {
            this.data[this.dataSize] = valueToAdd;
            this.dataSize++;
        } else {
            this.data.forEach((value, index) => {
                if (index > 0) {
                    this.data[index - 1] = value;
                }
            });
            this.data[this.windowSize - 1] = valueToAdd;
        }
    }

    peek(): TInputType {
        return this.data[0];
    }
}
