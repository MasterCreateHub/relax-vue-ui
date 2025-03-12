import measure from '@/directives/measure/src/index.js';
import { debounce } from 'lodash';

// Mock lodash debounce
jest.mock('lodash', () => ({
  debounce: jest.fn((fn) => fn),
}));

describe('measure directive', () => {
  let el;
  let binding;
  let resizeObserver;

  beforeEach(() => {
    el = document.createElement('div');
    binding = { value: () => {} };
    resizeObserver = new ResizeObserver(() => {});
    global.ResizeObserver = jest.fn(() => resizeObserver);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should bind ResizeObserver when binding with a function', () => {
    measure.bind(el, binding);

    expect(resizeObserver.observe).toHaveBeenCalledWith(el);
    expect(measure.bind).toHaveBeenCalledWith(el, binding);
  });

  it('should bind ResizeObserver when binding with an object', () => {
    binding.value = { handler: () => {}, delay: 200 };
    measure.bind(el, binding);

    expect(resizeObserver.observe).toHaveBeenCalledWith(el);
    expect(measure.bind).toHaveBeenCalledWith(el, binding);
  });

  it('should update ResizeObserver handler when binding value changes', () => {
    const newHandler = () => {};
    measure.bind(el, binding);
    measure.update(el, { value: newHandler });

    expect(resizeObserver.observe).toHaveBeenCalledWith(el);
    expect(measure.update).toHaveBeenCalledWith(el, { value: newHandler });
  });

  it('should unbind ResizeObserver when unbinding', () => {
    measure.bind(el, binding);
    measure.unbind(el);

    expect(resizeObserver.unobserve).toHaveBeenCalledWith(el);
    expect(measure.unbind).toHaveBeenCalledWith(el);
  });

  it('should log a warning for invalid binding value', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    binding.value = 123;
    measure.bind(el, binding);

    expect(consoleWarn).toHaveBeenCalledWith(
      '[measure directive] Binding value should be a function or an object with \'handler\' property and \'delay\' property. Received: number'
    );

    consoleWarn.mockRestore();
  });

  it('should call handler when element resizes', () => {
    const handler = jest.fn();
    binding.value = handler;
    measure.bind(el, binding);

    const entry = { target: el };
    resizeObserver.callback([entry]);

    expect(handler).toHaveBeenCalledWith(entry);
  });

  it('should call handler with debounce when element resizes', () => {
    const handler = jest.fn();
    binding.value = { handler, delay: 200 };
    measure.bind(el, binding);

    const entry = { target: el };
    resizeObserver.callback([entry]);

    expect(debounce).toHaveBeenCalledWith(handler, 200);
    expect(handler).toHaveBeenCalledWith(entry);
  });

  it('should use default delay when delay is not provided', () => {
    const handler = jest.fn();
    binding.value = { handler };
    measure.bind(el, binding);

    const entry = { target: el };
    resizeObserver.callback([entry]);

    expect(debounce).toHaveBeenCalledWith(handler, 100);
    expect(handler).toHaveBeenCalledWith(entry);
  });

  it('should use default handler when handler is not provided', () => {
    binding.value = { delay: 200 };
    measure.bind(el, binding);

    const entry = { target: el };
    resizeObserver.callback([entry]);

    expect(debounce).toHaveBeenCalledWith(expect.any(Function), 200);
  });

  it('should handle null binding value gracefully', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    binding.value = null;
    measure.bind(el, binding);

    expect(consoleWarn).toHaveBeenCalledWith(
      '[measure directive] Binding value should be a function or an object with \'handler\' property and \'delay\' property. Received: object'
    );

    consoleWarn.mockRestore();
  });

  it('should handle undefined binding value gracefully', () => {
    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    binding.value = undefined;
    measure.bind(el, binding);

    expect(consoleWarn).toHaveBeenCalledWith(
      '[measure directive] Binding value should be a function or an object with \'handler\' property and \'delay\' property. Received: undefined'
    );

    consoleWarn.mockRestore();
  });
});