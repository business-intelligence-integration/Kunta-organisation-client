import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/classes/post';
import { AreaService } from 'src/app/core/services/areas/area.service';

@Component({
  selector: 'app-posts-of-area',
  templateUrl: './posts-of-area.component.html',
  styleUrls: ['./posts-of-area.component.scss']
})
export class PostsOfAreaComponent implements OnInit {

  posts: Post[] = [];
  constructor( private activatedRoute: ActivatedRoute,
    private areaService: AreaService) { }

  ngOnInit(): void {
    this.getArea();
  }

  getArea(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.areaService.getAreaById(params['id']).subscribe((res)=>{
        console.log("areaRes::", res);
        this.posts = res.data.posts;
      });
    })
  }

  onOpenAddOperatorModal(id: number){
    
  }

}
