import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/classes/post';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-posts-of-main-office',
  templateUrl: './posts-of-main-office.component.html',
  styleUrls: ['./posts-of-main-office.component.scss']
})
export class PostsOfMainOfficeComponent implements OnInit {

  posts: Post[] = []

  constructor(private postService: PostService, 
    private mainOfficeService: MainOfficeService) { }

  ngOnInit(): void {
    // this.getAllPostsOfMainOffice();
    this.getAllMainOffices();
  }

  // getAllPostsOfMainOffice(){
  //   this.postService.findAllPostsByOrganisationLevel("MAINOFFICE").subscribe((res)=>{
  //     console.log("List Posts::", res);
  //     this.posts = res.data;
  //   })
  // }

  onOpenAddOperatorModal(id: number){
    console.log("id::", id);
  }

  getAllMainOffices(){
    this.mainOfficeService.findAllOffices().subscribe((res)=>{
      this.posts = res.data[0].posts;
      console.log("MainsOffices::", res.data[0].posts);
    })
  }

}
