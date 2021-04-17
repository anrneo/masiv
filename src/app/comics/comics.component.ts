import { Component, OnInit } from '@angular/core';
import {ComicService} from '../comic.service'

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  comics:any = []
  details:any = []
  characters:any = []
  pag = [
    {id:1, active:'active'},
    {id:2, active:''},
    {id:3, active:''},
    {id:4, active:''},
    {id:5, active:''},
    {id:6, active:''},
    {id:7, active:''},
    {id:8, active:''},
    {id:9, active:''},
    {id:10, active:''}
        ]
  constructor(
    private comicService: ComicService
  ) { }

  ngOnInit(): void {
   this.paginate(1)
   
  }

  getDetails(url:any){
    this.comicService.getData(url)
    .subscribe((ele:any)=>{
      if (ele.data.count) {
        this.details = ele.data.results
      }else{
        this.comicService.characters(`https://gateway.marvel.com:443/v1/public/characters?limit=5&offset=${Math.floor(Math.random() * 1000)}`)
        .subscribe((ele:any)=>{
          this.characters = ele.data.results
          console.log(this.characters);
          
        })
      }
    })
  }

  paginate(id:any){
    
    this.pag.map((ele:any)=>{
        if (ele.id==id) {
          ele.active = 'active'
        }else{
          ele.active = ''
        }
    })
    this.comicService.getComic(id)
    .subscribe((dat:any) =>{
      this.comics = dat.data.results
      this.comics.map((ele:any)=>{
        ele.stars = [1,2,3,4,5]
        if (ele.thumbnail.path.split('/').pop()== 'image_not_available') {
          ele.is = false
        }else{
          ele.is = true
        }
      })
      
     })
  }

  stars(i:any,st:any){
    let array = []
    for (let k = 0; k < st; k++) {
      array.push(k+1)
      
    }
    this.comics[i].stars = array
  }

}
