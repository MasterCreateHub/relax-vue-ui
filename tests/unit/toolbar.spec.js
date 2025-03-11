import { shallowMount } from '@vue/test-utils'
import ReToolbar from '@packages/toolbar/src/index.vue'

describe('ReToolbar.vue', () => {
  it('renders default toolbar component', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: []
      }
    })
    expect(wrapper.find('.re-toolbar').exists()).toBe(true)
    expect(wrapper.find('.re-toolbar__left').exists()).toBe(true)
    expect(wrapper.find('.re-toolbar__right').exists()).toBe(true)
  })

  it('renders toolbar component with shadow', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [],
        shadow: true
      }
    })
    expect(wrapper.find('.re-toolbar.is-shadow').exists()).toBe(true)
  })

  it('renders toolbar component with tools', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'add', label: 'Add', position: 'left', useTip: true, tooltip: 'Add new item' },
          { name: 'delete', label: 'Delete', position: 'right', useTip: false }
        ]
      }
    })
    expect(wrapper.findAll('.re-toolbar-tool').length).toBe(2)
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool').text()).toBe('Add')
    expect(wrapper.find('.re-toolbar__right .re-toolbar-tool').text()).toBe('Delete')
  })

  it('renders toolbar component with custom component in tools', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'add', label: 'Add', position: 'left', component: 'el-button', props: { type: 'primary' } }
        ]
      }
    })
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool el-button').exists()).toBe(true)
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool el-button').attributes('type')).toBe('primary')
  })

  it('renders toolbar component with scoped slots', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'add', label: 'Add', position: 'left' },
          { name: 'delete', label: 'Delete', position: 'right' }
        ]
      },
      scopedSlots: {
        add: '<template #add="{ tool }"><el-button type="success">{{ tool.label }}</el-button></template>',
        delete: '<template #delete="{ tool }"><el-button type="danger">{{ tool.label }}</el-button></template>'
      }
    })
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool el-button').attributes('type')).toBe('success')
    expect(wrapper.find('.re-toolbar__right .re-toolbar-tool el-button').attributes('type')).toBe('danger')
  })

  it('emits add event on add button click', async () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'add', label: 'Add', position: 'left' }
        ]
      }
    })
    await wrapper.find('.re-toolbar__left .re-toolbar-tool el-button').trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
  })

  it('emits delete event on delete button click', async () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'delete', label: 'Delete', position: 'right' }
        ]
      }
    })
    await wrapper.find('.re-toolbar__right .re-toolbar-tool el-button').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })

  it('renders toolbar component with tooltip', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'add', label: 'Add', position: 'left', useTip: true, tooltip: 'Add new item' }
        ]
      }
    })
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool el-tooltip').exists()).toBe(true)
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool el-tooltip').attributes('content')).toBe('Add new item')
  })

  it('renders toolbar component without tooltip', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'delete', label: 'Delete', position: 'right', useTip: false }
        ]
      }
    })
    expect(wrapper.find('.re-toolbar__right .re-toolbar-tool el-tooltip').exists()).toBe(false)
  })

  it('renders toolbar component with default button size', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'add', label: 'Add', position: 'left' }
        ]
      }
    })
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool el-button').attributes('size')).toBe('mini')
  })

  it('renders toolbar component with custom button size in scoped slot', () => {
    const wrapper = shallowMount(ReToolbar, {
      propsData: {
        tools: [
          { name: 'add', label: 'Add', position: 'left' }
        ]
      },
      scopedSlots: {
        add: '<template #add="{ tool }"><el-button size="small">{{ tool.label }}</el-button></template>'
      }
    })
    expect(wrapper.find('.re-toolbar__left .re-toolbar-tool el-button').attributes('size')).toBe('small')
  })
})