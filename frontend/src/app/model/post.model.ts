export class Post {
  public constructor(
    public id?: any,
    public replyToId?: any,
    public etag?: any,
    public messageType?: any,
    public createdDateTime?: any,
    public lastModifiedDateTime?: any,
    public lastEditedDateTime?: any,
    public deletedDateTime?: any,
    public subject?: any,
    public summary?: any,
    public chatId?: any,
    public importance?: any,
    public locale?: any,
    public webUrl?: any,
    public policyViolation?: any,
    public eventDetail?: any,
    public from?: any,
    public body?: any,
    public channelIdentity?: any,
    public attachments?: any,
    public mentions?: any,
    public reactions?: any
  ) {
  }
}
