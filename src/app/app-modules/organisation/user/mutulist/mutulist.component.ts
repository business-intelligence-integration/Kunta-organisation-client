import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-mutulist',
  templateUrl: './mutulist.component.html',
  styleUrls: ['./mutulist.component.scss']
})
export class MutulistComponent implements OnInit {
  show: boolean = false;
  Mutulistes: string = "Mutulistes";
  disabledUserAction: string="disabled";
  users: User[] = [];
  constructor(private userService:UserService, 
    private utilityService: UtilityService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.getAllMembers();
    this.getConnectedUser();
  }

  getAllMembers(){
    this.userService.getAllMutualists().subscribe((res)=>{
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
    })
  }

  getConnectedUser() {
    this.userService.getUserByEmail(this.utilityService.getUserName()).subscribe((res) => {
      res.data.roles.forEach((role: any)=>{
        if(role.name == "ADMIN"){
          this.disabledUserAction = ""
        }
      })
    })
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
        title: 'Êtes-vous sûre ?',
        text: "Cette action est irreversible!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Non, annuler!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteById(id).subscribe(
            () => {
              this.getAllMembers();
              swalWithBootstrapButtons.fire({
                title: 'Supprimé !',
                text: 'Admin a été supprimé.',
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
            text: 'Vous avez annulé la suppression',
            confirmButtonColor: '#d33',
          });
        }
      });
  }

}
