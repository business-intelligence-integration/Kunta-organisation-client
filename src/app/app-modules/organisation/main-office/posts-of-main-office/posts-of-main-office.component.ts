import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Function } from 'src/app/core/classes/function';
import { Post } from 'src/app/core/classes/post';
import { FonctionService } from 'src/app/core/services/fonction/fonction.service';
import { MainOfficeService } from 'src/app/core/services/main-offices/main-office.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';

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
  idPost: number = 0;
  idMainOffice: number = 0;

  constructor(private postService: PostService, 
    private mainOfficeService: MainOfficeService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fonctionService: FonctionService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    // this.getAllPostsOfMainOffice();
    this.getAllMainOffices();
    this.getAllOperators(); 
    this.formInit();
    this.getAllFunctions();
  }

  formInit() {
    this.addOperatorForm = this.formBuilder.group({
      idOperator: new FormControl(null, Validators.required),
      idFunction: new FormControl(null, Validators.required)
    })
  }

  getAllMainOffices(){
    this.mainOfficeService.findAllOffices().subscribe((res)=>{
      console.log("resMain::", res);
      
     // this.posts = res.data[0].posts;
      this.idMainOffice = res.data[0].id;
      this.getAllPostByIdMainOffice(this.idMainOffice);
    })
  }

  getAllPostByIdMainOffice(id: number){
    this.postService.finAllPostByIdMainOffice(id).subscribe((res)=>{
      this.posts = res.data;
      console.log("posts::", res);
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
      console.log("res::", res);
      this.getAllMainOffices();
      this.isSaving = false;
      this.closeOperatorModal();
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
