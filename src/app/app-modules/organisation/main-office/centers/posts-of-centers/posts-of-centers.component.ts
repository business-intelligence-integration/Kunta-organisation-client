import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/classes/post';
import { CenterService } from 'src/app/core/services/centers/center.service';

@Component({
  selector: 'app-posts-of-centers',
  templateUrl: './posts-of-centers.component.html',
  styleUrls: ['./posts-of-centers.component.scss']
})
export class PostsOfCentersComponent implements OnInit {

  posts: Post[] = [];
  constructor(private centerService: CenterService,
    private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getCenter()
  }

  getCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.centerService.getCenterById(params['id']).subscribe((res)=>{
       this.posts = res.data.posts;
       
      });
    })
  }

  onOpenAddOperatorModal(id: number){
    
  }

}
