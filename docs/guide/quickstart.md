# 快速上手

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

``` javascript
import Vue from 'vue'
import RelaxUI from 'relax-ui'

Vue.use(RelaxUI)

new Vue({
    el: '#app',
})
```

## 按需引入

``` javascript
import Vue from 'vue'
import { ReConverter, ReDescriptions, ReDetail } from 'relax-ui'

Vue.use(RelaxButton)
Vue.use(ReDescriptions)
Vue.use(ReDetail)
new Vue({
    el: '#app',
})
```
