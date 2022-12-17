import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piece-type',
  templateUrl: './piece-type.component.html',
  styleUrls: ['./piece-type.component.scss']
})
export class PieceTypeComponent implements OnInit {

  openCreateModal: string = "";
  constructor() { }

  ngOnInit(): void {
  }


  onOpenCreateModal(){
    this.openCreateModal = "is-active";
  }
}
