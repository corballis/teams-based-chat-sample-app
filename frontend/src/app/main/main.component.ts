import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ApiResponse} from "../model/api-response.model";
import {MsalBroadcastService, MsalService} from "@azure/msal-angular";
import {HttpClient} from "@angular/common/http";
import {filter, takeUntil} from "rxjs/operators";
import {InteractionStatus} from "@azure/msal-browser";
import {Team} from "../model/team.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit, OnDestroy {
  isIframe = false;
  loginDisplay = false;
private readonly _destroying$ = new Subject<void>();
public teams: ApiResponse<Team[]> = new ApiResponse<Team[]>();
public selectedChannelId: string = '';
public selectedTeamId: string = '';

  constructor(private broadcastService: MsalBroadcastService, private authService: MsalService, private http: HttpClient) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        const logged = this.authService.instance.getAllAccounts().length > 0;
        if (logged) {
          this.loginDisplay = true;
          this.getJoinedTeamsOfUser();
        }
      });

  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  getJoinedTeamsOfUser() {
    const url = 'https://graph.microsoft.com/v1.0/me/joinedTeams';
    this.http.get(url).subscribe((teams:ApiResponse<Team[]>) => {
      this.teams = teams;
    })
  }


  setSelectedChannel(teamIdAndChannelId: string[]): void {
    if (teamIdAndChannelId && teamIdAndChannelId.length === 2) {
      this.selectedTeamId = teamIdAndChannelId[0];
      this.selectedChannelId = teamIdAndChannelId[1];
    }
  }

}
