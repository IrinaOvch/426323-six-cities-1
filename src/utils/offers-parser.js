export default class OffersParser {
  constructor(data) {
    this.bedrooms = data[`bedrooms`];
    this.city = data[`city`][`name`];
    this.coordinates = [
      data[`location`][`latitude`],
      data[`location`][`longitude`]
    ];
    this.description = data[`description`];
    this.goods = data[`goods`];
    this.host = {
      id: data[`host`][`id`],
      isPro: data[`host`][`is_pro`],
      name: data[`host`][`name`],
      avatar: data[`host`][`avatar_url`],
    };
    this.id = data[`id`];
    this.isInBookmarks = data[`is_favorite`];
    this.images = data[`images`];
    this.img = data[`preview_image`];
    this.isPremium = data[`is_premium`];
    this.maxAdults = data[`max_adults`];
    this.price = data[`price`];
    this.rating = data[`rating`];
    this.title = data[`title`];
    this.type = data[`type`];
    this.zoom = data[`location`][`zoom`];
  }

  static parseOffer(data) {
    return new OffersParser(data);
  }

  static parseOffers(data) {
    return data.map(OffersParser.parseOffer);
  }
}
