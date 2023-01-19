import React from 'react'
import { ImSuperscript } from 'react-icons/im'

import { AiOutlineLink } from 'react-icons/ai'

const superscriptRender = (props) => <sup>{props.children}</sup>

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [],
      /*  lists: [{ title: 'Bullet', value: 'bullet' }], */
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Superscript',
            value: 'sup',
            icon: ImSuperscript,
            component: superscriptRender,
          },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Link zum Eintrag',
            name: 'linkToEntry',
            type: 'reference',
            to: [{ type: 'entry' }],
            validation: (Rule) =>
              Rule.required().error('Feld darf nicht leer sein'),
            icon: AiOutlineLink,
          },
        ],
      },
    },
  ],
}
