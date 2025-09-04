import recommended from '@moneko/core/eslint/react';

export default [
  ...recommended,
  { ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', 'prism.js'] },
];
