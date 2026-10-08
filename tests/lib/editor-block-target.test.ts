import { Schema } from '@tiptap/pm/model'
import { describe, expect, it } from 'vitest'
import { getTopLevelTargetFromDoc } from '@/lib/editor-block-target'

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      group: 'block',
      content: 'text*',
      toDOM: () => ['p', 0],
    },
    text: { group: 'inline' },
  },
})

function paragraph(text: string) {
  return schema.node('paragraph', null, [schema.text(text)])
}

describe('editor block target helpers', () => {
  it('resolves an exact block boundary to the next block', () => {
    const doc = schema.node('doc', null, [
      paragraph('previous'),
      paragraph('current'),
    ])
    const secondBlockPos = doc.child(0).nodeSize

    const target = getTopLevelTargetFromDoc(doc, secondBlockPos)

    expect(target?.pos).toBe(secondBlockPos)
    expect(target?.node.textContent).toBe('current')
  })

  it('keeps the document end attached to the final block', () => {
    const doc = schema.node('doc', null, [
      paragraph('first'),
      paragraph('last'),
    ])

    const target = getTopLevelTargetFromDoc(doc, doc.content.size)

    expect(target?.node.textContent).toBe('last')
  })

  it('clamps positions before the document to the first block', () => {
    const doc = schema.node('doc', null, [
      paragraph('first'),
      paragraph('second'),
    ])

    const target = getTopLevelTargetFromDoc(doc, -12)

    expect(target?.pos).toBe(0)
    expect(target?.node.textContent).toBe('first')
  })
})
