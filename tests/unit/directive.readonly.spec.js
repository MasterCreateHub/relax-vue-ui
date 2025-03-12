import { mount } from '@vue/test-utils';
import readonly from '@/directives/readonly/src/index.js';

describe('readonly directive', () => {
  it('should apply default styles when binding with true', () => {
    const wrapper = mount({
      template: '<div v-readonly="true"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.position).toBe('absolute');
    expect(mask.element.style.top).toBe('0px');
    expect(mask.element.style.left).toBe('0px');
    expect(mask.element.style.width).toBe('100%');
    expect(mask.element.style.height).toBe('100%');
    expect(mask.element.style.background).toBe('transparent');
    expect(mask.element.style.zIndex).toBe('100000');
    expect(mask.element.style.cursor).toBe('unset');
    expect(mask.element.style.display).toBe('block');
  });

  it('should not apply mask when binding with false', () => {
    const wrapper = mount({
      template: '<div v-readonly="false"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('none');
  });

  it('should apply custom styles when binding with an object', () => {
    const wrapper = mount({
      template: '<div v-readonly="{ readonly: true, style: { background: \'red\' } }"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.background).toBe('red');
    expect(mask.element.style.display).toBe('block');
  });

  it('should update mask when binding value changes', async () => {
    const wrapper = mount({
      template: '<div v-readonly="isReadonly"></div>',
      directives: {
        readonly,
      },
      data() {
        return {
          isReadonly: true,
        };
      },
    });

    let mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('block');

    await wrapper.setData({ isReadonly: false });

    mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('none');
  });

  it('should remove mask on unbind', () => {
    const wrapper = mount({
      template: '<div v-readonly="true"></div>',
      directives: {
        readonly,
      },
    });

    let mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);

    wrapper.unmount();

    mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(false);
  });

  it('should log a warning for invalid binding value', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    mount({
      template: '<div v-readonly="123"></div>',
      directives: {
        readonly,
      },
    });

    expect(consoleWarn).toHaveBeenCalledWith(
      '[readonly directive] Binding value should be a boolean or an object with \'readonly\' and \'style\' properties. Received: number'
    );

    consoleWarn.mockRestore();
  });

  it('should apply default styles when binding with an object and no style provided', () => {
    const wrapper = mount({
      template: '<div v-readonly="{ readonly: true }"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.background).toBe('transparent');
    expect(mask.element.style.display).toBe('block');
  });

  it('should apply custom styles when binding with an object and style provided', () => {
    const wrapper = mount({
      template: '<div v-readonly="{ readonly: true, style: { background: \'blue\' } }"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.background).toBe('blue');
    expect(mask.element.style.display).toBe('block');
  });

  it('should not apply mask when binding with an object and readonly is false', () => {
    const wrapper = mount({
      template: '<div v-readonly="{ readonly: false }"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('none');
  });

  it('should handle null binding value gracefully', () => {
    const wrapper = mount({
      template: '<div v-readonly="null"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('none');
  });

  it('should handle undefined binding value gracefully', () => {
    const wrapper = mount({
      template: '<div v-readonly="undefined"></div>',
      directives: {
        readonly,
      },
    });

    const mask = wrapper.find('.readonly-mask');

    expect(mask.exists()).toBe(true);
    expect(mask.element.style.display).toBe('none');
  });
});