import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComicService {
  apikey = '5f3848d4c192c0b112d0e46bf1450f82'
  constructor(
    private http: HttpClient
  ) { }

  getComic(id:any){
    return this.http.get(`https://gateway.marvel.com:443/v1/public/comics?limit=10&offset=${id*100}&apikey=${this.apikey}`)
  }

  getData(id:any){
    return this.http.get(`https://gateway.marvel.com:443/v1/public/comics/${id}/characters?apikey=${this.apikey}`)
  }

  characters(url:any){
    return this.http.get(url+'&apikey='+this.apikey)
  }

}
