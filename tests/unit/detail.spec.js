import { shallowMount } from '@vue/test-utils'
import ReDetail from '@packages/detail/src/index.vue'

describe('ReDetail.vue', () => {
  const mockSections = [
    {
      name: 'basic',
      label: '基本信息',
      components: [
        {
          name: 'el-input',
          dataKey: 'name',
          dataInProps: 'value',
          props: { readonly: true }
        }
      ]
    },
    {
      name: 'advanced',
      label: '高级信息',
      components: [
        {
          name: 'el-select',
          dataKey: 'type',
          props: { multiple: true }
        }
      ]
    }
  ]

  const mockData = {
    basic: { name: 'Test Item' },
    advanced: { type: ['A', 'B'] }
  }

  describe('Props验证', () => {
    test.each`
      scenario              | sections               | valid  | errorMatcher
      ${'合法sections'}     | ${mockSections}        | ${true}| ${/^$/}
      ${'缺少name'}         | ${[{label: 'Test'}]}   | ${false}| ${/'name'/}
      ${'无效components类型'}| ${[{name:'a',label:'a',components:{}}]} | ${false}| ${/array/}
      ${'缺少dataKey'}      | ${[{name:'a',label:'a',components:[{name:'cmp'}]}]} | ${false}| ${/'dataKey'/}
    `('$scenario', ({ sections, valid, errorMatcher }) => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation()
      
      const validator = ReDetail.props.sections.validator
      expect(validator(sections)).toBe(valid)
      
      if (!valid) {
        expect(consoleError).toHaveBeenCalledWith(expect.stringMatching(errorMatcher), expect.anything())
      }
      
      consoleError.mockRestore()
    })
  })

  describe('核心功能', () => {
    describe('不同展示模式', () => {
      test.each`
        showType   | expectedClass
        ${'simple'}| ${'is-simple'}
        ${'bar'}   | ${'is-bar'}
        ${'card'}  | ${'is-card'}
        ${'invalid'}| ${'is-simple'}
      `('$showType模式显示$expectedClass', ({ showType, expectedClass }) => {
        const wrapper = shallowMount(ReDetail, {
          propsData: {
            sections: mockSections,
            showType
          }
        })
        
        expect(wrapper.find('.re-detail-section').classes()).toContain(expectedClass)
      })
    })

    describe('数据注入', () => {
      it('应正确注入组件props', () => {
        const wrapper = shallowMount(ReDetail, {
          propsData: {
            sections: mockSections,
            data: mockData
          },
          stubs: ['el-input', 'el-select']
        })

        const inputProps = wrapper.findComponent({ name: 'el-input' }).props()
        expect(inputProps.value).toBe('Test Item')
        
        const selectProps = wrapper.findComponent({ name: 'el-select' }).props()
        expect(selectProps.multiple).toBe(true)
      })
    })
  })

  describe('可折叠功能', () => {
    test.each`
      collapsible | activeSections       | expected
      ${false}    | ${undefined}         | ${0}
      ${true}     | ${['basic']}         | ${1}
      ${true}     | ${undefined}         | ${2}
    `('当collapsible=$collapsible时显示$expected个内容区域', async ({ collapsible, activeSections, expected }) => {
      const wrapper = shallowMount(ReDetail, {
        propsData: {
          sections: mockSections,
          collapsible,
          activeSections
        }
      })

      expect(wrapper.findAll('.re-detail-section.is-active'))
        .toHaveLength(expected)
    })

    it('点击标题应切换展开状态', async () => {
      const wrapper = shallowMount(ReDetail, {
        propsData: {
          sections: mockSections,
          collapsible: true
        }
      })

      await wrapper.find('.re-detail-section__title').trigger('click')
      expect(wrapper.vm.currentActiveSections).not.toContain('basic')
      
      await wrapper.find('.re-detail-section__title').trigger('click')
      expect(wrapper.vm.currentActiveSections).toContain('basic')
    })
  })

  describe('插槽支持', () => {
    it('应渲染header插槽', () => {
      const wrapper = shallowMount(ReDetail, {
        propsData: { sections: mockSections },
        slots: {
          header: '<div class="custom-header">Custom Header</div>'
        }
      })
      
      expect(wrapper.find('.custom-header').exists()).toBe(true)
    })

    it('应渲染具名内容插槽', () => {
      const wrapper = shallowMount(ReDetail, {
        propsData: { sections: mockSections },
        slots: {
          'basicContent': '<div class="custom-content">Basic Content</div>'
        }
      })
      
      expect(wrapper.find('.custom-content').exists()).toBe(true)
    })
  })

  describe('边界条件', () => {
    it('处理空sections', () => {
      const wrapper = shallowMount(ReDetail, {
        propsData: { sections: [] }
      })
      
      expect(wrapper.findAll('.re-detail-section')).toHaveLength(0)
    })

    it('处理无效的data结构', () => {
      const wrapper = shallowMount(ReDetail, {
        propsData: {
          sections: mockSections,
          data: { invalidKey: 'test' }
        },
        stubs: ['el-input']
      })
      
      const input = wrapper.findComponent({ name: 'el-input' })
      expect(input.props('value')).toBeUndefined()
    })
  })
})