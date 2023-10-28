import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: Array<string> = [];
  private apiKey: string = 'jLuEDeJKWXJEaODVei9AqXpzZF3Pqw08';
  private url: string = 'http://api.giphy.com/v1/gifs'

  constructor( private http: HttpClient ) {
      this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }


  private organizeHistory( tags:string ){
    tags = tags.toLocaleLowerCase();

    if( this._tagsHistory.includes( tags ) ){
      this._tagsHistory = this._tagsHistory.filter( oldTag => oldTag !== tags)
    }

    this._tagsHistory.unshift( tags );
    this._tagsHistory = this.tagsHistory.splice(0,10)
    this.saveLocalStorage()
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if( this._tagsHistory.length === 0 ) return;
    this.searchTag( this._tagsHistory[0] );
  }


  searchTag( tags: string ):void{
    if( tags.length === 0 ) return;
    this.organizeHistory( tags );

    this.http.get<SearchResponse>(`${this.url}/search?api_key=jLuEDeJKWXJEaODVei9AqXpzZF3Pqw08&q=${ tags }&limit=20`)
        .subscribe(res => {
          this.gifList = res.data
          console.log(this.gifList)
        })



    console.log( this.tagsHistory );
  }




}
