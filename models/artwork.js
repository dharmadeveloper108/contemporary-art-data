export class Artwork {
  constructor(type, title, description, artsyLink, thumbnail) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.artsyLink = artsyLink;
    this.thumbnail = thumbnail;
  }
}

export const formatArtwork = (response) => {
  const { type, title } = response;
  const description = response.description;
  const artsyLink = response["_links"].permalink
    ? response["_links"].permalink.href
    : undefined;
  const thumbnail = response["_links"].thumbnail
    ? response["_links"].thumbnail.href
    : undefined;
  return new Artwork(type, title, description, artsyLink, thumbnail);
};
