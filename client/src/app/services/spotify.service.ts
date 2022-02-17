import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    // uses the injected http Service to make a get request to the Express endpoint and return the response
    // note: toPromise() is a deprecated function that will be removed in the future

    let response = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    return Promise.resolve(response);
  }

  aboutMe():Promise<ProfileData> {
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    // Returns an array of data that depends on the category parameter (artist, album, track)
    return this.sendRequestToExpress('/search/' + category + '/' + encodeURIComponent(resource)).then((data) => {
      let key = category + "s"; // the data we need from the json object will be at key 'artists', 'tracks', or 'albums'
      if (category.localeCompare('artist') === 0) {
        return data[key].items.map(x => new ArtistData(x));
      }
      else if (category.localeCompare('album') === 0) {
        return data[key].items.map(x => new AlbumData(x));
      }
      // else track
      return data[key].items.map(x => new TrackData(x));
    });
  }

  getArtist(artistId:string):Promise<ArtistData> {
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    return this.sendRequestToExpress('/artist-related-artists/' + encodeURIComponent(artistId)).then((data) => {
      let key = "artists";
      return data[key].map(x => new ArtistData(x));
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)).then((data) => {
      let key = "tracks";
      return data[key].map(x => new TrackData(x));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then((data) => {
      let key = "items";
      return data[key].map(x => new AlbumData(x));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId)).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then((data) => {
      let key = "items";
      return data[key].map(x => new TrackData(x) ); 
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId)).then((track) => {
      return new TrackData(track); 
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    return this.sendRequestToExpress('/track-audio-features/' + encodeURIComponent(trackId)).then((track) => {
      let trackFeatures = [];
      // dynamically grabs the feature types to index the json object
      TrackFeature.FeatureTypes.forEach((element) => {
        trackFeatures.push(new TrackFeature(element, track[element]));
      });

      return trackFeatures;
    });
  }
}
