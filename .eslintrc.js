module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        semi: ['error', 'always'],
        quotes: ['error', 'double'],
        'prefer-const': 'error',
        'no-unused-vars': 'error',
        'space-before-function-paren': ['error', 'always'],
        'keyword-spacing': 'error',
        'space-infix-ops': 'error',
        'space-before-blocks': 'error',

    }
}
