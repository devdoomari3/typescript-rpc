module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx",
                ],
            },
        },
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        // "airbnb",
        // "plugin:import/errors",
        // "plugin:import/warnings",
        "plugin:import/typescript",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/explicit-function-return-type": 'off',
        "@typescript-eslint/no-explicit-any": 'off',
        "@typescript-eslint/no-inferrable-types": 'off',
    }
};