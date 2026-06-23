import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

import { apiVersion } from '../env'

export const blogCategoryType = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(50)
          .custom(async (value, context) => {
            if (!value || typeof value !== 'string') return true

            const currentId = context.document?._id?.replace(/^drafts\./, '')
            const params = {
              draftId: currentId ? `drafts.${currentId}` : '',
              publishedId: currentId ?? '',
              title: value.trim(),
            }

            const query = `!defined(*[
              _type == "blogCategory" &&
              title == $title &&
              !(_id in [$draftId, $publishedId])
            ][0]._id)`

            const isUnique = await context
              .getClient({ apiVersion })
              .fetch<boolean>(query, params)

            return isUnique || 'Category title must be unique'
          }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: '_id',
    },
  },
})