import {Injectable} from '@angular/core';
import {URLSearchParams, Http,  Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {CacheService} from 'ng2-cache/ng2-cache';

import {Roost} from '../shared/roost';
import {User} from '../shared/user';

@Injectable()
export class RoostService {
    private _url = "http://52.43.46.127:80/api/roost";
    accessToken: string;
    
    constructor(private _http: Http,
                private _cacheService: CacheService){
        if(null != this._cacheService.get('accessTokenRooster')){
            this.accessToken = 'Token ' + this._cacheService.get('accessTokenRooster');
        }
    }

    activate(deal: number){
        var url = this._url + "/activate/";
        var myHeader = new Headers();
        if(null != this.accessToken)
        {
            myHeader.append('Authorization', this.accessToken);
        }
        return this._http.patch(url, JSON.stringify({deal: deal}), {headers: myHeader})
            .map((res: Response) => res.json());
    }
    
    getFeeds(page?: number): Observable<any>  {
        var url = this._url + "/feeds/";
        var myHeader = new Headers();
        if(null != this.accessToken)
        {
            myHeader.append('Authorization', this.accessToken);
        }
        if(null != page)
            url += "?page=" + page;
        return this._http.get(url, {headers: myHeader})
            .map((res: Response) => res.json());
    }

    getFeed(id: number): Observable<any>  {
        var url = this._url + "/" + id;
        var myHeader = new Headers();
        if(null != this.accessToken)
        {
            myHeader.append('Authorization', this.accessToken);
        }
        return this._http.get(url, {headers: myHeader})
            .map((res: Response) => res.json());
    }

    search(key: string, page?: string): Observable<any>{
        var url = this._url + "/search/" + key + "/";
        var myHeader = new Headers();
        if(null != this.accessToken)
        {
            myHeader.append('Authorization', this.accessToken);
        }
        if(null != page)
            url += "?page=" + page; 
        return this._http.get(url, {headers: myHeader})
            .map((res: Response) => res.json());
    }

    shout(id: number): Observable<any>{
        // console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/shout/", JSON.stringify({roost: id}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    listen(id: number): Observable<any>{
        // console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/listen/", JSON.stringify({roost: id}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    comment(id: number, comment: string): Observable<any>{
        // console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'application/json');
        return this._http.post(this._url + "/comment/", JSON.stringify({roost: id, comment: comment}), {headers: myHeader})
            .map((res: Response) => res.json());
    }

    listListeners(id: number): Observable<any>{
        // console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "/list_listeners/" + id, {headers: myHeader})
            .map((res: Response) => res.json());
    }

    listShouts(id: number): Observable<any>{
        // console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "/list_shouts/" + id + "/", {headers: myHeader})
            .map((res: Response) => res.json());
    }

    listComments(id: number): Observable<any>{
        // console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        return this._http.get(this._url + "/comments/" + id + "/", {headers: myHeader})
            .map((res: Response) => res.json());
    }

    leave(id: number): Observable<any>{
        // console.log(id);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        // console.log(this._url + "/leave/" + id + "/");
        return this._http.delete(this._url + "/leave/" + id + "/", {headers: myHeader})
            .map((res: Response) => {
                // console.log(res.json())
            });
    }

    roost(feed: Roost): Observable<any>{
        // console.log("File:" + JSON.stringify(feed.roost_media));
        // console.log(feed.roost_media);
        // console.log(this.accessToken);
        var myHeader = new Headers();
        myHeader.append('Authorization', this.accessToken);
        myHeader.append('Content-Type', 'multipart/form-data');
        // console.log(JSON.stringify({
        //         title: feed.title,
        //         text: feed.text,
        //         location: feed.location,
        //         lat: feed.lat,
        //         lng: feed.lng,
        //         roost_media: feed.roost_media,
        //         media_type: feed.media_type,
        //         type: feed.type,
        //         tags: feed.tags
        //     }));
        return this._http.post(this._url, JSON.stringify({
                title: feed.title,
                text: feed.text,
                location: feed.location,
                lat: feed.lat,
                lng: feed.lng,
                roost_media: feed.roost_media,
                media_type: feed.media_type,
                type: feed.type,
                tags: feed.tags
            }), {headers: myHeader})
            .map((res: Response) => res.json(),
                (err) => console.log(err));
    }


    postRoost (feed: Roost): Observable<any> {
    return Observable.create(observer => {
      let formData: FormData = new FormData(),
      xhr: XMLHttpRequest = new XMLHttpRequest();
      formData.append("title", feed.title);
      formData.append("text", feed.text);
      formData.append("location", feed.location);
      formData.append("lat", feed.lat);
      formData.append("lng", feed.lng);  
      formData.append("media_type", feed.media_type);
      if(feed.media_type == 'IMG'){
          formData.append("image", feed.image);
      }
      else if(feed.media_type == 'AUD'){
          formData.append("audio", feed.audio);
      }
      else if(feed.media_type == 'VID'){
          formData.append("video", feed.video);
      }
      formData.append("type", feed.type);
      formData.append("tags", feed.tags);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

        xhr.open('POST', this._url, true);
        xhr.setRequestHeader('Authorization', this.accessToken);
        xhr.send(formData);
    });
  }
    
}