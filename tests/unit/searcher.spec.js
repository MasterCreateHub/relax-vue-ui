import { shallowMount } from '@vue/test-utils'
import ReSearcher from '@packages/searcher/src/index.vue'

describe('ReSearcher.vue', () => {
  it('renders default searcher component', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [],
        model: {},
        total: 100,
        currentPage: 1,
        pageSize: 10
      }
    })
    expect(wrapper.find('.re-searcher').exists()).toBe(true)
    expect(wrapper.find('.el-form').exists()).toBe(true)
  })

  it('renders searcher component with factors', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' },
          { label: 'Age', model: 'age', component: 'el-input' }
        ],
        model: { name: '', age: '' }
      }
    })
    expect(wrapper.findAll('.re-searcher-factor__wrapper').length).toBe(2)
  })

  it('renders searcher component with slot', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' }
      },
      slots: {
        name: '<div class="custom-slot">Custom Slot</div>'
      }
    })
    expect(wrapper.find('.custom-slot').exists()).toBe(true)
  })

  it('renders searcher with layout flex', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        layout: 'flex'
      }
    })
    expect(wrapper.find('.re-searcher__body.is-flex').exists()).toBe(true)
  })

  it('renders searcher with layout grid', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        layout: 'grid'
      }
    })
    expect(wrapper.find('.re-searcher__body.is-grid').exists()).toBe(true)
  })

  it('renders searcher with size small', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        size: 'small'
      }
    })
    expect(wrapper.find('.el-form').attributes('size')).toBe('small')
  })

  it('renders searcher with size mini', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        size: 'mini'
      }
    })
    expect(wrapper.find('.el-form').attributes('size')).toBe('mini')
  })

  it('renders searcher with labelPosition left', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        labelPosition: 'left'
      }
    })
    expect(wrapper.find('.el-form').attributes('label-position')).toBe('left')
  })

  it('renders searcher with labelPosition right', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        labelPosition: 'right'
      }
    })
    expect(wrapper.find('.el-form').attributes('label-position')).toBe('right')
  })

  it('renders searcher with labelPosition justify', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        labelPosition: 'justify'
      }
    })
    expect(wrapper.find('.el-form').attributes('label-position')).toBe('justify')
  })

  it('renders searcher with labelWidth', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        labelWidth: '80px'
      }
    })
    expect(wrapper.find('.el-form').attributes('label-width')).toBe('80px')
  })

  it('renders searcher with defaultExpand true', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        defaultExpand: true
      }
    })
    expect(wrapper.vm.expanded).toBe(true)
  })

  it('renders searcher with defaultExpand false', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        defaultExpand: false
      }
    })
    expect(wrapper.vm.expanded).toBe(false)
  })

  it('renders searcher with factorSpacing', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        factorSpacing: 30
      }
    })
    expect(wrapper.find('.re-searcher__body.is-flex').attributes('gutter')).toBe('30')
  })

  it('renders searcher with factorMinWidth', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        factorMinWidth: 300
      }
    })
    expect(wrapper.find('.re-searcher-factor__wrapper').attributes('style')).toContain('min-width: 300px')
  })

  it('renders searcher with autoSearch true', async () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        autoSearch: true
      }
    })
    await wrapper.setData({ modelClone: { name: 'John' } })
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('renders searcher with autoSearch false', async () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        autoSearch: false
      }
    })
    await wrapper.setData({ modelClone: { name: 'John' } })
    expect(wrapper.emitted('search')).toBeFalsy()
  })

  it('renders searcher with autoSearch delay', async () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        autoSearch: 500
      }
    })
    await wrapper.setData({ modelClone: { name: 'John' } })
    expect(wrapper.vm.searchDelay).toBe(500)
  })

  it('renders searcher with searchText', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        searchText: 'Find'
      }
    })
    expect(wrapper.find('.el-button--primary').text()).toContain('Find')
  })

  it('renders searcher with resetText', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        resetText: 'Clear'
      }
    })
    expect(wrapper.findAll('.el-button--primary').at(1).text()).toContain('Clear')
  })

  it('renders searcher with expandText', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        expandText: 'More'
      }
    })
    expect(wrapper.findAll('.el-button--primary').at(2).text()).toContain('More')
  })

  it('renders searcher with collapseText', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        collapseText: 'Less'
      }
    })
    expect(wrapper.findAll('.el-button--primary').at(2).text()).toContain('Less')
  })

  it('renders searcher with actionPosition left', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        actionPosition: 'left'
      }
    })
    expect(wrapper.find('.re-searcher-action__wrapper').classes()).toContain('is-left')
  })

  it('renders searcher with actionPosition right', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        actionPosition: 'right'
      }
    })
    expect(wrapper.find('.re-searcher-action__wrapper').classes()).toContain('is-right')
  })

  it('emits search event on handleSearch', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' }
      }
    })
    wrapper.vm.handleSearch()
    expect(wrapper.emitted('search')).toBeTruthy()
  })

  it('emits reset event on handleReset', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' }
      }
    })
    wrapper.vm.handleReset()
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  it('toggles expanded state on handleToggle', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        defaultExpand: false
      }
    })
    wrapper.vm.handleToggle()
    expect(wrapper.vm.expanded).toBe(true)
  })

  it('updates gridCols on onResize', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' },
        layout: 'grid'
      }
    })
    wrapper.vm.onResize({ contentRect: { width: 800 } })
    expect(wrapper.vm.gridCols).toBe(2)
  })

  it('updates viewportSize on onResize', () => {
    const wrapper = shallowMount(ReSearcher, {
      propsData: {
        factors: [
          { label: 'Name', model: 'name', component: 'el-input' }
        ],
        model: { name: '' }
      }
    })
    wrapper.vm.onResize({ contentRect: { width: 800 } })
    expect(wrapper.vm.viewportSize).toBe('md')
  })
})