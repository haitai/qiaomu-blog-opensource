import { describe, expect, it } from 'vitest'
import { renderRubyAnnotationHtml } from '@/lib/ruby-render'

describe('ruby render helpers', () => {
  it('renders doocs-style brace ruby annotations', () => {
    expect(renderRubyAnnotationHtml('汉字', 'han zi')).toContain(
      '<ruby data-text="汉字" data-ruby="han zi">汉字',
    )
  })

  it('splits per-character ruby annotations by supported separators', () => {
    const html = renderRubyAnnotationHtml('汉字', 'han・zi')

    expect(html).toContain('<ruby data-text="汉" data-ruby="han">汉')
    expect(html).toContain('<ruby data-text="字" data-ruby="zi">字')
  })

  it('escapes text and ruby content', () => {
    const html = renderRubyAnnotationHtml('<字', 'a&b')

    expect(html).toContain('data-text="&lt;字"')
    expect(html).toContain('data-ruby="a&amp;b"')
  })
})
