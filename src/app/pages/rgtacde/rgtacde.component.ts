import { Component, OnInit } from '@angular/core';
import { RgtacdeService } from '../../services/rgtacde.service';
import { tap } from 'rxjs/operators';
import { Rgtacde } from '../../models/rgtacde';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rgtacde',
  templateUrl: './rgtacde.component.html'
})
export class RgtacdeComponent implements OnInit {
  public rgtacdes: Rgtacde[];
  paginador: any;
  constructor(private serveRg: RgtacdeService, private actiRouter: ActivatedRoute ) { }

  ngOnInit() {
    // VAMOS A TRAER EL PAGE DE RGTACDDE
    this.actiRouter.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if (!page) { // SI NO EXISTE
        page = 0;
      }
      this.serveRg.getPageRgtacde(page).pipe(
          tap(response => {
            console.log('RgtacdeComponent: tap 3');
            (response.content as Rgtacde[]).forEach( rgtacde => {
              console.warn(rgtacde.usuario);
            });
          })
        ).subscribe( response => {
          this.rgtacdes = response.content as Rgtacde[];
          this.paginador = response;
        });
      }
    );

  }

}
