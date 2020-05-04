import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabezera',
  templateUrl: './cabezera.component.html',
  styles: []
})
export class CabezeraComponent implements OnInit {
  public user: string;
  public rs: string;
  constructor() { }

  ngOnInit() {
    this.user = sessionStorage.getItem('user');
    this.rs = sessionStorage.getItem('rs');
  }

}
