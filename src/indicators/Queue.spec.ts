import { Queue } from "./Queue";

describe("Queue", () => {
    const queue = new Queue<number>();

    describe("when enqueuing", () => {

        beforeEach(() => {
            queue.clear();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
        });

        it("should enqueue in order", () => {
            const result = queue.toArray();
            expect(result[0]).toEqual(1);
            expect(result[1]).toEqual(2);
            expect(result[2]).toEqual(3);
        });
    });

    describe("when dequeuing", () => {

        beforeEach(() => {
            queue.clear();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.dequeue();
        });

        it("should dequeue from the first in", () => {
            const result = queue.toArray();
            expect(result[0]).toEqual(2);
            expect(result[1]).toEqual(3);
        });
    });

    describe("when peeking", () => {

        beforeEach(() => {
            queue.clear();
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);
            queue.dequeue();
        });

        it("should peek from the first in", () => {
            const result = queue.peek();
            expect(result).toEqual(2);
        });
    });
});
