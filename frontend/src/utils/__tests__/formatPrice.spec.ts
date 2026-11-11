import { describe, it, expect } from 'vitest'
import { formatPrice } from '../formatPrice'

describe('formatPrice', () => {
  it('formats whole dollar amounts with two decimals', () => {
    expect(formatPrice(4)).toBe('$4.00')
    expect(formatPrice(0)).toBe('$0.00')
  })

  it('formats cents correctly', () => {
    expect(formatPrice(1.5)).toBe('$1.50')
    expect(formatPrice(4.5)).toBe('$4.50')
    expect(formatPrice(0.05)).toBe('$0.05')
  })
})
