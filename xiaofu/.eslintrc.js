module.exports = {
   root: true,
   'extends': [
      'plugin:vue/essential',
      '@vue/standard'
   ],
   rules: {
      // allow async-await
      'generator-star-spacing': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
      'indent': [2, 3],
      'no-undef': 'off',
      'camelcase': 'off'
   },
   plugins: ['html', 'standard'],
   parserOptions: {
      parser: 'babel-eslint'
   }
}
