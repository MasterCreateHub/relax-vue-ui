import { shallowMount } from '@vue/test-utils'
import ReForm from '@packages/form/src/index.vue'
import { deepParse } from '@packages/form/src/templateParse.js'

jest.mock('@packages/form/src/templateParse.js', () => ({
  deepParse: jest.fn()
}))

describe('ReForm.vue', () => {
  beforeEach(() => {
    deepParse.mockImplementation((data) => data)
  })

  it('renders default form items when items prop is empty', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [],
        model: {}
      }
    })
    expect(wrapper.findAll('.re-form-item').length).toBe(0)
  })

  it('renders form items correctly when items prop is provided', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' },
          { name: 'section2', label: 'Section 2', model: 'field2', component: 'el-input' }
        ],
        model: { field1: 'Data 1', field2: 'Data 2' }
      }
    })
    const items = wrapper.findAll('.re-form-item')
    expect(items.length).toBe(2)
    expect(items.at(0).text()).toContain('Section 1')
    expect(items.at(1).text()).toContain('Section 2')
  })

  it('renders form with readonly attribute', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' },
        readonly: true
      }
    })
    expect(wrapper.find('.re-form').classes()).toContain('is-readonly')
  })

  it('renders form with disabled attribute', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' },
        disabled: true
      }
    })
    expect(wrapper.find('.re-form').classes()).toContain('is-disabled')
  })

  it('renders form with labelAlign top', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' },
        labelAlign: 'top'
      }
    })
    expect(wrapper.find('.re-form').attributes('label-position')).toBe('top')
  })

  it('renders form with labelAlign left', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' },
        labelAlign: 'left'
      }
    })
    expect(wrapper.find('.re-form').attributes('label-position')).toBe('left')
  })

  it('renders form with labelAlign right', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' },
        labelAlign: 'right'
      }
    })
    expect(wrapper.find('.re-form').attributes('label-position')).toBe('right')
  })

  it('renders form with labelAlign justify', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' },
        labelAlign: 'justify'
      }
    })
    expect(wrapper.find('.re-form').classes()).toContain('is-justify')
  })

  it('renders form with spacing', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' },
        spacing: 30
      }
    })
    expect(wrapper.find('.re-form__body').attributes('gutter')).toBe('30')
  })

  it('renders form with scrollToError true', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', rules: [{ required: true, message: 'Required' }] }
        ],
        model: { field1: '' },
        scrollToError: true
      }
    })
    wrapper.vm.validate((valid) => {
      expect(valid).toBe(false)
    })
  })

  it('renders form with scrollToError false', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', rules: [{ required: true, message: 'Required' }] }
        ],
        model: { field1: '' },
        scrollToError: false
      }
    })
    wrapper.vm.validate((valid) => {
      expect(valid).toBe(false)
    })
  })

  it('renders form with rules', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', rules: [{ required: true, message: 'Required' }] }
        ],
        model: { field1: '' },
        rules: {
          field1: [{ required: true, message: 'Required' }]
        }
      }
    })
    wrapper.vm.validate((valid) => {
      expect(valid).toBe(false)
    })
  })

  it('renders form with changes', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', changes: [{ target: 'field2', value: 'Changed' }] },
          { name: 'section2', label: 'Section 2', model: 'field2', component: 'el-input' }
        ],
        model: { field1: 'Data 1', field2: 'Data 2' },
        changes: {
          field1: [{ target: 'field2', value: 'Changed' }]
        }
      }
    })
    wrapper.setData({ formCurrentValues: { field1: 'Data 1', field2: 'Data 2' } })
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.formCurrentValues.field2).toBe('Changed')
    })
  })

  it('renders form with contexts', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', initialValue: '{{ $extraContexts.contextValue }}' }
        ],
        model: { field1: '' },
        contexts: { contextValue: 'Context Data' }
      }
    })
    expect(wrapper.vm.formInitialValues.field1).toBe('Context Data')
  })

  it('renders form with initial values', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', initialValue: 'Initial Data' }
        ],
        model: { field1: '' }
      }
    })
    expect(wrapper.vm.formInitialValues.field1).toBe('Initial Data')
  })

  it('renders form with selected options', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-select', interactive: 'select', props: { options: [{ value: '1', label: 'Option 1' }] } }
        ],
        model: { field1: '1' }
      }
    })
    expect(wrapper.vm.formSelectedOptions.field1.value).toBe('1')
  })

  it('validates form items', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', rules: [{ required: true, message: 'Required' }] }
        ],
        model: { field1: '' }
      }
    })
    wrapper.vm.validate((valid) => {
      expect(valid).toBe(false)
    })
  })

  it('validates specific form item', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', rules: [{ required: true, message: 'Required' }] }
        ],
        model: { field1: '' }
      }
    })
    wrapper.vm.validateField('field1', (valid) => {
      expect(valid).toBe(false)
    })
  })

  it('resets form fields', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' }
      }
    })
    wrapper.vm.resetFields()
    expect(wrapper.vm.formCurrentValues.field1).toBe('')
  })

  it('clears form validation', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input' }
        ],
        model: { field1: 'Data 1' }
      }
    })
    wrapper.vm.clearValidate('field1')
  })

  it('resets form to initial values', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', initialValue: 'Initial Data' }
        ],
        model: { field1: 'Data 1' }
      }
    })
    wrapper.vm.reset()
    expect(wrapper.vm.formCurrentValues.field1).toBe('Initial Data')
  })

  it('submits form when valid', () => {
    const wrapper = shallowMount(ReForm, {
      propsData: {
        items: [
          { name: 'section1', label: 'Section 1', model: 'field1', component: 'el-input', initialValue: 'Initial Data' }
        ],
        model: { field1: 'Data 1' }
      }
    })
    wrapper.vm.submit()
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')[0]).toEqual([{ field1: 'Data 1' }])
  })
})