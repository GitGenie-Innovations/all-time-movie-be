import payload from "payload";
import { CollectionConfig } from "payload/types";

const ShowTimes: CollectionConfig = {
  slug: "showtimes",
  access: {
    create: () => true,
    read: () => true,
  },
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "hallId",
      relationTo: "halls",
      required: true,
      type: "relationship",
    },
    {
      name: "movieId",
      relationTo: "movies",
      required: true,
      type: "relationship",
    },
    {
      name: "showtimes",
      type: "array",
      fields: [
        {
          name: "day",
          type: "date",
          admin: {
            date: {
              pickerAppearance: "dayOnly",
              displayFormat: "d MMM yyy",
            },
          },
        },
        {
          name: "times",
          type: "array",
          fields: [
            {
              name: "time",
              type: "date",
              admin: {
                date: {
                  pickerAppearance: "timeOnly",
                  displayFormat: "h:mm:ss a",
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "meta",
      type: "text",
      required: false,
    },
  ],
  endpoints: [
    {
      path: "/add-showtime",
      method: "post",
      handler: async (req, res) => {
        try {
          const { movieTitle, hallId, meta, showtimes } = req.body;
          if (!hallId) throw new Error("Missing required field: hallId");
          if (!movieTitle) throw new Error("Missing required field: movieTitle");

          let createShowTimeArgs: any = {
            collection: "showtimes",
            data: {
              hallId: hallId,
              meta: meta,
              showtimes: showtimes,
              movieId: null,
            },
          };

          const foundMovie = await payload.find({
            collection: "movies",
            where: {
              "alias.aliasName": {
                contains: movieTitle,
              },
            },
          });

          if (foundMovie?.totalDocs > 0 && Array.isArray(foundMovie?.docs) && foundMovie?.docs?.length > 0) {
            createShowTimeArgs.data.movieId = foundMovie?.docs[0].id;
          } else {
            let createMovieArgs = {
              collection: "movies",
              data: {
                name: movieTitle,
                alias: [
                  {
                    aliasName: movieTitle,
                  },
                ],
              },
            };
            const createdMovie = await payload.create(createMovieArgs);
            createShowTimeArgs.data.movieId = createdMovie.id;
          }

          const createdShowTime = await payload.create(createShowTimeArgs);
          res.status(200).send({ message: "success", data: createdShowTime });
        } catch (e) {
          res.status(404).send({ error: e?.message });
        }
      },
    },
  ],
};

export default ShowTimes;
