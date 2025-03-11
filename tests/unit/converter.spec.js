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
  })

  it('renders correct value when target is processed by a source function', () => {
    const wrapper = shallowMount(ReConverter, {
      propsData: {
        target: 10,
        source: (value) => value * 2
      }
    })
    expect(wrapper.text()).toBe('20')
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
})