import jsdoc from "eslint-plugin-jsdoc";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

const config = [
    // configuration included in plugin
    js.configs.recommended,
    jsdoc.configs["flat/recommended"],
    eslintConfigPrettier,
    // other configuration objects...
    {
        files: ["**/*.js"],
        plugins: {
            jsdoc,
        },

        rules: {
            "jsdoc/require-description": "error",
            "no-unused-vars": "warn",
            "no-undef": "off",
        },
    },
];

export default config;
