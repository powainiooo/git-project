module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      exclude: [/node_modules/],
      selectorBlackList: [
        '.ignore'
      ]
    }
  }
}
