import { isString, isPlainObject, isArray } from 'lodash'
/**
 * @description 模板解析函数，凡是 {{}} 格式的字符串，则将其中的内容转为json表达式并执行
 * @param {string} str 模板字符串
 * @param  {object} context 上下文
 */
function parse(str, context) {
  if (!str || typeof str !== "string") {
    return str;
  }
  const match = str.match(/{{(.+?)}}/);  
  if (match) {
    const expression = match[1]
    try {
      const func = new Function(
        Object.keys(context).join(","),
        "return " + expression
      );

      return func(...Object.values(context));
    } catch (e) {
      return str;
    }
  } else {
    return str;
  }
}

/**
 * @description 模板解析函数，凡是 {{}} 则将其中的内容转为json表达式并执行
 * @param {object} source 源对象
 * @param  {object} context 上下文
 */

function deepParse(source, context){
  const $currentValues = context.$currentValues;

    if (isString(source)) {
      return parse(source, context)
    }
  
    if (isPlainObject(source)) {
      return Object.keys(source).reduce((all, key) => {
               
        const itemContext = { ...context }
  
        if (source.model && $currentValues) {
          itemContext.$value = $currentValues[source.model]
          itemContext.$select = context.$selectedOptions[source.model]
        }
        return { ...all, [key]: deepParse(source[key], itemContext) }
      }, {})
    }
  
    if (isArray(source)) {
      return source.map((item) => {
        return deepParse(item, context)
      })
    }
  
    return source
  }

  export { deepParse }