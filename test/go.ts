import { SlidingWindow } from "../src/indicators/slidingWindow";

import * as chai from "chai";
chai.should();

let windowSize = 5;
let window: SlidingWindow<number> = null;

window = new SlidingWindow<number>(windowSize);
window.clear();
window.add(1);
window.add(2);
window.add(3);

let result = window.getItem(0);
result.should.be.equal(3);
result = window.getItem(2);
result.should.be.equal(2);
result = window.getItem(3);
result.should.be.equal(1);
