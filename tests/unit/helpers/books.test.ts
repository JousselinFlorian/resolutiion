import { normaliseInput } from "../../../helpers/books";

describe("Books Helpers", () => {
    describe("normaliseInput", () => {
        it("should normalize basic title formatting", () => {
            const input = "this Is A  title. ";
            const result = normaliseInput(input);
            expect(result).toBe("This is a title");
        });

        it("should handle empty input", () => {
            const result = normaliseInput("");
            expect(result).toBe("");
        });

        it("should handle null and undefined input", () => {
            expect(normaliseInput(null as any)).toBe("");
            expect(normaliseInput(undefined as any)).toBe("");
        });

        it("should sanitize special characters", () => {
            const input = "Hello!@#$%^&*()World";
            const result = normaliseInput(input);
            expect(result).toBe("Helloworld");
        });

        it("should handle single word titles", () => {
            const input = "BOOK";
            const result = normaliseInput(input);
            expect(result).toBe("Book");
        });

        it("should handle multiple spaces between words", () => {
            const input = "The    Great    Gatsby";
            const result = normaliseInput(input);
            expect(result).toBe("The great gatsby");
        });

        it("should handle titles with numbers", () => {
            const input = "Harry Potter and the Chamber of Secrets 2";
            const result = normaliseInput(input);
            expect(result).toBe("Harry potter and the chamber of secrets 2");
        });

        it("should handle titles with mixed case", () => {
            const input = "tHe LoRd Of ThE rInGs";
            const result = normaliseInput(input);
            expect(result).toBe("The lord of the rings");
        });

        it("should handle titles with punctuation", () => {
            const input = "Pride & Prejudice!";
            const result = normaliseInput(input);
            expect(result).toBe("Pride prejudice");
        });

        it("should handle titles with emojis and symbols", () => {
            const input = "The 🌍 World 🚀 Book";
            const result = normaliseInput(input);
            expect(result).toBe("The world book");
        });
    });
}); 