import { shallowMount } from '@vue/test-utils'
import ReWorkbench from '@packages/workbench/src/index.vue'

describe('ReWorkbench.vue', () => {
  it('renders default ReWorkbench component with layout two', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      }
    })
    expect(wrapper.find('.re-workbench').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__header').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__body').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__footer').exists()).toBe(false)
    expect(wrapper.find('.re-workbench__header .re-workbench-title').text()).toBe('Work 1')
    expect(wrapper.find('.re-workbench__body div').attributes('id')).toBe('work1-component')
    expect(wrapper.find('.re-workbench__header .re-workbench-action__wrapper').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__header .re-workbench-action').text()).toBe('Action 1')
  })

  it('renders ReWorkbench component with layout three', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        layout: 'three',
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      }
    })
    expect(wrapper.find('.re-workbench').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__header').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__body').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__footer').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__header .re-workbench-title').text()).toBe('Work 1')
    expect(wrapper.find('.re-workbench__body div').attributes('id')).toBe('work1-component')
    expect(wrapper.find('.re-workbench__header .re-workbench-action__wrapper').exists()).toBe(false)
    expect(wrapper.find('.re-workbench__footer .re-workbench-action__wrapper').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__footer .re-workbench-action').text()).toBe('Action 1')
  })

  it('renders ReWorkbench component with custom title slot', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      },
      slots: {
        title: '<template #title="{ currentWork, config }">{{ currentWork }} - {{ config.label }}</template>'
      }
    })
    expect(wrapper.find('.re-workbench__header .re-workbench-title').text()).toBe('work1 - Work 1')
  })

  it('renders ReWorkbench component with custom action slot', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      },
      slots: {
        action: '<template #action="{ currentWork, config }"><el-button type="primary">{{ currentWork }} - {{ config.label }}</el-button></template>'
      }
    })
    expect(wrapper.find('.re-workbench__header .re-workbench-action__wrapper el-button').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__header .re-workbench-action__wrapper el-button').text()).toBe('work1 - Work 1')
  })

  it('renders ReWorkbench component with custom work component', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      },
      slots: {
        work1: '<template #work1="{ currentWork, config }"><div id="custom-work1">{{ currentWork }} - {{ config.label }}</div></template>'
      }
    })
    expect(wrapper.find('.re-workbench__body #custom-work1').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__body #custom-work1').text()).toBe('work1 - Work 1')
  })

  it('emits action1 event on action button click', async () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      }
    })
    await wrapper.find('.re-workbench__header .re-workbench-action').trigger('click')
    expect(wrapper.emitted('action1')).toBeTruthy()
    expect(wrapper.emitted('action1')[0]).toEqual(['work1', expect.any(Object)])
  })

  it('calls workFunction method', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      }
    })
    wrapper.vm.workFunction('someMethod', 'arg1', 'arg2')
    expect(console.error).toHaveBeenCalledWith('workComponent reference not found')
  })

  it('renders ReWorkbench component with action as string', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['action1']
          }
        ],
        actions: [
          {
            label: 'Action 1',
            name: 'action1'
          }
        ]
      }
    })
    expect(wrapper.find('.re-workbench__header .re-workbench-action').text()).toBe('Action 1')
  })

  it('renders ReWorkbench component with action as object', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: [
              {
                label: 'Action 1',
                name: 'action1',
                component: 'el-button',
                props: { type: 'primary' }
              }
            ]
          }
        ]
      }
    })
    expect(wrapper.find('.re-workbench__header .re-workbench-action').exists()).toBe(true)
    expect(wrapper.find('.re-workbench__header .re-workbench-action el-button').attributes('type')).toBe('primary')
  })

  it('renders ReWorkbench component with no actions', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: []
          }
        ]
      }
    })
    expect(wrapper.find('.re-workbench__header .re-workbench-action__wrapper').exists()).toBe(false)
  })

  it('renders ReWorkbench component with invalid actions', () => {
    const wrapper = shallowMount(ReWorkbench, {
      propsData: {
        currentWork: 'work1',
        works: [
          {
            label: 'Work 1',
            key: 'work1',
            component: 'div',
            props: { id: 'work1-component' },
            actions: ['invalidAction']
          }
        ]
      }
    })
    expect(wrapper.find('.re-workbench__header .re-workbench-action__wrapper').exists()).toBe(false)
  })
})