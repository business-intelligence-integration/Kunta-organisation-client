import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Function } from 'src/app/core/classes/function';
import { Post } from 'src/app/core/classes/post';
import { ClubService } from 'src/app/core/services/clubs/club.service';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-posts-of-club',
  templateUrl: './posts-of-club.component.html',
  styleUrls: ['./posts-of-club.component.scss']
})
export class PostsOfClubComponent implements OnInit {

  ngSelectFunction = 0;
  posts: Post[] = [];
  addOperatorForm!: FormGroup;
  operators: any;
  openOperatorModal: string ="";
  idPost: number = 0;
  isSaving: boolean = false;
  functions: Function [] = [];
  constructor( private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private fonctionService: FonctionService,
    private utilityService: UtilityService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private clubService: ClubService) { }

  ngOnInit(): void {
    this.getClub();
    this.finAllPostByIdClub();
    this.formInit();
    this.getAllFunctions();
    this.getAllOperators();
  }

  formInit() {
    this.addOperatorForm = this.formBuilder.group({
      idOperator: new FormControl(null, Validators.required),
      idFunction: new FormControl(null, Validators.required)
    })
  }

  getClub(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.clubService.getclubById(params['id']).subscribe((res)=>{
        console.log("ClubRes::", res);
       // this.posts = res.data.posts;
      });
    })
  }

  onOpenAddOperatorModal(id: number){
    this.openOperatorModal = "is-active";
    this.idPost = id;
  }

  closeOperatorModal(){
    this.openOperatorModal = "";
  }

  onSubmitOperator(){
    const formValue = this.addOperatorForm.value;
    this.addOperatorToMainOffice(formValue.idOperator, formValue.idFunction)
  }

  addOperatorToMainOffice(idOperator: number, idFunction: number){
    this.isSaving = true;
    this.postService.addOperatorToPost(idOperator, this.idPost, idFunction).subscribe((res)=>{
      console.log("resP::", res);
      
      this.isSaving = false;
      this.closeOperatorModal();
      this.finAllPostByIdClub();
      if(res.data == null){
        this.utilityService.showMessage(
          'warning',
          'Un membre ne peut appartenir à 2 postes !',
          '#e62965',
          'white'
        );
      }else{
        this.utilityService.showMessage(
          'success',
          'Operateur ajouté au poste avec succès !',
          '#06d6a0',
          'white'
        );
      }
     
    },(res)=>{
      if(res.error.status == "BAD_REQUEST"){
        this.isSaving = false;
        this.utilityService.showMessage(
          'warning',
          res.error.message,
          '#e62965',
          'white'
        );
      }else{
        this.utilityService.showMessage(
          'warning',
          'Une erreure s\'est produite',
          '#e62965',
          'white'
        );
      }
    })
  }

  finAllPostByIdClub(){
    this.activatedRoute.queryParams.subscribe((params) => {
        this.postService.finAllPostByIdClub(params['id']).subscribe((res)=>{
          this.posts = res.data
          console.log("postsClub:: ", res);
        })
      });
   
  }

  getAllFunctions(){
    this.fonctionService.findAllFunctions().subscribe((res)=>{
      this.functions = res.data;
    })
  }

  getAllOperators(){
    this.userService.findUsersByRoleName('OPERATOR').subscribe((res)=>{
      this.operators = res.data.map((operator: any)=>({value: operator.id, label: operator.firstName}))
    })
  }
}
