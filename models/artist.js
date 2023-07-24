export class Artist {
  constructor(type, title, artsyId, artsyLink, thumbnail) {
    this.type = type;
    this.title = title;
    this.artsyId = artsyId;
    this.artsyLink = artsyLink;
    this.thumbnail = thumbnail;
  }
}

export const formatArtist = (response) => {
  const { type, title } = response;
  const artsyId = response["_links"].self.href.split("/artists/")[0];
  const artsyLink = response["_links"].permalink
    ? response["_links"].permalink.href
    : undefined;
  const thumbnail = response["_links"].thumbnail
    ? response["_links"].thumbnail.href
    : undefined;
  return new Artist(type, title, artsyId, artsyLink, thumbnail);
};
