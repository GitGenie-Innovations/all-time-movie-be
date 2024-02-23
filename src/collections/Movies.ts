import { CollectionConfig } from "payload/types";

const Movies: CollectionConfig = {
  slug: "movies",
  access: {
    create: () => true,
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: "description",
      required: false,
      type: "text",
    },
    {
      name: "featuredImage",
      type: "text",
      required: false,
    },
    {
      name: "alias",
      type: "array",
      required: false,
      fields: [
        {
          name: "aliasName",
          type: "text",
        },
      ],
    },
  ],
};

export default Movies;
