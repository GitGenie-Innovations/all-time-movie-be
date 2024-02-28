import payload from "payload";
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
  endpoints: [
    {
      path: "/recent-movies",
      method: "get",
      handler: async (req, res) => {
        try {
          const recentMovies = await payload.find({
            collection: "movies",
            sort: "-createdAt", // sort by creation date in descending order
            limit: 10, // limit the results to 10 movies
          });

          if (!recentMovies || recentMovies.totalDocs === 0) {
            throw new Error("No recent movies found");
          }

          res.status(200).send({ message: "success", data: recentMovies });
        } catch (e) {
          res.status(404).send({ error: e?.message });
        }
      },
    },
    {
      path: "/today-movies",
      method: "get",
      handler: async (req, res) => {
        try {
          
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const tomorrow = new Date(today);
          console.log("tomorrow --->", tomorrow);
          tomorrow.setDate(tomorrow.getDate() + 1);

          const todayMovies = await payload.find({
            collection: "movies",
            where: {
              createdAt: {
                $gte: today,
                $lt: tomorrow,
              },
            },
          });

          if (!todayMovies || todayMovies.totalDocs === 0) {
            throw new Error("No movies found for today");
          }

          console.log("Hello world");

          res.status(200).send({ message: "success", data: todayMovies });
        } catch (e) {
          res.status(404).send({ error: e?.message });
        }
      },
    },
    {
      path: "/tomorrow-movies",
      method: "get",
      handler: async (req, res) => {
        try {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);

          const dayAfterTomorrow = new Date(tomorrow);
          dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

          const tomorrowMovies = await payload.find({
            collection: "movies",
            where: {
              createdAt: {
                $gte: tomorrow,
                $lt: dayAfterTomorrow,
              },
            },
          });

          if (!tomorrowMovies || tomorrowMovies.totalDocs === 0) {
            throw new Error("No movies found for tomorrow");
          }

          res.status(200).send({ message: "success", data: tomorrowMovies });
        } catch (e) {
          res.status(404).send({ error: e?.message });
        }
      },
    },
    {
      path: "/this-week-movies",
      method: "get",
      handler: async (req, res) => {
        try {
          const now = new Date();
          const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(endOfWeek.getDate() + 7);

          const thisWeekMovies = await payload.find({
            collection: "movies",
            where: {
              createdAt: {
                $gte: startOfWeek,
                $lt: endOfWeek,
              },
            },
          });

          if (!thisWeekMovies || thisWeekMovies.totalDocs === 0) {
            throw new Error("No movies found for this week");
          }

          res.status(200).send({ message: "success", data: thisWeekMovies });
        } catch (e) {
          res.status(404).send({ error: e?.message });
        }
      },
    },
    {
      path: "/this-month-movies",
      method: "get",
      handler: async (req, res) => {
        try {
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          startOfMonth.setHours(0, 0, 0, 0);

          const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
          endOfMonth.setHours(23, 59, 59, 999);

          const thisMonthMovies = await payload.find({
            collection: "movies",
            where: {
              createdAt: {
                $gte: startOfMonth,
                $lt: endOfMonth,
              },
            },
          });

          if (!thisMonthMovies || thisMonthMovies.totalDocs === 0) {
            throw new Error("No movies found for this month");
          }

          res.status(200).send({ message: "success", data: thisMonthMovies });
        } catch (e) {
          res.status(404).send({ error: e?.message });
        }
      },
    },

    {
      path: "/custom-date-range-movies",
      method: "get",
      handler: async (req, res) => {
        try {
          const { startDate, endDate } = req.query;

          if (!startDate || !endDate) {
            throw new Error("Both startDate and endDate are required");
          }

          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);

          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);

          const customDateRangeMovies = await payload.find({
            collection: "movies",
            where: {
              createdAt: {
                $gte: start,
                $lt: end,
              },
            },
          });

          if (!customDateRangeMovies || customDateRangeMovies.totalDocs === 0) {
            throw new Error("No movies found for the specified date range");
          }

          res.status(200).send({ message: "success", data: customDateRangeMovies });
        } catch (e) {
          res.status(400).send({ error: e?.message });
        }
      },
    },
  ],
};

export default Movies;
