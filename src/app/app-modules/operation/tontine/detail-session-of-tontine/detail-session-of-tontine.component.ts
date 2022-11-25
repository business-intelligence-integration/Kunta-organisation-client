import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cycle } from 'src/app/core/classes/cycle';
import { Session } from 'src/app/core/classes/session';
import { CycleService } from 'src/app/core/services/cycle/cycle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-session-of-tontine',
  templateUrl: './detail-session-of-tontine.component.html',
  styleUrls: ['./detail-session-of-tontine.component.scss']
})
export class DetailSessionOfTontineComponent implements OnInit {

  activeToggle: string = "";
  homeSider: string = "";
  isPushed: string = "";
  sessions: Session[] = [];
  idCycle: number = 0;
  cycle: Cycle = new Cycle();

  constructor(private cycleService: CycleService,  private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllSessionsOfCycle();
    this.getCycle();
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

  getCycle(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.cycleService.findCycleById(params['id']).subscribe((res)=>{
        this.cycle = res.data;
      });
    })
  }

    getAllSessionsOfCycle(){
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idCycle = params['id'];
      this.cycleService.findAllSessionsOfCycle(params['id']).subscribe((res)=>{
        this.sessions = res.data;
      });
    })
  }

  onDelate(id: number){
    this.deleteMessage(this.idCycle, id)
  }


  deleteMessage(idCycle: number, idSession: number) {
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
          this.cycleService.deleteSessionOfACycle(idCycle, idSession).subscribe(
            () => {
              this.getAllSessionsOfCycle();
              swalWithBootstrapButtons.fire({
                title: 'Deleted !',
                text: 'Session has been deleted.',
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
