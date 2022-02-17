import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.albumId = this.route.snapshot.paramMap.get('id');

  	// using spotifyService to get the album data and the tracks for the album
    let albumData = this.spotifyService.getAlbum(this.albumId);
    albumData.then((response) => {
      this.album = response;
    });

    let tracksData = this.spotifyService.getTracksForAlbum(this.albumId);
    tracksData.then((response) => {
      this.tracks = response;
    })
  }

}
