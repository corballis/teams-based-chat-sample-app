import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChannelsComponent} from './channels/channels.component';
import {PostsComponent} from './posts/posts.component';
import {ActivityFeedComponent} from './activity-feed/activity-feed.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent} from '@azure/msal-angular';
import {InteractionType, PublicClientApplication} from '@azure/msal-browser';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {MainComponent} from './main/main.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import { environment } from '../environments/environment';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    ChannelsComponent,
    PostsComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: environment.msalConfig.auth.clientId, // This is your client ID          
        authority: 'https://login.microsoftonline.com/' + environment.msalConfig.auth.tenantId, // This is your tenant ID
        redirectUri: environment.msalConfig.auth.redirectUri // This is your redirect URI
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE,
      }
    }), {
      interactionType: InteractionType.Redirect,
      authRequest: {
        scopes: ['Channel.ReadBasic.All', 'ChannelSettings.Read.All', 'ChannelSettings.ReadWrite.All', 'Directory.Read.All', 'Directory.ReadWrite.All', 'Group.Read.All', 'Group.ReadWrite.All', 'Team.ReadBasic.All', 'User.Read']
      }
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']],
        ['https://graph.microsoft.com/users/me/chats/getAllMessages', ['Chat.Read.All', 'Chat.ReadWrite.All']],
        ['https://graph.microsoft.com/v1.0/teams/', ['ChannelMessage.Read.All', 'ChannelMessage.Send', 'Channel.ReadBasic.All', 'ChannelSettings.Read.All', 'ChannelSettings.ReadWrite.All', 'Directory.Read.All', 'Directory.ReadWrite.All', 'Group.Read.All', 'Group.ReadWrite.All', 'Team.ReadBasic.All', 'User.Read']]
      ])
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {
}
