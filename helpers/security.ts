export function sanitizeInput(input: string): string {
    if (!input || typeof input !== "string") return "";
    // Remove all special characters to avoid all potential injections (XSS, SQL injection, etc.)
    return input.replace(/[^a-zA-Z0-9\s]/g, "");
}