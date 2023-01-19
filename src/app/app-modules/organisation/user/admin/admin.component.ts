import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/classes/user';
import { UserService } from 'src/app/core/services/users/user.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  Admins: string = "Admins";
  disabledUserAction: string="disabled";
  users: User[] = [];
  constructor(private userService:UserService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.getAllAmins();
    this.getConnectedUser();
  }

  getAllAmins(){
    this.userService.getAllAdmins().subscribe((res)=>{
      this.users = res.data  
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
        title: 'Are you sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteById(id).subscribe(
            () => {
              this.getAllAmins();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Admin has been deleted.',
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
            text: 'you have cancelled the deletion',
            confirmButtonColor: '#d33',
          });
        }
      });
  }
}
