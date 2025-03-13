module.exports = {
  "*.{js,jsx,vue}": [
    "vue-cli-service lint",
    "git add"
  ],

  "*.{json,md}": [
    "prettier --write",
    "git add"
  ],
  
  "*.{css,scss}": [
    "stylelint --fix",
    "git add"
  ],
  
  "*.{vue}": [
    "prettier --write",
    "stylelint --fix",
    "vue-cli-service lint",
    "git add"
  ]
};