module.exports = {
    extends: ['airbnb-base', 'plugin:vue/strongly-recommended'],
    plugins: ['import', 'html'],
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never',
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'max-len': [
            'warn',
            200,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'no-console': 0,
        'no-mixed-operators': [
            'error',
            {
                groups: [
                    ['&', '|', '^', '~', '<<', '>>', '>>>'],
                    ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                    ['&&', '||'],
                    ['in', 'instanceof'],
                ],
                allowSamePrecedence: true,
            },
        ],
        'no-param-reassign': [
            'error',
            {
                ignorePropertyModificationsFor: ['state'],
            },
        ],
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        'no-shadow': [
            'error',
            {
                allow: ['getters', 'state'],
            },
        ],
        'prefer-destructuring': [
            'error',
            {
                object: false,
                array: false,
            },
        ],
        'vue/html-indent': ['error', 4],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'any',
                },
            },
        ],
        'vue/max-attributes-per-line': 0,
        'vue/script-indent': [
            'error',
            4,
            {
                baseIndent: 1,
            },
        ],
        'vue/singleline-html-element-content-newline': 0,
    },
    overrides: [
        {
            files: ['*.vue'],
            rules: {
                indent: 'off',
            },
        },
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
            },
        },
    },
};
