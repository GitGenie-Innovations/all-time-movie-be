import create from 'payload/dist/collections/operations/create'
import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      required: false,
      type: 'text',
    },
    // Add more fields as needed
  ],
}

export default Users
