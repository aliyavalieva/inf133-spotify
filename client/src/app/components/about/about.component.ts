import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  // gets the "about me" information from Spotify when the button in the view is clicked.
  // updates the name, profile_pic, and profile_link fields 
  onClickAboutMe() {
    let promise = this.spotifyService.aboutMe();
    promise.then((response) => {
      this.name = response.name;
      this.profile_pic = response.imageURL;
      this.profile_link = response.spotifyProfile;
    });
  }
}
