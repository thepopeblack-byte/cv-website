import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "editorial", title: "Editorial", default: true },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "editorial",
      validation: (rule) => rule.required().min(8).max(140),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      description: "Generate this from the title before publishing.",
      type: "slug",
      group: "publishing",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Publication date",
      type: "date",
      group: "publishing",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Post type",
      type: "string",
      group: "publishing",
      options: {
        layout: "radio",
        list: [
          { title: "Original", value: "Original" },
          { title: "Featured coverage", value: "Featured" },
        ],
      },
      initialValue: "Original",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Source or publication",
      description: "Use this for externally published or featured coverage.",
      type: "string",
      group: "publishing",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "publishing",
      initialValue: "Kayode Popoola",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description: "A concise summary used on cards and in search previews.",
      type: "text",
      rows: 4,
      group: "editorial",
      validation: (rule) => rule.required().min(40).max(320),
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "editorial",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bulleted", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  defineField({
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (rule) =>
                      rule.required().uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto"],
                      }),
                  }),
                ],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              description: "Describe the image for screen-reader users.",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "publishing",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "editorial",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "externalUrl",
      title: "External source URL",
      description: "Optional link to the original publication.",
      type: "url",
      group: "publishing",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "readingTime",
      title: "Reading time",
      type: "string",
      group: "publishing",
      initialValue: "3 min read",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature this post",
      type: "boolean",
      group: "publishing",
      initialValue: false,
    }),
    defineField({
      name: "whyItMatters",
      title: "Why it matters",
      type: "text",
      rows: 4,
      group: "editorial",
    }),
    defineField({
      name: "keyContext",
      title: "Key context",
      type: "array",
      group: "editorial",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "source",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle || "Kayode Popoola",
        media,
      };
    },
  },
});
