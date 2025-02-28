const { existsSync, readFileSync, writeFileSync } = require('fs')

const app = './play/src/App.vue'
const example = './play/app.example.vue'

if (!existsSync(app)) {
  writeFileSync(app, readFileSync(example))
}
