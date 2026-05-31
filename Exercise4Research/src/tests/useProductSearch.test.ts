import { describe, it, expect } from "vitest";

import { filterProducts } from "../store/filterProducts";

const mockProducts = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 1000
    },
    {
        id: 2,
        name: "Book",
        category: "Books",
        price: 20
    },
    {
        id: 3,
        name: "Keyboard",
        category: "Electronics",
        price: 50
    }
];

describe("filterProducts", () => {
    it("should return matching products", () => {
        const result = filterProducts(
            mockProducts,
            "lap"
        );

        expect(result).toHaveLength(1);

        expect(result[0].name).toBe(
            "Laptop"
        );
    });

    it("should be case insensitive", () => {
        const result = filterProducts(
            mockProducts,
            "BOOK"
        );

        expect(result).toHaveLength(1);
    });

    it("should return empty array when no match exists", () => {
        const result = filterProducts(
            mockProducts,
            "phone"
        );

        expect(result).toHaveLength(0);
    });
});