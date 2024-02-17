import create from 'payload/dist/collections/operations/create'
import { CollectionConfig } from 'payload/types'

const ShowTimes: CollectionConfig = {
    slug: 'showtimes',
    access: {
        create: () => true,
    },
    admin: {
        useAsTitle: 'email',
    },
    fields: [
        {
            name: 'hallId',
            relationTo: 'halls',
            required: true,
            type: 'relationship',
        },
        {
            name: 'movieId',
            relationTo: 'movies',
            required: true,
            type: 'relationship',
        },
        {
            name: 'showtime',
            type: 'date',
            required: true,
        },
        {
            name: 'meta',
            type: 'text',
            required: false,
        }
    ]
}

export default ShowTimes