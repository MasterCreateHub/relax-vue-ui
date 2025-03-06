module.exports = {
  "*.{js,jsx,vue}": "vue-cli-service lint",
  "*.{json,md}": "prettier --write",
  "*.{css,scss,vue}": "stylelint lint --cache --fix"
};
