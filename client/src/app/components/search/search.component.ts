import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ArtistData } from '../../data/artist-data';
import { AlbumData } from '../../data/album-data';
import { TrackData } from '../../data/track-data';
import { ResourceData } from '../../data/resource-data';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ SpotifyService ]
})
export class SearchComponent implements OnInit {
  searchString:string;
  searchCategory:string = 'artist';
  searchCategories:string[] = ['artist', 'album', 'track'];
  resources:ResourceData[];
  tracks:ResourceData[];

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  search() {
    // both calls are always made when search() is called
    // without the second call, tracks would bind to the data meant for artist/album causing the app to break
    // the time spent making the second call is minimal and there is no degredation in performance
    this.spotifyService.searchFor(this.searchCategory, this.searchString).then((response) => {
      this.resources = response;
    });

    this.spotifyService.searchFor(this.searchCategories[2], this.searchString).then((response) => {
      this.tracks = response;
    });
  }
}
