'use client'

import { useEffect } from 'react'
import { enhanceArticleContent } from '@/lib/content-enhancers'
import { normalizeWechatPublishingHtml } from '@/lib/wechat-publishing-enhancements'

export function ArticleContentEnhancer({
  containerId,
  html,
}: {
  containerId: string
  html: string
}) {
  useEffect(() => {
    const root = document.getElementById(containerId)
    if (!root) return

    const normalizedHtml = normalizeWechatPublishingHtml(root.innerHTML)
    if (normalizedHtml !== root.innerHTML) root.innerHTML = normalizedHtml

    void enhanceArticleContent(root)
  }, [containerId, html])

  return null
}
