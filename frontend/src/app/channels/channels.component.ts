import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Team} from "../model/team.model";
import {ApiResponse} from "../model/api-response.model";
import {HttpClient} from "@angular/common/http";
import {Channel} from "../model/channel.model";
import {Observable} from "rxjs";
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";

@Component({
  selector: 'channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.sass']
})
export class ChannelsComponent implements OnInit {

  constructor(private broadcastService: MsalBroadcastService, private authService: MsalService, private http: HttpClient) {
  }

  @Input() teams: Team[] | undefined = [];
  @Output() selectedTeamAndChannel = new EventEmitter<string[]>();

  ngOnInit(): void {
  }

  selectChannel(teamId: string | undefined, channelId: string | undefined): void {
    if (teamId && channelId) {
      this.selectedTeamAndChannel.emit([teamId, channelId]);
    }
  }

  public loadChannels(team: Team): void {
    const url = `https://graph.microsoft.com/v1.0/teams/${team.id}/channels`;
    this.http.get(url).subscribe((channels: ApiResponse<Channel[]>) => {
      // @ts-ignore
      team.channels = channels.value;
    });
  }
}
