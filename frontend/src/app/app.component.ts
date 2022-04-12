import {Component, OnInit, OnDestroy} from '@angular/core';
import {MsalService, MsalBroadcastService} from '@azure/msal-angular';
import {InteractionStatus} from '@azure/msal-browser';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import { environment } from '../environments/environment';
import { ApiResponse } from './model/api-response.model';
import { Team } from './model/team.model';
import { HttpClient } from '@angular/common/http';
import { Token } from './model/token.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  // @ts-ignore
  public response: Object;

  constructor(private broadcastService: MsalBroadcastService, private authService: MsalService, private http: HttpClient) {
  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });

  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  login() {
    this.authService.loginRedirect();
  }

  logout() { // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  signup(): void {

    this.http.get('/backend', {}).subscribe((response) => {
      console.log(response);
      this.response = response;
    });
  }
}



