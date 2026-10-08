import { describe, expect, it } from 'vitest'
import { rewriteWechatExportImageUrl } from '@/lib/wechat-export-images'

describe('wechat export image helpers', () => {
  it('rewrites stored article images to WeChat-friendly JPEG variants', () => {
    expect(rewriteWechatExportImageUrl('/api/images/image/a.webp?foo=1', 'https://blog.qiaomu.ai', 'content'))
      .toBe('https://blog.qiaomu.ai/api/images/image/a.webp?foo=1&w=1280&q=82&format=jpeg')
  })

  it('rewrites cover images to cropped JPEG variants', () => {
    expect(rewriteWechatExportImageUrl('/api/images/image/a.webp', 'https://blog.qiaomu.ai', 'cover'))
      .toBe('https://blog.qiaomu.ai/api/images/image/a.webp?w=1280&h=720&fit=cover&q=92&format=jpeg')
  })

  it('leaves external image URLs unchanged except for URL normalization', () => {
    expect(rewriteWechatExportImageUrl('https://example.com/a.png', 'https://blog.qiaomu.ai', 'content'))
      .toBe('https://example.com/a.png')
  })
})
