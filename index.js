"use strict";

import Hapi from "@hapi/hapi";
import Joi from "joi";
import { PORT } from "./config.js";
import handleSearch from "./search/search-handler.js";

const init = async () => {
  const server = Hapi.server({
    port: PORT,
  });

  server.route({
    method: "POST",
    path: "/api/search",
    options: {
      validate: {
        payload: Joi.object({
          query: Joi.string().min(1).required(),
        }),
      },
    },
    handler: async (request) => {
      return await handleSearch(request);
    },
  });

  server.route({
    method: "GET",
    path: "/api/ping",
    handler: () => {
      return {
        statusCode: 204,
      };
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
