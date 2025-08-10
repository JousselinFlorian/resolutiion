import { sanitizeInput } from "../../../helpers/security";

describe("Security Helpers", () => {
    describe("sanitizeInput", () => {
        it("should prevent XSS attacks", () => {
            const maliciousInput = '<script>alert("XSS")</script>';
            const result = sanitizeInput(maliciousInput);
            expect(result).toBe("scriptalertXSSscript");
        });

        it("should prevent SQL injection attacks", () => {
            const maliciousInput = "'; DROP TABLE users; --";
            const result = sanitizeInput(maliciousInput);
            expect(result).toBe(" DROP TABLE users ");
        });
    });
}); 