import { CollectionConfig } from "payload/types";

const Halls: CollectionConfig = {
  slug: "halls",
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
      name: "location",
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
      type: "text",
      required: false,
    },
  ],
};

export default Halls;
