import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/classes/post';
import { ClubService } from 'src/app/core/services/clubs/club.service';

@Component({
  selector: 'app-posts-of-club',
  templateUrl: './posts-of-club.component.html',
  styleUrls: ['./posts-of-club.component.scss']
})
export class PostsOfClubComponent implements OnInit {

  posts: Post[] = [];
  constructor( private activatedRoute: ActivatedRoute,
    private clubService: ClubService) { }

  ngOnInit(): void {
    this.getClub();
  }

  getClub(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.clubService.getclubById(params['id']).subscribe((res)=>{
        console.log("ClubRes::", res);
        this.posts = res.data.posts;
      });
    })
  }

  onOpenAddOperatorModal(id: number){
    
  }
}
