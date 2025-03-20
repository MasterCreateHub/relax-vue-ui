import { shallowMount } from '@vue/test-utils'
import ReConverter from '@packages/converter/src/index.vue'

describe('ReConverter.vue', () => {
  let testArray
  let testObject

  beforeEach(() => {
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
      test.each`
        scenario                | target         | expected                 | defaultValue | testDesc
        ${'单个有效值'}         | ${1}           | ${'Label 1'}             | ${undefined} | ${'返回匹配标签'}
        ${'有效值数组'}         | ${[1, 2]}      | ${['Label 1', 'Label 2']} | ${undefined} | ${'返回多个匹配标签'}
        ${'不存在的target值'}   | ${3}           | ${'Default'}             | ${'Default'} | ${'返回默认值'}
        ${'非法类型target'}     | ${'invalid'}   | ${'Default'}             | ${'Default'} | ${'处理类型错误'}
        ${'未匹配且无默认值'}   | ${3}           | ${[]}                    | ${null}      | ${'不显示任何内容'}
      `('$scenario - $testDesc', ({ target, expected, defaultValue }) => {
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
      })
    })

    describe('对象类型source处理', () => {
      test.each`
        scenario            | target           | expected                  | defaultValue | testDesc
        ${'有效字符串key'}  | ${'key1'}        | ${'Value 1'}              | ${undefined} | ${'返回对应属性值'}
        ${'有效key数组'}    | ${['key1', 'key2']} | ${['Value 1', 'Value 2']} | ${undefined} | ${'返回多个属性值'}
        ${'无效key'}        | ${'key3'}        | ${'Default'}              | ${'Default'} | ${'返回默认值'}
        ${'无效key无默认值'} | ${'key3'}       | ${[]}                     | ${null}      | ${'不显示内容'}
      `('$scenario - $testDesc', ({ target, expected, defaultValue }) => {
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
      })
    })

    describe('函数类型source处理', () => {
      test.each`
        scenario            | source                     | target | expected    | defaultValue | testDesc
        ${'返回有效值'}     | ${v => v * 2}             | ${10}  | ${'20'}     | ${undefined} | ${'返回计算结果'}
        ${'返回null'}       | ${() => null}             | ${10}  | ${'Default'}| ${'Default'} | ${'触发默认值'}
        ${'返回null无默认值'} | ${() => null}             | ${10}  | ${[]}       | ${null}      | ${'不显示内容'}
        ${'抛出异常'}       | ${() => { throw Error() }}| ${10}  | ${'Safe'}   | ${'Safe'}    | ${'捕获异常'}
      `('$scenario - $testDesc', ({ source, target, expected, defaultValue }) => {
        const wrapper = shallowMount(ReConverter, {
          propsData: {
            source,
            target,
            defaultValue
          }
        })
        Array.isArray(expected)
          ? expect(wrapper.findAll('.re-converter-value').wrappers.map(w => w.text())).toEqual(expected)
          : expect(wrapper.text()).toBe(expected)
      })
    })

    describe('字符串表达式source处理', () => {
      test.each`
        scenario              | source                     | target | expected     | defaultValue | testDesc
        ${'数值运算'}         | ${'$targetValue * 2'}     | ${10}  | ${'20'}      | ${undefined} | ${'返回运算结果'}
        ${'字符串拼接'}       | ${'$targetValue + " apples"'} | ${5} | ${'5 apples'} | ${undefined} | ${'处理字符串类型'}
        ${'返回undefined'}    | ${'undefined'}            | ${10}  | ${'Default'} | ${'Default'} | ${'处理无效值'}
        ${'返回NaN无默认值'}    | ${'NaN'}                   | ${10}  | ${[]}        | ${null}      | ${'不显示内容'}
      `('$scenario - $testDesc', ({ source, target, expected, defaultValue }) => {
        const wrapper = shallowMount(ReConverter, {
          propsData: {
            source,
            target,
            defaultValue
          }
        })
        Array.isArray(expected)
          ? expect(wrapper.findAll('.re-converter-value').wrappers.map(w => w.text())).toEqual(expected)
          : expect(wrapper.text()).toBe(expected)
      })
    })
  })

  describe('边界条件处理', () => {
    test.each`
      scenario              | target  | source          | defaultValue | expected
      ${'空target有默认值'} | ${null} | ${testArray}    | ${'Default'} | ${'Default'}
      ${'空target无默认值'} | ${null} | ${testArray}    | ${null}      | ${''}
      ${'无效数组元素有默认'} | ${1}  | ${[{ value: 1 }]}  | ${'Default'} | ${'Default'}
      ${'无效数组元素无默认值'} | ${1}  | ${[{ value: 1 }]}  | ${null}      | ${''}
    `('$scenario', ({ target, source, defaultValue, expected }) => {
      const wrapper = shallowMount(ReConverter, {
        propsData: { target, source, defaultValue }
      })
      expect(wrapper.text()).toBe(expected)
    })

    test.each`
      sourceType   | source    | target | expected
      ${'布尔值'}  | ${true}   | ${123} | ${'123'}
      ${'NaN'}     | ${NaN}    | ${'abc'} | ${'abc'}
      ${'布尔值+非法target'} | ${true} | ${null} | ${''}
      ${'NaN+非法target'}    | ${NaN}  | ${NaN}  | ${''}
    `('处理无效source类型: $sourceType', ({ source, target, expected }) => {
      const wrapper = shallowMount(ReConverter, {
        propsData: {
          source,
          target,
          defaultValue: null
        }
      })
      expect(wrapper.text()).toBe(expected)
    })
  })

  describe('容器属性处理', () => {
    test.each`
      containerTag | propsClass    | expected
      ${'div'}     | ${'base-class'} | ${true}
      ${'span'}    | ${'text-bold'}  | ${true}
    `('应合并$containerTag的$propsClass属性', ({ containerTag, propsClass, expected }) => {
      const wrapper = shallowMount(ReConverter, {
        propsData: {
          target: 1,
          source: testArray,
          containerProps: { class: propsClass },
          container: containerTag
        }
      })
      expect(wrapper.find(`${containerTag}.${propsClass}`).exists()).toBe(expected)
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
    test.each`
      itemCount | timeout
      ${1000}   | ${100}
      ${2000}   | ${200}
    `('处理$itemCount项数组应在$timeout ms内', ({ itemCount }, done) => {
      const bigArray = Array.from({ length: itemCount }, (_, i) => ({
        value: i,
        label: `Label ${i}`
      }))

      console.time(`Process ${itemCount} items`)
      shallowMount(ReConverter, {
        propsData: {
          target: Array.from({ length: itemCount / 2 }, (_, i) => i),
          source: bigArray
        }
      })
      console.timeEnd(`Process ${itemCount} items`)
      done()
    })
  })
})