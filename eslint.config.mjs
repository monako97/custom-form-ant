import react from '@moneko/core/eslint/react-legacy';

export default [...react, { ignores: ['**/**/*.mdx?', 'lib', 'docs', 'coverage', 'prism.js'] }];
