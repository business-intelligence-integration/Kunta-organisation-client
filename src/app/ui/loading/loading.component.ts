import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  timer: number = 0;

  constructor() { }

  ngOnInit(): void {
    const obs$ = interval(1000);
    obs$.subscribe((t) => {
      // console.log(t);
      this.timer = t;
    })
  }

}
