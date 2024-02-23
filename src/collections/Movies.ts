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
  ],
};

export default Movies;
