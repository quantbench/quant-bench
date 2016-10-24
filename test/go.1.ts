import { Queue } from "../src/indicators/queue";

import * as chai from "chai";
chai.should();

let queue = new Queue<number>();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue();

let result = queue.peek();
if (result === 2) {
    console.log("fgg");
}
