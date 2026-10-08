import { describe, expect, it } from 'vitest'
import {
  formatWechatOrderedListMarker,
  getWechatUnorderedListMarker,
} from '@/lib/wechat-list-markers'

describe('wechat list markers', () => {
  it('formats unordered markers by nesting depth', () => {
    expect(getWechatUnorderedListMarker(0)).toBe('•')
    expect(getWechatUnorderedListMarker(1)).toBe('◦')
    expect(getWechatUnorderedListMarker(2)).toBe('▪')
    expect(getWechatUnorderedListMarker(3)).toBe('•')
  })

  it('formats ordered markers with html ol type variants', () => {
    expect(formatWechatOrderedListMarker(3)).toBe('3.')
    expect(formatWechatOrderedListMarker(27, 'a')).toBe('aa.')
    expect(formatWechatOrderedListMarker(27, 'A')).toBe('AA.')
    expect(formatWechatOrderedListMarker(9, 'i')).toBe('ix.')
    expect(formatWechatOrderedListMarker(9, 'I')).toBe('IX.')
  })
})
