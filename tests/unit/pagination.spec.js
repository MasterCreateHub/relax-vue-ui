import { shallowMount } from '@vue/test-utils'
import RePagination from '@packages/pagination/src/index.vue'

describe('RePagination.vue', () => {
  it('renders default pagination component', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      }
    })
    expect(wrapper.find('.re-pagination').exists()).toBe(true)
    expect(wrapper.find('.el-pagination').exists()).toBe(true)
  })

  it('renders pagination component with slot', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        layout: 'slot'
      },
      slots: {
        default: '<div class="custom-slot">Custom Slot</div>'
      }
    })
    expect(wrapper.find('.custom-slot').exists()).toBe(true)
  })

  it('renders pagination with different layout', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        layout: 'total,prev,pager,next'
      }
    })
    expect(wrapper.find('.el-pagination__total').exists()).toBe(true)
    expect(wrapper.find('.el-pagination__prev').exists()).toBe(true)
    expect(wrapper.find('.el-pagination__pager').exists()).toBe(true)
    expect(wrapper.find('.el-pagination__next').exists()).toBe(true)
  })

  it('renders pagination with background', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        background: true
      }
    })
    expect(wrapper.find('.el-pagination.is-background').exists()).toBe(true)
  })

  it('renders pagination without background', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        background: false
      }
    })
    expect(wrapper.find('.el-pagination.is-background').exists()).toBe(false)
  })

  it('renders pagination with different total', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 200,
        currentPage: 1,
        pageSize: 10
      }
    })
    expect(wrapper.find('.el-pagination__total').text()).toContain('共 200 条')
  })

  it('renders pagination with different currentPage and pageSize', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 2,
        pageSize: 20
      }
    })
    expect(wrapper.vm.currentPageModel).toBe(2)
    expect(wrapper.vm.pageSizeModel).toBe(20)
  })

  it('renders pagination with different pageSizes', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5, 15, 25]
      }
    })
    expect(wrapper.find('.el-pagination__sizes').exists()).toBe(true)
    expect(wrapper.find('.el-pagination__sizes').find('select').element.value).toBe('10')
  })

  it('renders pagination with different pagerCount', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        pagerCount: 5
      }
    })
    expect(wrapper.find('.el-pagination__pager').findAll('li').length).toBe(5)
  })

  it('renders pagination with align left', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        align: 'left'
      }
    })
    expect(wrapper.find('.re-pagination').classes()).toContain('is-left')
  })

  it('renders pagination with align center', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        align: 'center'
      }
    })
    expect(wrapper.find('.re-pagination').classes()).toContain('is-center')
  })

  it('renders pagination with align right', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        align: 'right'
      }
    })
    expect(wrapper.find('.re-pagination').classes()).toContain('is-right')
  })

  it('renders pagination with hidden', () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10,
        hidden: true
      }
    })
    expect(wrapper.find('.re-pagination').classes()).toContain('is-hidden')
  })

  it('emits pagination event on current-change', async () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      }
    })
    await wrapper.find('.el-pagination__jump').find('input').setValue(2).trigger('change')
    expect(wrapper.emitted('pagination')).toBeTruthy()
    expect(wrapper.emitted('pagination')[0]).toEqual([{ currentPage: 2, pageSize: 10, from: 'currentPage' }])
  })

  it('emits pagination event on size-change', async () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 100,
        currentPage: 1,
        pageSize: 10
      }
    })
    await wrapper.find('.el-pagination__sizes').find('select').setValue('20').trigger('change')
    expect(wrapper.emitted('pagination')).toBeTruthy()
    expect(wrapper.emitted('pagination')[0]).toEqual([{ currentPage: 1, pageSize: 20, from: 'pageSize' }])
  })

  it('resets currentPage to 1 when total is less than currentPage * pageSize', async () => {
    const wrapper = shallowMount(RePagination, {
      propsData: {
        total: 10,
        currentPage: 2,
        pageSize: 10
      }
    })
    await wrapper.find('.el-pagination__sizes').find('select').setValue('10').trigger('change')
    expect(wrapper.vm.currentPageModel).toBe(1)
  })
})