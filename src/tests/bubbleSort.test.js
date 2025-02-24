import { describe, it, expect } from 'vitest';
import { bubbleSort } from '../algorithms/algorithms.js';



describe('bubbleSort', () => {
    it("should correctly sort an array", () => {
        const input = [5, 3, 8, 4, 2];
        const steps = bubbleSort([...input]);

        const sortedArray = steps[steps.length - 1].array;
        expect(sortedArray).toEqual([2, 3, 4, 5, 8]);
    });

    it("should return empty steps for an already sorted array", () => {
        const input = [1, 2, 3, 4, 5];
        const steps = bubbleSort([...input]);
        expect(steps.length).toBeLessThanOrEqual(input.length);
        expect(steps[steps.length - 1].array).toEqual([1, 2, 3, 4, 5]);
    });

    it("should handle an empty array", () => {
        expect(bubbleSort([])).toEqual([]);
    });

    it("should handle an array with one element", () => {
        expect(bubbleSort([42])).toEqual([{ array: [42], currentIndex: 0, swapIndices: [] }]);
    });
})