import create from 'payload/dist/collections/operations/create'
import { CollectionConfig } from 'payload/types'

const Movies: CollectionConfig = {
    slug: 'movies',
    access: {
        create: () => true,
    },
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'name',
            required: true,
            type: 'text',
        },
        {
            name: 'description',
            required: false,
            type: 'text',
        },
        {
            name: 'featuredImage',
            type: 'text',
            required: false,
        },
    ]
}

export default Movies
