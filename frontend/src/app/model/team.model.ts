import {Channel} from "./channel.model";

export class Team {
  public constructor(
    public classification?: any,
    public createdDateTime?: any,
    public description?: any,
    public discoverySettings?: any,
    public displayName?: any,
    public funSettings?: any,
    public guestSettings?: any,
    public id?: any,
    public internalId?: any,
    public isArchived?: any,
    public isMembershipLimitedToOwners?: any,
    public memberSettings?: any,
    public messagingSettings?: any,
    public specialization?: any,
    public summary?: any,
    public visibility?: any,
    public webUrl?: any,
    // @ts-ignore
    public channels?: Channel[]
  ) {
  }
}
