const { builtinModules } = require('node:module');

const modules = builtinModules.map((mod) => `node:${mod}`);

module.exports = {
  extends: ['plugin:import/electron', 'viki-react'],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',

    'import/no-nodejs-modules': ['error', { allow: [...modules, 'electron'] }],
    'import/no-mutable-exports': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/alt-text': 'off',

    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-nested-ternary': 'off',
    'no-await-in-loop': 'off',
  },
};
