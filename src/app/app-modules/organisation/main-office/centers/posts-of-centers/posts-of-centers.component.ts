import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/core/classes/post';
import { User } from 'src/app/core/classes/user';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-posts-of-centers',
  templateUrl: './posts-of-centers.component.html',
  styleUrls: ['./posts-of-centers.component.scss']
})
export class PostsOfCentersComponent implements OnInit {

  posts: Post[] = [];
  operators: any;
  openOperatorModal: string = "";
  addOperatorForm!: FormGroup;
  isSaving: boolean = false;
  constructor(private centerService: CenterService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

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
    this.openOperatorModal = "is-active";
  }

  closeOperatorModal(){
    this.openOperatorModal = "";
  }

  onSubmitOperator(){
    
  }

  getAllOperators(){
    this.userService.findUsersByLastName('OPERATOR').subscribe((res)=>{
      this.operators = res.data.map((operator: any)=>({value: operator.id, label: operator.firstName}))
    })
  }

}
