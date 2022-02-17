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
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated

    let response = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    return Promise.resolve(response);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      // to ask the Express webserver to make an API request to Spotify at the endpoint passed in. 
      // The endpoints should then return the appropriate data type for each API call. 
      // You will be able to test your function by building out the pages in the assignment.

      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    return this.sendRequestToExpress('/search/' + category + '/' + encodeURIComponent(resource)).then((data) => {
      let key = category + "s";
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
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    return this.sendRequestToExpress('/artist/' + encodeURIComponent(artistId)).then((data) => {
      return new ArtistData(data);
    });
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    return this.sendRequestToExpress('/artist-related-artists/' + encodeURIComponent(artistId)).then((data) => {
      let key = "artists";
      return data[key].map(x => new ArtistData(x));
    });
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-top-tracks/' + encodeURIComponent(artistId)).then((data) => {
      let key = "tracks";
      return data[key].map(x => new TrackData(x));
    });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    return this.sendRequestToExpress('/artist-albums/' + encodeURIComponent(artistId)).then((data) => {
      let key = "items";
      return data[key].map(x => new AlbumData(x));
    });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    return this.sendRequestToExpress('/album/' + encodeURIComponent(albumId)).then((data) => {
      return new AlbumData(data);
    });
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    return this.sendRequestToExpress('/album-tracks/' + encodeURIComponent(albumId)).then((data) => {
      let key = "items";
      return data[key].map(x => new TrackData(x) ); 
    });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    return this.sendRequestToExpress('/track/' + encodeURIComponent(trackId)).then((track) => {
      return new TrackData(track); 
    });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    return this.sendRequestToExpress('/track-audio-features/' + encodeURIComponent(trackId)).then((track)=>{
      let trackFeatures = [];
      TrackFeature.FeatureTypes.forEach((element) => {
        trackFeatures.push(new TrackFeature(element, track[element]));
      });

      return trackFeatures;
    });
  }
}
