import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mutulist',
  templateUrl: './mutulist.component.html',
  styleUrls: ['./mutulist.component.scss']
})
export class MutulistComponent implements OnInit {
  Mutulistes: string = "Mutulistes";
  constructor() { }

  ngOnInit(): void {
  }

}
