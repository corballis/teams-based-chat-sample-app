import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ApiResponse} from "../model/api-response.model";
import {HttpClient} from "@angular/common/http";
import {Post} from "../model/post.model";

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit, OnChanges {

  public selectedPosts: Post[] = [];
  public newMessage: string = '';

  constructor(private http: HttpClient) {
  }

  @Input() selectedTeamAndChannel: string[] = ['', ''];


  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('selectedTeamAndChannel')) {
      const selectedTeamAndChannel = changes['selectedTeamAndChannel'].currentValue;
      if (selectedTeamAndChannel && selectedTeamAndChannel.length == 2) {
        this.loadPosts(selectedTeamAndChannel[0], selectedTeamAndChannel[1]);
      }
    }
  };

  public loadPosts(teamId: string, channelId: string): void {
    if (teamId && teamId.length > 0 && channelId && channelId.length > 0) {
      const url = `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`;
      this.http.get(url).subscribe((posts: ApiResponse<Post[]>) => {
        // @ts-ignore
        this.selectedPosts = posts.value;
      });
    }
  }

  sendMessage(textToSend: string): void {
    const channelSelected = this.selectedTeamAndChannel && this.selectedTeamAndChannel.length === 2
      && this.selectedTeamAndChannel[0] && this.selectedTeamAndChannel[1];
    if (channelSelected && textToSend) {
      const teamId = this.selectedTeamAndChannel[0];
      const channelId = this.selectedTeamAndChannel[1];
      const url = `https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`;

      this.http.post(url, {"body": {content: textToSend}}).subscribe((next) => {
        console.log("message sent");
        this.newMessage = '';
        this.loadPosts(teamId, channelId);
      });
    }
  }
}
