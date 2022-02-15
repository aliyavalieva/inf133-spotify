import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService:SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums
    let artistData = this.spotifyService.getArtist(this.artistId);
    artistData.then((response) => {
      this.artist = response;
    });

    let relatedArtistsData = this.spotifyService.getRelatedArtists(this.artistId);
    relatedArtistsData.then((response) => {
      this.relatedArtists = response;
    });

    let topTracksData = this.spotifyService.getTopTracksForArtist(this.artistId);
    topTracksData.then((response) => {
      this.topTracks = response;
    });

    let albumsData = this.spotifyService.getAlbumsForArtist(this.artistId);
    albumsData.then((response) => {
      this.albums = response;
    });
  }

}