import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Function } from 'src/app/core/classes/function';
import { Post } from 'src/app/core/classes/post';
import { User } from 'src/app/core/classes/user';
import { CenterService } from 'src/app/core/services/centers/center.service';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-posts-of-centers',
  templateUrl: './posts-of-centers.component.html',
  styleUrls: ['./posts-of-centers.component.scss']
})
export class PostsOfCentersComponent implements OnInit {

  posts: Post[] = [];
  ngSelectFunction = 0;
  operators: any;
  openOperatorModal: string = "";
  addOperatorForm!: FormGroup;
  isSaving: boolean = false;
  idPost: number = 0;
  functions: Function[] = [];

  constructor(private centerService: CenterService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder,
    private fonctionService: FonctionService,
    private utilityService: UtilityService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getCenter()
    this.getAllPostByIdCenter();
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


  getCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.centerService.getCenterById(params['id']).subscribe((res)=>{
       //this.posts = res.data.posts;
      });
    })
  }

  getAllPostByIdCenter(){
    this.activatedRoute.queryParams.subscribe((params) => {
        this.postService.finAllPostByIdCenter(params['id']).subscribe((res)=>{
          this.posts = res.data;
          
        })
      });
   
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

  getAllOperators(){
    this.userService.findUsersByRoleName('OPERATOR').subscribe((res)=>{
      this.operators = res.data.map((operator: any)=>({value: operator.id, label: operator.firstName}))
    })
  }

    getAllFunctions(){
    this.fonctionService.findAllFunctions().subscribe((res)=>{
      this.functions = res.data;
    })
  }

  addOperatorToMainOffice(idOperator: number, idFunction: number){
    this.isSaving = true;
    this.postService.addOperatorToPost(idOperator, this.idPost, idFunction).subscribe((res)=>{
      this.isSaving = false;
      this.closeOperatorModal();
      this.getAllPostByIdCenter();
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

}
