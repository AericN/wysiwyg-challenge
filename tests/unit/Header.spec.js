import { render, fireEvent } from '@testing-library/vue'
import Header from '../../src/components/Header.vue'

describe('Header.vue', () => {
  it('renders component', () => {
    const { getByText } = render(Header)
    const component = getByText(/wysiwyg/i)
    expect(component.textContent).toBe('WYSIWYG')
  })

  it('renders component', () => {
    const { getByTestId } = render(Header)
    const component = getByTestId('subtitle')
    expect(component.textContent.trim()).toBe('Smart Editor')
  })
})
