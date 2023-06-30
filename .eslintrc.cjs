module.exports = {
    root: true,
    extends: [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        "vue/multi-word-component-names": 0,
        "vue/no-reserved-component-names": "warn",
        "no-debugger": "warn",
        "no-useless-escape": "off"
    },
    ignorePatterns: ["**/dist/**", "**/*.config.*"],
};
