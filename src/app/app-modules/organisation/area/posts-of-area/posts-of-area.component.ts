import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Function } from 'src/app/core/classes/function';
import { Post } from 'src/app/core/classes/post';
import { AreaService } from 'src/app/core/services/areas/area.service';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

@Component({
  selector: 'app-posts-of-area',
  templateUrl: './posts-of-area.component.html',
  styleUrls: ['./posts-of-area.component.scss']
})
export class PostsOfAreaComponent implements OnInit {

  ngSelectFunction = 0;
  posts: Post[] = [];
  addOperatorForm!: FormGroup;
  operators: any;
  openOperatorModal: string ="";
  idPost: number = 0;
  isSaving: boolean = false;
  functions: Function [] = [];

  constructor( private activatedRoute: ActivatedRoute,
    private areaService: AreaService, private postService: PostService,
    private userService: UserService,
    private utilityService: UtilityService,
    private fonctionService: FonctionService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getArea();
    this.finAllPostByIdArea();
    this.formInit();
    this.getAllOperators();
    this.getAllFunctions();
  }

  formInit() {
    this.addOperatorForm = this.formBuilder.group({
      idOperator: new FormControl(null, Validators.required),
      idFunction: new FormControl(null, Validators.required)
    })
  }


  getArea(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.areaService.getAreaById(params['id']).subscribe((res)=>{
        console.log("areaRes::", res);
        this.posts = res.data.posts;
      });
    })
  }


  finAllPostByIdArea(){
    this.activatedRoute.queryParams.subscribe((params) => {
        this.postService.finAllPostByIdArea(params['id']).subscribe((res)=>{
          this.posts = res.data
          console.log("postsArea:: ", res);
          
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

  getAllOperators(){
    this.userService.findUsersByRoleName('OPERATOR').subscribe((res)=>{
      this.operators = res.data.map((operator: any)=>({value: operator.id, label: operator.firstName}))
    })
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
      this.finAllPostByIdArea();
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

  getAllFunctions(){
    this.fonctionService.findAllFunctions().subscribe((res)=>{
      this.functions = res.data;
    })
  }

}
