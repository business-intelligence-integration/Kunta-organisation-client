import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Beneficiary } from 'src/app/core/classes/beneficiary';
import { User } from 'src/app/core/classes/user';
import { BeneficiaryService } from 'src/app/core/services/beneficiary/beneficiary.service';
import { UserService } from 'src/app/core/services/users/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sponsores',
  templateUrl: './sponsores.component.html',
  styleUrls: ['./sponsores.component.scss']
})
export class SponsoresComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  user: User = new User();
  sponsores: User[] = [];
  beneficiary: Beneficiary = new Beneficiary();
  beneficiaries: Beneficiary[] = [];
  

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private beneficiaryService: BeneficiaryService) { }

  ngOnInit(): void {
    this.getUser();
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

  getUser(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userService.getMemberById(params['id']).subscribe((res)=>{
        this.user = res.data;
        this.sponsores = res.data.sponsoredUsers;
        this.beneficiaries = this.user.beneficiaries;
        console.log("sponsore::", res);
      });
    })
  }

  calculateAgeAccordingDateOfBirth(StringDateOfBirth: any): any{
    let dateOfBirth = new Date(StringDateOfBirth);
    let age = Date.now() - dateOfBirth.getTime();
    var newAge = new Date(age); 
    return  Math.abs(newAge.getUTCFullYear() - 1970);;
  }

  onDeleteUser(id: number){
    this.deleteMessage(id);
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
        title: 'Vous êtes sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annulez !',
        confirmButtonColor: '#198AE3',
        cancelButtonColor: '#d33',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.beneficiaryService.deleteBeneficiary(id).subscribe(
            () => {
              this.getUser();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'L\'ayant droit a bien été supprimé !',
                confirmButtonColor: '#198AE3',
              });
            },
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Cancelled',
                text: 'Une erreur s\'est produite',
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
