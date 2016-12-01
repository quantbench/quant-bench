import { SlidingWindow } from "../src/indicators/slidingWindow";

import * as chai from "chai";
chai.should();

describe("Sliding Window", () => {
    let windowSize = 5;
    let window: SlidingWindow<number> = null;

    describe("when constructing", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                window = new SlidingWindow<number>(windowSize);
            } catch (error) {
                exception = error;
            }
        });

        it("should set the window size", () => {
            window.size.should.be.equal(windowSize);
        });

        it("should not throw an exception", () => {
            // exception.should.be.
        });
    });

    describe("when constructing with invalid window size", () => {
        let exception: Error;

        beforeEach(() => {
            try {
                window = new SlidingWindow<number>(0);
            } catch (error) {
                exception = error;
            }
        });

        it("should throw the appropriate exception", () => {
            exception.message.should.equal(SlidingWindow.INVALID_WINDOW_SIZE);
        });
    });

    describe("when adding less than the window size", () => {

        beforeEach(() => {
            window = new SlidingWindow<number>(windowSize);
            window.clear();
            window.add(1);
            window.add(2);
            window.add(3);
        });

        it("should add in order", () => {
            let result = window.getItem(0);
            result.should.be.equal(3);

            result = window.getItem(1);
            result.should.be.equal(2);

            result = window.getItem(2);
            result.should.be.equal(1);
        });

        it("should reflect the correct number of items currently added", () => {
            window.count.should.be.equal(3);
        });
    });

    describe("when adding more than the window size", () => {

        beforeEach(() => {
            window = new SlidingWindow<number>(windowSize);
            window.clear();
            window.add(1);
            window.add(2);
            window.add(3);
            window.add(4);
            window.add(5);
            window.add(6);
        });

        it("should add in order", () => {
            let result = window.getItem(0);
            result.should.be.equal(6);

            result = window.getItem(1);
            result.should.be.equal(5);

            result = window.getItem(2);
            result.should.be.equal(4);

            result = window.getItem(3);
            result.should.be.equal(3);
        });

        it("should reflect the correct number of items currently added up to the window size", () => {
            window.count.should.be.equal(5);
        });
    });

    describe("when retrieving an item with index more than the current count", () => {
        let exception: Error;
        beforeEach(() => {
            window = new SlidingWindow<number>(windowSize);
            window.clear();
            window.add(1);
            window.add(2);
            window.add(3);
        });

        it("should throw an appropriate exception", () => {
            try {
                window.getItem(5);
            } catch (error) {
                exception = error;
            }

            exception.message.should.be.equal(SlidingWindow.INVALID_WINDOW_INDEX + 3);
        });

    });
});
