import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "dist/**",
            "build/**",
            "public/**",
            "*.config.js",
            "*.config.mjs",
            "coverage/**",
            "out/**"
        ]
    },
    ...compat.config({
        extends: ["next/core-web-vitals"],
        plugins: ["@typescript-eslint"],
        rules: {
            // Additional custom rules
            "no-console": "warn",
            "prefer-const": "error",
            "no-var": "error",
            "@typescript-eslint/no-explicit-any": "warn"
        }
    })
]);