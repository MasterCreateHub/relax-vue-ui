import { shallowMount } from '@vue/test-utils'
import ReConverter from '@packages/converter/src/index.vue'

describe('ReConverter.vue', () => {
  let testArray
  let testObject
  
  beforeEach(() => {
    // 初始化公共测试数据
    testArray = [
      { value: 1, label: 'Label 1' },
      { value: 2, label: 'Label 2' }
    ]
    
    testObject = {
      key1: 'Value 1',
      key2: 'Value 2'
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('核心功能', () => {
    describe('数组类型source处理', () => {
      const arrayCases = [
        { 
          scenario: '当target为单个有效值时',
          target: 1, 
          expected: 'Label 1',
          testDesc: '应返回匹配的标签'
        },
        { 
          scenario: '当target为有效值数组时',
          target: [1, 2], 
          expected: ['Label 1', 'Label 2'],
          testDesc: '应返回多个匹配标签'
        },
        { 
          scenario: '当target不存在于source时',
          target: 3, 
          expected: 'Default',
          defaultValue: 'Default',
          testDesc: '应返回默认值'
        },
        { 
          scenario: '当target为非法类型时',
          target: 'invalid', 
          expected: 'Default',
          defaultValue: 'Default',
          testDesc: '应处理类型错误并返回默认值'
        }
      ]

      test.each(arrayCases)(
        '$<scenario> - $<testDesc>',
        ({ target, expected, defaultValue }) => {
          const wrapper = shallowMount(ReConverter, {
            propsData: {
              target,
              source: testArray,
              defaultValue
            }
          })

          Array.isArray(expected) 
            ? expect(wrapper.findAll('.re-converter-value').wrappers.map(w => w.text())).toEqual(expected)
            : expect(wrapper.text()).toBe(expected)
        }
      )
    })

    describe('对象类型source处理', () => {
      const objectCases = [
        {
          scenario: '当target为有效字符串key时',
          target: 'key1',
          expected: 'Value 1',
          testDesc: '应返回对应属性值'
        },
        {
          scenario: '当target为有效key数组时',
          target: ['key1', 'key2'],
          expected: ['Value 1', 'Value 2'],
          testDesc: '应返回多个属性值'
        },
        {
          scenario: '当target为无效key时',
          target: 'key3',
          expected: 'Default',
          defaultValue: 'Default',
          testDesc: '应返回默认值'
        }
      ]

      test.each(objectCases)(
        '$<scenario> - $<testDesc>',
        ({ target, expected, defaultValue }) => {
          const wrapper = shallowMount(ReConverter, {
            propsData: {
              target,
              source: testObject,
              defaultValue
            }
          })

          Array.isArray(expected) 
            ? expect(wrapper.findAll('.re-converter-value').wrappers.map(w => w.text())).toEqual(expected)
            : expect(wrapper.text()).toBe(expected)
        }
      )
    })

    describe('函数类型source处理', () => {
      const functionCases = [
        { 
          scenario: '当函数返回有效值时',
          source: (v) => v * 2,
          target: 10,
          expected: '20',
          testDesc: '应返回函数计算结果'
        },
        {
          scenario: '当函数返回null时',
          source: () => null,
          target: 10,
          expected: 'Default',
          defaultValue: 'Default',
          testDesc: '应触发默认值'
        },
        {
          scenario: '当函数抛出异常时',
          source: () => { throw new Error('test') },
          target: 10,
          expected: 'Safe',
          defaultValue: 'Safe',
          testDesc: '应捕获异常并返回默认值'
        }
      ]

      test.each(functionCases)(
        '$<scenario> - $<testDesc>',
        ({ source, target, expected, defaultValue }) => {
          const wrapper = shallowMount(ReConverter, {
            propsData: {
              source,
              target,
              defaultValue
            }
          })
          expect(wrapper.text()).toBe(expected)
        }
      )
    })

    describe('字符串表达式source处理', () => {
      const expressionCases = [
        {
          scenario: '当表达式为数值运算时',
          source: '$targetValue * 2',
          target: 10,
          expected: '20',
          testDesc: '应返回运算结果'
        },
        {
          scenario: '当表达式为字符串拼接时',
          source: '$targetValue + " apples"',
          target: 5,
          expected: '5 apples',
          testDesc: '应正确处理字符串类型'
        },
        {
          scenario: '当表达式返回undefined时',
          source: 'undefined',
          target: 10,
          expected: 'Default',
          defaultValue: 'Default',
          testDesc: '应处理undefined为无效值'
        }
      ]

      test.each(expressionCases)(
        '$<scenario> - $<testDesc>',
        ({ source, target, expected, defaultValue }) => {
          const wrapper = shallowMount(ReConverter, {
            propsData: {
              source,
              target,
              defaultValue
            }
          })
          expect(wrapper.text()).toBe(expected)
        }
      )
    })
  })

  describe('边界条件处理', () => {
    it('处理空target时显示默认值', () => {
      const wrapper = shallowMount(ReConverter, {
        propsData: {
          target: null,
          source: testArray,
          defaultValue: 'Default'
        }
      })
      expect(wrapper.text()).toBe('Default')
    })

    it('处理无效的数组source元素', () => {
      const wrapper = shallowMount(ReConverter, {
        propsData: {
          target: 1,
          source: [{ value: 1 }], // 缺少label属性
          defaultValue: 'Default'
        }
      })
      expect(wrapper.text()).toBe('Default')
    })

    it('处理无效的source类型时应直接显示原始值', () => {
      const wrapper = shallowMount(ReConverter, {
        propsData: {
          target: 123,
          source: true, // 无效类型
          defaultValue: 'Default'
        }
      })
      expect(wrapper.text()).toBe('123')
    })
  })

  describe('容器属性处理', () => {
    it('应合并容器属性和项属性', () => {
      const wrapper = shallowMount(ReConverter, {
        propsData: {
          target: 1,
          source: testArray,
          containerProps: { class: 'base-class' },
          container: 'div'
        }
      })
      expect(wrapper.find('div.base-class').exists()).toBe(true)
    })

    it('应正确处理动态事件绑定', () => {
      const clickHandler = jest.fn()
      const wrapper = shallowMount(ReConverter, {
        propsData: {
          target: 1,
          source: testArray,
          containerEvents: { click: clickHandler }
        }
      })

      wrapper.find('.re-converter-value').trigger('click')
      expect(clickHandler).toHaveBeenCalled()
    })
  })

  describe('性能基准', () => {
    it('处理1000项数组的性能应在100ms内', () => {
      const bigArray = Array.from({ length: 1000 }, (_, i) => ({
        value: i,
        label: `Label ${i}`
      }))

      console.time('LargeArrayProcessing')
      shallowMount(ReConverter, {
        propsData: {
          target: Array.from({ length: 500 }, (_, i) => i),
          source: bigArray
        }
      })
      console.timeEnd('LargeArrayProcessing')
    }, 10000) // 设置10秒超时时间
  })
})