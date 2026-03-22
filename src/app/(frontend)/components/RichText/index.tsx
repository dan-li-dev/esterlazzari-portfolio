import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from 'lexical'

type Props = {
  data: SerializedEditorState
  className?: string
}

const RichText = ({ data, className }: Props) => {
  return <LexicalRichText data={data} className={className} />
}

export default RichText
