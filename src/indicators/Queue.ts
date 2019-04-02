export class Queue<TInputType> {
  private data: TInputType[];

  constructor() {
    this.data = new Array<TInputType>();
  }

  public get count(): number {
    return this.data.length;
  }

  public enqueue(valueToEnqueue: TInputType) {
    this.data.push(valueToEnqueue);
  }

  public dequeue(): TInputType {
    const dequeued = this.data[0];
    this.data.splice(0, 1);
    return dequeued;
  }

  public peek(): TInputType {
    return this.data[0];
  }

  public toArray(): TInputType[] {
    return this.data;
  }

  public clear() {
    this.data.length = 0;
  }
}

export function getQueueMin(queue: Queue<number>) {
  let min = Number.MAX_VALUE;
  queue.toArray().forEach((value: number) => {
    if (min > value) {
      min = value;
    }
  });

  return min;
}

export function getQueueMax(queue: Queue<number>) {
  let max = Number.MIN_VALUE;
  queue.toArray().forEach((value: number) => {
    if (max < value) {
      max = value;
    }
  });

  return max;
}

export function getQueueMinIndex(queue: Queue<number>) {
  let min = Number.MAX_VALUE;
  let idx = -1;
  queue.toArray().forEach((value: number, index: number) => {
    if (min > value) {
      min = value;
      idx = index;
    }
  });

  return idx;
}

export function getQueueMaxIndex(queue: Queue<number>) {
  let max = Number.MIN_VALUE;
  let idx = -1;
  queue.toArray().forEach((value: number, index: number) => {
    if (max < value) {
      max = value;
      idx = index;
    }
  });

  return idx;
}
