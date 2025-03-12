import { mount } from '@vue/test-utils';
import disabled from '@/directives/disabled/src/index.js';

describe('disabled directive', () => {
  it('should apply default styles when binding with true', () => {
    const wrapper = mount({
      template: '<div v-disabled="true"></div>',
      directives: {
        disabled,
      },
    });

    const mask = wrapper.find('.disabled-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.position).toBe('absolute');
    expect(mask.element.style.top).toBe('0px');
    expect(mask.element.style.left).toBe('0px');
    expect(mask.element.style.width).toBe('100%');
    expect(mask.element.style.height).toBe('100%');
    expect(mask.element.style.background).toBe('rgba(245, 247, 250, 0.5)');
    expect(mask.element.style.zIndex).toBe('100000');
    expect(mask.element.style.cursor).toBe('not-allowed');
    expect(mask.element.style.display).toBe('block');
  });

  it('should not apply mask when binding with false', () => {
    const wrapper = mount({
      template: '<div v-disabled="false"></div>',
      directives: {
        disabled,
      },
    });

    const mask = wrapper.find('.disabled-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('none');
  });

  it('should apply custom styles when binding with an object', () => {
    const wrapper = mount({
      template: '<div v-disabled="{ disabled: true, style: { background: \'red\' } }"></div>',
      directives: {
        disabled,
      },
    });

    const mask = wrapper.find('.disabled-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.background).toBe('red');
    expect(mask.element.style.display).toBe('block');
  });

  it('should update mask when binding value changes', async () => {
    const wrapper = mount({
      template: '<div v-disabled="isDisabled"></div>',
      directives: {
        disabled,
      },
      data() {
        return {
          isDisabled: true,
        };
      },
    });

    let mask = wrapper.find('.disabled-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('block');

    await wrapper.setData({ isDisabled: false });

    mask = wrapper.find('.disabled-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('none');
  });

  it('should remove mask on unbind', () => {
    const wrapper = mount({
      template: '<div v-disabled="true"></div>',
      directives: {
        disabled,
      },
    });

    let mask = wrapper.find('.disabled-mask');

    expect(mask.exists()).toBe(true);

    wrapper.unmount();

    mask = wrapper.find('.disabled-mask');

    expect(mask.exists()).toBe(false);
  });

  it('should log a warning for invalid binding value', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    mount({
      template: '<div v-disabled="123"></div>',
      directives: {
        disabled,
      },
    });

    expect(consoleWarn).toHaveBeenCalledWith(
      '[disabled directive] Binding value should be a boolean or an object with \'disabled\' and \'style\' properties. Received: number'
    );

    consoleWarn.mockRestore();
  });
});