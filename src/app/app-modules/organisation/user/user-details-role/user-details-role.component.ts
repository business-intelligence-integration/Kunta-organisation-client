import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import { Role } from 'src/app/core/classes/role';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/users/user.service';
import { User } from 'src/app/core/classes/user';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-user-details-role',
  templateUrl: './user-details-role.component.html',
  styleUrls: ['./user-details-role.component.scss']
})
export class UserDetailsRoleComponent implements OnInit {
  show: boolean = false;
  activeRightMenu: string = "";
  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  roles: Role[] =[];
  user: User = new User();
  idUser: number = 0;
  constructor(private location: Location,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getUser();
  }

  comeBack(){this.location.back()}
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

  onRemoveRole(idRole: number){
    this.deleteMessage(idRole);
  }

  getUser(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userService.getMemberById(params['id']).subscribe((res)=>{
        this.idUser = params['id']
        this.user = res.data;
        this.roles = res.data.roles;
        if (this.roles.length <= 0) {
          this.show = true;
        }
        this.loaderService.hideLoader();
      });
    })
  }

  deleteMessage(idRole: number) {
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
        text: "Cette action est irreversible !",
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
          this.userService.removeRole(this.idUser, idRole).subscribe(
            (res) => {
              this.getUser();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Le rôle a bien été retiré !',
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
            text: 'Vous avez annulé la suppression',
            confirmButtonColor: '#d33',
          });
        }
      });
  }
}
