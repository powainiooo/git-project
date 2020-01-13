module.exports = {
   presets: [
      ['@babel/preset-env', {
         'useBuiltIns': 'entry',
         'targets': {
            'ios': '9',
            'ie': '8'
         }
      }],
      '@vue/app'
   ]
}
