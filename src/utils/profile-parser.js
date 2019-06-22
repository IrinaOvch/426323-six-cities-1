export default class ProfileParser {
  static parseProfile(data) {
    const parsedProfile = {
      id: data.id,
      email: data.email,
      name: data.name,
      avatarUrl: data.avatar_url,
      isPro: data.is_pro,
    };
    return parsedProfile;
  }
}
