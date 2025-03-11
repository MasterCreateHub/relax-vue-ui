import { shallowMount } from '@vue/test-utils'
import ReConverter from '@packages/converter/src/index.vue'

describe('ReConverter.vue', () => {
  it('renders default value when target is null', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: null,
        source: [],
        defaultValue: 'Default Value'
      }
    })
    expect(wrapper.text()).toBe('Default Value')
  })

  it('renders correct label when target matches a value in source array', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 1,
        source: [
          { value: 1, label: 'Label 1' },
          { value: 2, label: 'Label 2' }
        ]
      }
    })
    expect(wrapper.text()).toBe('Label 1')
  })

  it('renders multiple labels when target is an array and matches multiple values in source array', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: [1, 2],
        source: [
          { value: 1, label: 'Label 1' },
          { value: 2, label: 'Label 2' },
          { value: 3, label: 'Label 3' }
        ]
      }
    });
    const labels = wrapper.findAll('.re-converter-value');
    expect(labels.length).toBe(2);
    expect(labels.at(0).text()).toBe('Label 1');
    expect(labels.at(1).text()).toBe('Label 2');
  });

  it('renders default value when target is not found in source array', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 3,
        source: [
          { value: 1, label: 'Label 1' },
          { value: 2, label: 'Label 2' }
        ],
        defaultValue: 'Default Value'
      }
    })
    expect(wrapper.text()).toBe('Default Value')
  });

  it('renders correct value when target is a string and source is an object', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 'key1',
        source: {
          key1: 'Value 1',
          key2: 'Value 2'
        }
      }
    })
    expect(wrapper.text()).toBe('Value 1')
  })

  it('renders correct value when target is an array and source is an object', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: ['key1', 'key2'],
        source: {
          key1: 'Value 1',
          key2: 'Value 2',
          key3: 'Value 3'
        }
      }
    })
    const labels = wrapper.findAll('.re-converter-value');
    expect(labels.length).toBe(2);
    expect(labels.at(0).text()).toBe('Value 1');
    expect(labels.at(1).text()).toBe('Value 2');
  });

  it('renders default value when target is not found in source object', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 'key3',
        source: {
          key1: 'Value 1',
          key2: 'Value 2'
        },
        defaultValue: 'Default Value'
      }
    })
    expect(wrapper.text()).toBe('Default Value')
  });

  it('renders correct value when target is processed by a source function', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 10,
        source: (value) => value * 2
      }
    })
    expect(wrapper.text()).toBe('20')
  })

  it('renders default value when source function returns null', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 10,
        source: () => null,
        defaultValue: 'Default Value'
      }
    })
    expect(wrapper.text()).toBe('Default Value')
  })

  it('renders correct value when target is processed by a source string expression', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 10,
        source: '$targetValue * 2'
      }
    })
    expect(wrapper.text()).toBe('20')
  })

  it('renders default value when source string expression evaluates to null', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 10,
        source: '$targetValue + null',
        defaultValue: 'Default Value'
      }
    })
    expect(wrapper.text()).toBe('Default Value')
  })

  it('applies containerProps correctly', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 1,
        source: [
          { value: 1, label: 'Label 1', containerProps: { class: 'custom-class' } }
        ],
        container: 'div'
      }
    })
    expect(wrapper.find('div.custom-class').exists()).toBe(true)
  })

  it('applies containerEvents correctly', () => {
    const clickHandler = jest.fn()
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 1,
        source: [
          { value: 1, label: 'Label 1' }
        ],
        containerEvents: {
          click: clickHandler
        }
      }
    })
    wrapper.find('.re-converter-value').trigger('click')
    expect(clickHandler).toHaveBeenCalled()
  })

  it('renders default value when source is other type and target is null', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: null,
        source: 123,
        defaultValue: 'Default Value'
      }
    })
    expect(wrapper.text()).toBe('Default Value')
  })

  it('renders target as string when source is other type', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 123,
        source: 123
      }
    })
    expect(wrapper.text()).toBe('123')
  })

  it('renders multiple values when source is other type and target is an array', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: [1, 2, 3],
        source: 123
      }
    })
    const labels = wrapper.findAll('.re-converter-value');
    expect(labels.length).toBe(3);
    expect(labels.at(0).text()).toBe('1');
    expect(labels.at(1).text()).toBe('2');
    expect(labels.at(2).text()).toBe('3');
  })
})