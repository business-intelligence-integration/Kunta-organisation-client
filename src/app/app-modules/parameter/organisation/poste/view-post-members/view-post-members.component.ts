import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-post-members',
  templateUrl: './view-post-members.component.html',
  styleUrls: ['./view-post-members.component.scss']
})
export class ViewPostMembersComponent implements OnInit {

  show: boolean = false;
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  operators: User[] = [];
  idPost: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private postService: PostService,
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getPostById();
  }

  activeHomeSider() {
    if (this.activeToggle == "") {
      this.activeToggle = "active";
      this.homeSider = "is-active";
      this.isPushed = "is-pushed-full";
    } else {
      this.activeToggle = "";
      this.homeSider = "";
      this.isPushed = "";
    }
  }
  
  backBack(){this.location.back()}

  getPostById(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.postService.findPostById(params['id']).subscribe((res)=>{
        this.idPost = params['id'];
        if(res == null){
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.operators = res.data.operators;
          if( this.operators.length <= 0 ) {
            this.show = true;
            this.loaderService.hideLoader();
          } else {
            this.show = false;
            this.loaderService.hideLoader();
          }
        }
      })
    })
  }

  onDelete(idOperator: number){
    this.deleteMessage(idOperator);
  }

  deleteMessage(idOperator: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
        title: 'Êtes-vous sûre ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, retirer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.postService.removeAnOperatorFromAPost(idOperator, this.idPost).subscribe(
            () => {
              this.getPostById();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Operateur a été retiré.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite !',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'Vous avez annulé le retrait',
            confirmButtonColor: '#d33',
          });
        }
      });
  }
}
