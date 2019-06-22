export default class OffersParser {

  static parseOffer(data) {
    const parsedOffer = {
      bedrooms: data.bedrooms,
      city: data.city.name,
      coordinates: [
        data.location.latitude,
        data.location.longitude
      ],
      description: data.description,
      goods: data.goods,
      host: {
        id: data.host.id,
        isPro: data.host.is_pro,
        name: data.host.name,
        avatar: data.host.avatar_url,
      },
      id: data.id,
      isInBookmarks: data.is_favorite,
      images: data.images,
      image: data.preview_image,
      isPremium: data.is_premium,
      maxAdults: data.max_adults,
      price: data.price,
      rating: data.rating,
      title: data.title,
      type: data.type,
      zoom: data.location.zoom,
    };

    return parsedOffer;
  }

  static parseOffers(data) {
    return data.map(OffersParser.parseOffer);
  }
}
