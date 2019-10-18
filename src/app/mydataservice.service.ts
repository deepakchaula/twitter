import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PostData, PostDataObj } from './data.model';
import { tap, debounceTime } from 'rxjs/operators';
import { HttpClient , HttpHeaders  } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MydataserviceService {
  public searchText;
  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private http: HttpClient) { 
    this.searchText = 'adobe';
  }

  getMyNews(searchText: string) {
    console.log(searchText);
    return this.http
      .get<PostDataObj[]>('https://aravindtwitter.herokuapp.com/twittersearch?key=' + searchText)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
}
