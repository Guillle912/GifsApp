import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsHistory: Array<string> = [];

  constructor() { }

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
  }


  searchTag( tags: string ): void{
    if( tags.length === 0 ) return;
    this.organizeHistory( tags );

    // this._tagsHistory.unshift( tags );

    console.log( this.tagsHistory );
  }




}
