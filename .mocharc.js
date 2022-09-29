require('dotenv').config({ silent: true })

module.exports = {
  recursive: true,
  spec: './test/**/*.test.js',
  timeout: 20000
}
