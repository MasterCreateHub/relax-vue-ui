import { shallowMount } from '@vue/test-utils'
import ReTable from '@packages/table/src/index.vue'

describe('ReTable.vue', () => {
  it('renders default table component', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [],
        columns: []
      }
    })
    expect(wrapper.find('.re-table').exists()).toBe(true)
    expect(wrapper.find('.el-table').exists()).toBe(true)
  })

  it('renders table component with data', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ]
      }
    })
    expect(wrapper.findAll('.el-table__row').length).toBe(2)
  })

  it('renders table component with columns', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ]
      }
    })
    expect(wrapper.findAll('.el-table__header-wrapper th').length).toBe(2)
  })

  it('renders table component with toolbar', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [],
        columns: [],
        toolbar: true,
        toolbarConfig: [
          { name: 'add', label: 'Add', position: 'left' },
          { name: 'delete', label: 'Delete', position: 'right' }
        ]
      }
    })
    expect(wrapper.find('.re-table-toolbar__wrapper').exists()).toBe(true)
    expect(wrapper.findAll('.re-table-toolbar-tool').length).toBe(2)
  })

  it('renders table component with pagination', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ],
        pagination: true,
        paginationConfig: {
          align: 'center',
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
          currentPage: 1,
          pageSize: 10,
          pagerCount: 7,
          total: 2
        }
      }
    })
    expect(wrapper.find('.re-table-pagination__wrapper').exists()).toBe(true)
    expect(wrapper.find('.el-pagination').exists()).toBe(true)
  })

  it('renders table component with scoped slots', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ]
      },
      scopedSlots: {
        'idLabel': '<template #idLabel="{ column }">{{ column.label }} (ID)</template>',
        'nameContent': '<template #nameContent="{ row }">{{ row.name }} (Name)</template>'
      }
    })
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('ID (ID)')
    expect(wrapper.find('.el-table__body .el-table__row .cell').text()).toContain('John (Name)')
  })

  it('emits tool-add event on toolbar button click', async () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [],
        columns: [],
        toolbar: true,
        toolbarConfig: [
          { name: 'add', label: 'Add', position: 'left' }
        ]
      }
    })
    await wrapper.find('.re-table-toolbar-tool').trigger('click')
    expect(wrapper.emitted('tool-add')).toBeTruthy()
  })

  it('emits pagination event on size-change', async () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ],
        pagination: true,
        paginationConfig: {
          align: 'center',
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
          currentPage: 1,
          pageSize: 10,
          pagerCount: 7,
          total: 2
        }
      }
    })
    await wrapper.find('.el-pagination__sizes').find('select').setValue('20').trigger('change')
    expect(wrapper.emitted('pagination')).toBeTruthy()
    expect(wrapper.emitted('pagination')[0]).toEqual([{ currentPage: 1, pageSize: 20, from: 'pageSize' }])
  })

  it('emits pagination event on current-change', async () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ],
        pagination: true,
        paginationConfig: {
          align: 'center',
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
          currentPage: 1,
          pageSize: 10,
          pagerCount: 7,
          total: 2
        }
      }
    })
    await wrapper.find('.el-pagination__jump').find('input').setValue(2).trigger('change')
    expect(wrapper.emitted('pagination')).toBeTruthy()
    expect(wrapper.emitted('pagination')[0]).toEqual([{ currentPage: 2, pageSize: 10, from: 'currentPage' }])
  })

  it('calls tableFunction method', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [],
        columns: []
      }
    })
    wrapper.vm.tableFunction('clearSort')
    expect(wrapper.vm.$refs.table.clearSort).toHaveBeenCalled()
  })

  it('handles size-change correctly', async () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ],
        pagination: true,
        paginationConfig: {
          align: 'center',
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
          currentPage: 1,
          pageSize: 10,
          pagerCount: 7,
          total: 2
        }
      }
    })
    await wrapper.find('.el-pagination__sizes').find('select').setValue('20').trigger('change')
    expect(wrapper.vm.paginationConfigModel.pageSize).toBe(20)
    expect(wrapper.vm.paginationConfigModel.currentPage).toBe(1)
  })

  it('handles current-change correctly', async () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ],
        pagination: true,
        paginationConfig: {
          align: 'center',
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
          currentPage: 1,
          pageSize: 10,
          pagerCount: 7,
          total: 2
        }
      }
    })
    await wrapper.find('.el-pagination__jump').find('input').setValue(2).trigger('change')
    expect(wrapper.vm.paginationConfigModel.currentPage).toBe(2)
  })

  it('renders table component with different column types', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John', status: true },
          { id: 2, name: 'Jane', status: false }
        ],
        columns: [
          { type: 'selection' },
          { type: 'index' },
          { type: 'expand', renderHeader: () => 'Expand' },
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' },
          { prop: 'status', label: 'Status', contentComponent: 'el-switch', contentComponentProps: { activeText: 'On', inactiveText: 'Off' } }
        ]
      }
    })
    expect(wrapper.findAll('.el-table__header-wrapper th').length).toBe(6)
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('Expand')
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('ID')
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('Name')
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('Status')
    expect(wrapper.findAll('.el-table__row .cell').length).toBe(18)
  })

  it('renders table component with custom header and body slots', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ]
      },
      slots: {
        header: '<template #header="{ column }">{{ column.label }} (Header)</template>',
        body: '<template #body="{ row }">{{ row.name }} (Body)</template>'
      }
    })
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('ID (Header)')
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('Name (Header)')
    expect(wrapper.find('.el-table__body .el-table__row .cell').text()).toContain('John (Body)')
    expect(wrapper.find('.el-table__body .el-table__row .cell').text()).toContain('Jane (Body)')
  })

  it('renders table component with custom scoped slots for header and body', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ]
      },
      scopedSlots: {
        'idLabel': '<template #idLabel="{ column }">{{ column.label }} (ID)</template>',
        'nameContent': '<template #nameContent="{ row }">{{ row.name }} (Name)</template>'
      }
    })
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('ID (ID)')
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('Name')
    expect(wrapper.find('.el-table__body .el-table__row .cell').text()).toContain('John (Name)')
    expect(wrapper.find('.el-table__body .el-table__row .cell').text()).toContain('Jane')
  })

  it('renders table component with custom content component', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John', status: true },
          { id: 2, name: 'Jane', status: false }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' },
          { prop: 'status', label: 'Status', contentComponent: 'el-switch', contentComponentProps: { activeText: 'On', inactiveText: 'Off' } }
        ]
      }
    })
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('ID')
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('Name')
    expect(wrapper.find('.el-table__header-wrapper th').text()).toContain('Status')
    expect(wrapper.findAll('.el-table__row .cell').length).toBe(9)
    expect(wrapper.findAll('.el-switch').length).toBe(2)
  })

  it('renders table component with custom pagination slot', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' }
        ],
        columns: [
          { prop: 'id', label: 'ID' },
          { prop: 'name', label: 'Name' }
        ],
        pagination: true,
        paginationConfig: {
          align: 'center',
          background: true,
          layout: 'total, sizes, prev, pager, next, jumper',
          pageSizes: [10, 20, 30, 50],
          currentPage: 1,
          pageSize: 10,
          pagerCount: 7,
          total: 2
        }
      },
      slots: {
        pagination: '<template #pagination><div class="custom-pagination">Custom Pagination</div></template>'
      }
    })
    expect(wrapper.find('.custom-pagination').exists()).toBe(true)
  })

  it('renders table component with custom toolbar slot', () => {
    const wrapper = shallowMount(ReTable, {
      propsData: {
        data: [],
        columns: [],
        toolbar: true,
        toolbarConfig: [
          { name: 'add', label: 'Add', position: 'left' }
        ]
      },
      slots: {
        toolbar: '<template #toolbar><div class="custom-toolbar">Custom Toolbar</div></template>'
      }
    })
    expect(wrapper.find('.custom-toolbar').exists()).toBe(true)
  })
})