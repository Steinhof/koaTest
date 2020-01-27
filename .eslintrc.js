module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020,
        // project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            impliedStrict: true
        }
    },
    plugins: [
        '@typescript-eslint',
        "tree-shaking",
        // 'prettier' commented as i don't want to run prettier through eslint because performance
    ],
    env: {
        // These environments are not mutually exclusive, so you can define more than one at a time.
        browser: true,
        node: true,
        'shared-node-browser': true,
        es6: true,
        worker: true,
        serviceworker: true,
    },
    globals: {
        page: true,
        browser: true,
        context: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb-typescript', // Package contain: [see: https://www.npmjs.com/package/eslint-config-airbnb-typescript]
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier/@typescript-eslint',
        'prettier',
    ],
    rules: {
        // "typescript/no-var-requires": "off", //Disable require imports
        // 'no-cycle': [2, { maxDepth: 1 }], // Works wrong with express
        "tree-shaking/no-side-effects-in-initialization": 0, // Unstable
        'prettier/prettier': [
            'error',
            {
                'singleQuote': true,
                'trailingComma': 'all',
                'tabWidth': 4,
            }
        ],
    },
    settings: {
        'import/extensions': ['.js', '.ts'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts']
        },
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.js', '.ts']
            }
        },
    }
};
