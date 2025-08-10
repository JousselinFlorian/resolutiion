import { sanitizeInput } from "./security";

export function normaliseInput(title: string): string {
    if (!title) return "";

    // First sanitize the input to remove all special characters to prevent injections
    const sanitized = sanitizeInput(title);

    // Remove leading/trailing whitespace
    const normalised = sanitized.trim().toLowerCase();

    // Split by whitespace and filter out empty strings
    const words = normalised.split(/\s+/).filter(word => word.length > 0);

    // Capitalise the first word and keep other words in lowercase
    if (words.length > 0) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }

    // Join words with single spaces
    return words.join(" ");
} 