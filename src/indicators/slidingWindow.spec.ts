import { SlidingWindow } from "../src/indicators/SlidingWindow";




describe("Sliding Window", () => {
    const windowSize = 5;
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
            expect(window.size).toBe(windowSize);
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
            expect(exception.message).toBe(SlidingWindow.INVALID_WINDOW_SIZE);
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
            expect(result).toBe(3);

            result = window.getItem(1);
            expect(result).toBe(2);

            result = window.getItem(2);
            expect(result).toBe(1);
        });

        it("should reflect the correct number of items currently added", () => {
            expect(window.count).toBe(3);
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
            expect(result).toBe(6);

            result = window.getItem(1);
            expect(result).toBe(5);

            result = window.getItem(2);
            expect(result).toBe(4);

            result = window.getItem(3);
            expect(result).toBe(3);
        });

        it("should reflect the correct number of items currently added up to the window size", () => {
            expect(window.count).toBe(5);
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

            expect(exception.message).toBe(SlidingWindow.INVALID_WINDOW_INDEX + 3 + ": 5");
        });

    });
});
