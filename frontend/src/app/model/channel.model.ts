export class Channel {
  public constructor(
  public id?: string,
  public createdDateTime?: string,
  public displayName?: string,
  public description?: any,
  public isFavoriteByDefault?: string,
  public email?: string,
  public webUrl?: string,
  public membershipType?: string
  ) {
  }
}
