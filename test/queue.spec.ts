import { Queue } from "../src/indicators/Queue";

import * as chai from "chai";
chai.should();

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
            result[0].should.be.equal(1);
            result[1].should.be.equal(2);
            result[2].should.be.equal(3);
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
            result[0].should.be.equal(2);
            result[1].should.be.equal(3);
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
            result.should.be.equal(2);
        });
    });
});
