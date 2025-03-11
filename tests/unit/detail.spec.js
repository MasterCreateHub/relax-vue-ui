import { shallowMount } from '@vue/test-utils'
import ReDetail from '@packages/detail/src/index.vue'

describe('ReDetail.vue', () => {
  it('renders title and footer slots', () => {
    const wrapper = shallowMount(ReDetail, {
      slots: {
        header: '<div class="custom-header">Custom Header</div>',
        footer: '<div class="custom-footer">Custom Footer</div>'
      }
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })

  it('renders default sections when sections prop is empty', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [],
        data: {}
      }
    })
    expect(wrapper.findAll('.re-detail-section').length).toBe(0)
  })

  it('renders sections correctly when sections prop is provided', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] },
          { name: 'section2', label: 'Section 2', components: [{ name: 'div', dataKey: 'key2' }] }
        ],
        data: { key1: 'Data 1', key2: 'Data 2' }
      }
    })
    const sections = wrapper.findAll('.re-detail-section')
    expect(sections.length).toBe(2)
    expect(sections.at(0).text()).toContain('Section 1')
    expect(sections.at(0).text()).toContain('Data 1')
    expect(sections.at(1).text()).toContain('Section 2')
    expect(sections.at(1).text()).toContain('Data 2')
  })

  it('renders sections with showType simple', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] }
        ],
        data: { key1: 'Data 1' },
        showType: 'simple'
      }
    })
    expect(wrapper.find('.re-detail-section').classes()).toContain('is-simple')
  })

  it('renders sections with showType bar', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] }
        ],
        data: { key1: 'Data 1' },
        showType: 'bar'
      }
    })
    expect(wrapper.find('.re-detail-section').classes()).toContain('is-bar')
  })

  it('renders sections with showType card', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] }
        ],
        data: { key1: 'Data 1' },
        showType: 'card'
      }
    })
    expect(wrapper.find('.re-detail-section').classes()).toContain('is-card')
  })

  it('renders sections non-collapsible', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] }
        ],
        data: { key1: 'Data 1' },
        collapsible: false
      }
    })
    expect(wrapper.find('.re-detail-section').classes()).not.toContain('is-collapse')
  })

  it('renders sections collapsible', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] }
        ],
        data: { key1: 'Data 1' },
        collapsible: true
      }
    })
    expect(wrapper.find('.re-detail-section').classes()).toContain('is-collapse')
  })

  it('renders sections with activeSections', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] },
          { name: 'section2', label: 'Section 2', components: [{ name: 'div', dataKey: 'key2' }] }
        ],
        data: { key1: 'Data 1', key2: 'Data 2' },
        collapsible: true,
        activeSections: ['section1']
      }
    })
    expect(wrapper.find('.re-detail-section').classes()).toContain('is-collapse')
    expect(wrapper.find('.re-detail-section').classes()).toContain('is-active')
  })

  it('renders custom components and injects data', () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          {
            name: 'section1',
            label: 'Section 1',
            components: [
              { name: 'div', dataKey: 'key1', dataInProps: 'customData' }
            ]
          }
        ],
        data: { key1: 'Data 1' }
      }
    })
    expect(wrapper.find('div').attributes('customdata')).toBe('Data 1')
  })

  it('toggles active sections when collapsible is true', async () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] }
        ],
        data: { key1: 'Data 1' },
        collapsible: true
      }
    })
    await wrapper.find('.re-detail-section').trigger('click')
    expect(wrapper.find('.re-detail-section').classes()).toContain('is-active')
    await wrapper.find('.re-detail-section').trigger('click')
    expect(wrapper.find('.re-detail-section').classes()).not.toContain('is-active')
  })

  it('emits active-section event when section is clicked', async () => {
    const wrapper = shallowMount(ReDetail, {
      propsData: {
        sections: [
          { name: 'section1', label: 'Section 1', components: [{ name: 'div', dataKey: 'key1' }] }
        ],
        data: { key1: 'Data 1' },
        collapsible: true
      }
    })
    await wrapper.find('.re-detail-section').trigger('click')
    expect(wrapper.emitted('active-section')).toBeTruthy()
    expect(wrapper.emitted('active-section')[0]).toEqual(['section1', false])
  })
})