import fetch from "node-fetch";
import { Token } from "./token.js";
import { ARTSY_BASE_URL } from "../config.js";

let inMemoryToken;

export const getToken = async () => {
  if (inMemoryToken && !inMemoryToken.isExpired()) {
    return inMemoryToken;
  }

  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const response = await fetch(`${ARTSY_BASE_URL}/tokens/xapp_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ client_id, client_secret }),
  });

  const jsonResponse = await response.json();
  const { token, expires_at } = jsonResponse;
  inMemoryToken = new Token(token, expires_at);
  return inMemoryToken;
};

export const extractBearerTokenFromRequest = (request) => {
  const auth_header = request.headers["authorization"];
  return auth_header?.startsWith("Bearer ")
    ? auth_header.split(" ")[1]
    : undefined;
};
