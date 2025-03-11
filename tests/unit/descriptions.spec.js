import { shallowMount } from '@vue/test-utils'
import ReDescriptions from '@packages/descriptions/src/index.vue'

describe('ReDescriptions.vue', () => {
  it('renders title and extra slots', () => {
    const wrapper = shallowMount(ReDescriptions, {
      slots: {
        title: '<div class="custom-title">Custom Title</div>',
        extra: '<div class="custom-extra">Custom Extra</div>'
      }
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
    expect(wrapper.find('.custom-extra').exists()).toBe(true)
  })

  it('renders default items when items prop is empty', () => {
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        items: [],
        data: {}
      }
    })
    expect(wrapper.findAll('.el-descriptions-item').length).toBe(0)
  })

  it('renders items correctly when items prop is provided', () => {
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        items: [
          { prop: 'name', label: 'Name', span: 1 },
          { prop: 'age', label: 'Age', span: 1 }
        ],
        data: { name: 'John Doe', age: 30 }
      }
    })
    const items = wrapper.findAll('.el-descriptions-item')
    expect(items.length).toBe(2)
    expect(items.at(0).text()).toContain('Name')
    expect(items.at(0).text()).toContain('John Doe')
    expect(items.at(1).text()).toContain('Age')
    expect(items.at(1).text()).toContain('30')
  })

  it('renders layout fixed when layout prop is fixed', () => {
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        layout: 'fixed'
      }
    })
    expect(wrapper.classes()).toContain('is-layout-fixed')
  })

  it('renders layout auto when layout prop is auto', () => {
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        layout: 'auto'
      }
    })
    expect(wrapper.classes()).not.toContain('is-layout-fixed')
  })

  it('renders labelComponent and contentComponent correctly', () => {
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        items: [
          {
            prop: 'name',
            label: 'Name',
            labelComponent: 'span',
            labelComponentProps: { class: 'custom-label' },
            labelComponentEvents: { click: () => {} },
            contentComponent: 'div',
            contentComponentProps: { class: 'custom-content' },
            contentComponentEvents: { click: () => {} }
          }
        ],
        data: { name: 'John Doe' }
      }
    })
    expect(wrapper.find('span.custom-label').exists()).toBe(true)
    expect(wrapper.find('div.custom-content').exists()).toBe(true)
  })

  it('renders labelComponentProps and contentComponentProps correctly', () => {
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        items: [
          {
            prop: 'name',
            label: 'Name',
            labelComponent: 'span',
            labelComponentProps: { class: 'custom-label' },
            contentComponent: 'div',
            contentComponentProps: { class: 'custom-content' }
          }
        ],
        data: { name: 'John Doe' }
      }
    })
    expect(wrapper.find('span.custom-label').exists()).toBe(true)
    expect(wrapper.find('div.custom-content').exists()).toBe(true)
  })

  it('renders labelComponentEvents and contentComponentEvents correctly', () => {
    const labelClickHandler = jest.fn()
    const contentClickHandler = jest.fn()
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        items: [
          {
            prop: 'name',
            label: 'Name',
            labelComponent: 'span',
            labelComponentEvents: { click: labelClickHandler },
            contentComponent: 'div',
            contentComponentEvents: { click: contentClickHandler }
          }
        ],
        data: { name: 'John Doe' }
      }
    })
    wrapper.find('span').trigger('click')
    wrapper.find('div').trigger('click')
    expect(labelClickHandler).toHaveBeenCalled()
    expect(contentClickHandler).toHaveBeenCalled()
  })

  it('renders dataInProps correctly', () => {
    const wrapper = shallowMount(ReDescriptions, {
      propsData: {
        items: [
          {
            prop: 'name',
            label: 'Name',
            contentComponent: 'div',
            contentComponentProps: { class: 'custom-content' },
            dataInProps: 'customData'
          }
        ],
        data: { name: 'John Doe' }
      }
    })
    expect(wrapper.find('div.custom-content').attributes('customdata')).toBe('John Doe')
  })
})