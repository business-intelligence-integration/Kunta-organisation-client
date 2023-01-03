import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/classes/user';
import { TontineService } from 'src/app/core/services/tontine/tontine.service';
import Swal from 'sweetalert2';
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-more-participant',
  templateUrl: './view-more-participant.component.html',
  styleUrls: ['./view-more-participant.component.scss']
})
export class ViewMoreParticipantComponent implements OnInit {

  users: User[] = [];
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  idParticipant: number = 0;

  constructor( private activatedRoute: ActivatedRoute, 
    private tontineService: TontineService,
    private location: Location) { }

  ngOnInit(): void {
    this.getTotineUser();
  }

  backBack(){this.location.back()}

  getTotineUser(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.tontineService.getTontineUsers(params['id']).subscribe((res)=>{
        this.idParticipant = params['id'];
        this.users = res.data;
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
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
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
                title: 'Removed !',
                text: 'Participant has been removed.',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'An error has occurred',
                confirmButtonColor: '#d33',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'you have cancelled the removing',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

}
