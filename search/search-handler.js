import fetch from "node-fetch";
import Boom from "@hapi/boom";
import { ARTSY_BASE_URL } from "../config.js";
import {
  getToken,
  extractBearerTokenFromRequest,
} from "../auth/token-handler.js";
import { formatArtist } from "../models/artist.js";
import { formatArtwork } from "../models/artwork.js";
import { formatShow } from "../models/show.js";

const handleSearch = async (request) => {
  const bearerToken = extractBearerTokenFromRequest(request);

  if (!bearerToken || bearerToken !== process.env.BEARER_TOKEN) {
    return Boom.unauthorized();
  }

  const xappToken = await getToken();

  const { query } = request.payload;

  const response = await fetch(
    `${ARTSY_BASE_URL}/search?q=${formatQuery(query)}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Xapp-Token": xappToken.token,
      },
    }
  );

  return formatResponse(await response.json());
};

const formatQuery = (query) => {
  return query.replace(" ", "%25");
};

const formatResponse = (response) => {
  const items = response["_embedded"].results;

  const filteredItems = items.filter(
    (item) =>
      item.type === "artist" || item.type === "artwork" || item.type === "show"
  );

  return filteredItems.map((item) => {
    if (item.type === "artist") {
      return formatArtist(item);
    } else if (item.type === "artwork") {
      return formatArtwork(item);
    } else if (item.type === "show") {
      return formatShow(item);
    }
  });
};

export default handleSearch;
