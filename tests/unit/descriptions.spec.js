import { shallowMount, mount } from '@vue/test-utils';
import ReDescriptions from '@packages/descriptions/src/index.vue';

describe('ReDescriptions.vue', () => {
  const items = [
    {
      prop: 'name',
      label: '姓名',
      contentComponent: 'el-input',
      dataInProps: 'value',
    },
    {
      prop: 'age',
      label: '年龄',
      labelComponent: 'el-tag',
      labelComponentProps: { type: 'info' },
    },
  ];

  const data = {
    name: '张三',
    age: 30,
  };

  describe('Props验证', () => {
    test.each`
      scenario            | layout       | valid
      ${'合法布局-fixed'} | ${'fixed'}   | ${true}
      ${'合法布局-auto'}  | ${'auto'}    | ${true}
      ${'非法布局'}       | ${'invalid'} | ${false}
    `('$scenario', ({ layout, valid }) => {
      const validator = ReDescriptions.props.layout.validator;
      expect(validator(layout)).toBe(valid);
    });
  });

  describe('核心功能', () => {
    describe('数据格式化', () => {
      it('应正确注入内容组件props', () => {
        const wrapper = shallowMount(ReDescriptions, {
          propsData: {
            items: items,
            data: data,
          },
          stubs: ['el-input', 'el-tag'],
        });

        const inputComponent = wrapper.findComponent({ name: 'el-input' });
        expect(inputComponent.props('value')).toBe('张三');
      });

      it('应处理标签组件事件', async () => {
        const mockHandler = jest.fn();

        // 创建完整的测试项结构
        const testItem = {
          label: '邮箱',
          prop: 'email',
          labelComponent: 'el-link',
          labelComponentEvents: { click: mockHandler },
          // 补齐实际组件中的默认属性
          contentComponent: null,
          contentComponentEvents: {},
          contentComponentFormatEvents: {},
          contentComponentProps: { data: 'test@example.com' },
          labelComponentFormatEvents: {},
          labelComponentProps: {},
        };

        const TestComponent = {
          components: { ReDescriptions },
          template: `<re-descriptions :items="items" :data="personData" />`,
          data: () => ({
            items: [testItem],
            personData: { email: 'test@example.com' },
          }),
        };

        const wrapper = mount(TestComponent, {
          stubs: {
            'el-link': {
              template: '<div @click="$listeners.click({ item, data: personData })"></div>',
              computed: {
                item() {
                  return testItem;
                }, // 使用完整测试项
                personData() {
                  return wrapper.vm.personData;
                },
              },
            },
          },
        });

        await wrapper.findComponent({ name: 'el-link' }).trigger('click');

        // 验证调用次数
        expect(mockHandler).toHaveBeenCalledTimes(1);

        // 验证参数结构
        expect(mockHandler).toHaveBeenCalledWith(
          expect.objectContaining({
            item: expect.objectContaining({
              prop: 'email',
              label: '邮箱',
              // 添加对格式化属性的验证
              labelComponentFormatEvents: expect.objectContaining({
                click: expect.any(Function),
              }),
            }),
            data: { email: 'test@example.com' },
          }),
          // 添加对原生事件参数的验证
          expect.any(Object) // 根据实际事件参数类型调整
        );
      });
    });

    describe('布局模式', () => {
      test.each`
        layout       | shouldHaveClass | isValid
        ${'fixed'}   | ${true}         | ${true}
        ${'auto'}    | ${false}        | ${true}
        ${undefined} | ${true}         | ${true} // 默认值 fixed
        ${'invalid'} | ${false}        | ${false}
      `('当layout=$layout时 is-layout-fixed类应$shouldHaveClass', ({ layout, shouldHaveClass, isValid }) => {
        const options = {
          propsData: { 
            items: items,
            ...(layout !== undefined && { layout }) // 仅当layout存在时传递
          }
        };
    
        if (!isValid) {
          jest.spyOn(console, 'error').mockImplementation();
        }
    
        const wrapper = shallowMount(ReDescriptions, options);
        
        // 验证类名
        expect(wrapper.classes('is-layout-fixed')).toBe(shouldHaveClass);
        
        // 验证默认值逻辑
        if (layout === undefined) {
          expect(wrapper.vm.layout).toBe('fixed');
        }
    
        if (!isValid) {
          expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('Invalid prop: custom validator check failed for prop "layout"')
          );
          console.error.mockRestore();
        }
      });
    });
  });

  describe('插槽系统', () => {
    // 配置Element组件存根
    const stubs = {
      'el-descriptions': {
        template: `
          <div>
            <div class="el-descriptions__title">
              <slot name="title"/>
            </div>
            <div class="el-descriptions__extra">
              <slot name="extra"/>
            </div>
            <slot/>
          </div>
        `
      }
    };
  
    test.each`
      slotName     | testContent         | selector
      ${'title'}   | ${'自定义标题'}      | ${'.el-descriptions__title'}
      ${'extra'}   | ${'扩展操作区'}      | ${'.el-descriptions__extra'}
    `('应渲染$slotName插槽内容', ({ slotName, testContent, selector }) => {
      const wrapper = shallowMount(ReDescriptions, {
        propsData: { items },
        slots: { [slotName]: `<div>${testContent}</div>` },
        stubs
      });
  
      // 验证内容渲染
      expect(wrapper.find(`${selector} div`).text()).toBe(testContent);
    });

  });

  describe('边界条件', () => {
    it('处理空items', () => {
      const wrapper = shallowMount(ReDescriptions, {
        propsData: { items: [] },
      });

      expect(wrapper.findAll('.el-descriptions-item')).toHaveLength(0);
    });

    it('处理缺失数据字段', () => {
      const wrapper = mount(ReDescriptions, {
        propsData: {
          items: [{
            prop: 'invalid',
            label: '无效字段',
          }],
          data: {} // 使用空数据对象
        },
      });
    
      // 分步验证
      const contentWrapper = wrapper.find('.el-descriptions-item__content');
      
      // 1. 验证元素存在性
      expect(contentWrapper.exists()).toBe(true);
      
      // 2. 验证内容为空
      expect(contentWrapper.text()).toBe('');
      
    });

    it('处理未注册组件', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      shallowMount(ReDescriptions, {
        propsData: {
          items: [
            {
              prop: 'test',
              label: '测试',
              contentComponent: 'unknown-component',
            },
          ],
          data: { test: 'value' },
        },
      });

      expect(consoleError).toHaveBeenCalledWith(expect.stringContaining('Unknown custom element'));
      consoleError.mockRestore();
    });
  });

});
