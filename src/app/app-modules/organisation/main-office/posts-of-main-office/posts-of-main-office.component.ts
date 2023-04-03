import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Function } from 'src/app/core/classes/function';
import { Post } from 'src/app/core/classes/post';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-posts-of-main-office',
  templateUrl: './posts-of-main-office.component.html',
  styleUrls: ['./posts-of-main-office.component.scss']
})
export class PostsOfMainOfficeComponent implements OnInit {

  posts: Post[] = []
  operators: any;
  openOperatorModal: string = "";
  addOperatorForm!: FormGroup;
  isSaving: boolean = false;
  functions: Function[] = [];
  ngSelectFunction = 0;

  constructor(private postService: PostService, 
    private mainOfficeService: MainOfficeService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private fonctionService: FonctionService,) { }

  ngOnInit(): void {
    // this.getAllPostsOfMainOffice();
    this.getAllMainOffices();
    this.getAllOperators(); 
    this.formInit();
    this.getAllFunctions();
  }

  formInit() {
    this.addOperatorForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      idFunction: new FormControl(null, Validators.required)
    })
  }

  getAllMainOffices(){
    this.mainOfficeService.findAllOffices().subscribe((res)=>{
      this.posts = res.data[0].posts;
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
    this.userService.findUsersByRoleName('OPERATOR').subscribe((res)=>{
      console.log("res::", res);
      this.operators = res.data.map((operator: any)=>({value: operator.id, label: operator.firstName}))
    })
  }

  getAllFunctions(){
    this.fonctionService.findAllFunctions().subscribe((res)=>{
      this.functions = res.data;
    })
  }
}
