import { mount } from '@vue/test-utils'
import Counter from '../src/components/Counter.vue';
import { vi } from 'vitest';

const routerPushMock = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: routerPushMock,
    replace: vi.fn(),
  }),
}))

describe('Counter.vue', () => {
  it('should render', () => {
    const wrapper = mount(Counter, { props: { initial: 10 } })
    expect(wrapper.text()).toContain('10')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be interactive', async() => {
    const wrapper = mount(Counter, { props: { initial: 0 } })
    expect(wrapper.text()).toContain('0')

    expect(wrapper.find('.inc').exists()).toBe(true)

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('1')

    expect(routerPushMock).toHaveBeenCalledWith({ hash: '#003', path: 'privileges' });
  })
})
