'use client'

import dynamic from 'next/dynamic'
import { Component, useEffect, useState, type ReactNode } from 'react'

function ReloadEditorButton() {
  return (
    <button type="button" className="rounded px-3 py-2 text-sm underline focus-visible:outline-2" onClick={() => window.location.reload()}>
      重新加载
    </button>
  )
}

function EditorLoading() {
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setSlow(true), 15000)
    return () => window.clearTimeout(timer)
  }, [])
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2" role="status">
      <div className="text-sm text-gray-500">{slow ? '加载较慢，请检查网络或重试。' : '加载编辑器...'}</div>
      {slow && <ReloadEditorButton />}
    </div>
  )
}

class EditorLoadBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-2" role="alert">
          <div className="text-sm text-gray-500">编辑器加载失败，请重试。</div>
          <ReloadEditorButton />
        </div>
      )
    }
    return this.props.children
  }
}

const NovelEditor = dynamic(
  () => import('@/components/NovelEditor').then(m => ({ default: m.NovelEditor })),
  {
    ssr: false,
    loading: EditorLoading,
  }
)

export function NovelEditorClient(props: {
  initialData?: {
    id: number
    slug: string
    title: string
    html: string
    category?: string
    status?: 'draft' | 'published' | 'deleted'
    password?: string | null
    is_hidden?: number
    tags?: string[]
    description?: string | null
    cover_image?: string | null
  }
  skipDraftRestore?: boolean
}) {
  return <EditorLoadBoundary><NovelEditor {...props} /></EditorLoadBoundary>
}
