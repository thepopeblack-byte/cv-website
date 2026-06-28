export const post = {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "date",
      title: "Date",
      type: "date",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["Original", "Featured"],
      },
      initialValue: "Original",
    },
    {
      name: "source",
      title: "Source / Publication",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Kayode Popoola",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "externalUrl",
      title: "External Source URL",
      type: "url",
    },
    {
      name: "readingTime",
      title: "Reading Time",
      type: "string",
      initialValue: "3 min read",
    },
    {
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "whyItMatters",
      title: "Why It Matters",
      type: "text",
      rows: 3,
    },
    {
      name: "keyContext",
      title: "Key Context",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
};
