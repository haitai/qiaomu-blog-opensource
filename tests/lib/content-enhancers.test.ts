import { describe, expect, it } from 'vitest'
import { getWechatMermaidConfig } from '@/lib/content-enhancers'

describe('content enhancers', () => {
  it('renders Mermaid labels as SVG text for WeChat copy compatibility', () => {
    const config = getWechatMermaidConfig()

    expect(config.htmlLabels).toBe(false)
    expect(config.flowchart.htmlLabels).toBe(false)
  })
})
