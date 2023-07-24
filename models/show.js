export class Show {
  constructor(type, title, artsyLink, thumbnail) {
    this.type = type;
    this.title = title;
    this.artsyLink = artsyLink;
    this.thumbnail = thumbnail;
  }
}

export const formatShow = (response) => {
  const { type, title } = response;
  const artsyLink = response["_links"].permalink
    ? response["_links"].permalink.href
    : undefined;
  const thumbnail = response["_links"].thumbnail
    ? response["_links"].thumbnail.href
    : undefined;
  return new Show(type, title, artsyLink, thumbnail);
};
