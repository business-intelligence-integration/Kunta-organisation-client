import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import Swal from 'sweetalert2';
import {Location} from "@angular/common";
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-view-more-participant',
  templateUrl: './view-more-participant.component.html',
  styleUrls: ['./view-more-participant.component.scss']
})
export class ViewMoreParticipantComponent implements OnInit {

  show: boolean = false;
  users: User[] = [];
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  idParticipant: number = 0;

  constructor( private activatedRoute: ActivatedRoute, 
    private tontineService: TontineService,
    private loaderService: LoaderService,
    private location: Location) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getTotineUser();
  }

  backBack(){this.location.back()}

  getTotineUser(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.getTontineUsers(params['id']).subscribe((res)=>{
        this.idParticipant = params['id'];
        if ( res == null ) {
          this.show = true;
          this.loaderService.hideLoader();
        } else {
          this.users = res.data;
          if( this.users.length <= 0 ) {
            this.show = true;
            this.loaderService.hideLoader();
          } else {
            this.show = false;
            this.loaderService.hideLoader();
          }
        }
      });
    })
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

  onDeleteUser(idUser: number){
    this.deleteMessage(idUser);
  }

  deleteMessage(id: number) {
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
        title: 'Etes vous sure? ?',
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
          this.tontineService.removeParticipant(this.idParticipant, id).subscribe(
            () => {
              this.getTotineUser();
              swalWithBootstrapButtons.fire({
                title: 'Retiré !',
                text: 'Participant a été retiré.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Annulé',
                text: 'Une erreur s\'est produite',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Annulé',
            text: 'La suppression a été annulé',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

}
