import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.scss']
})
export class OperatorComponent implements OnInit {
  Operateurs: string = "Operateurs";
  constructor() { }

  ngOnInit(): void {
  }

}
