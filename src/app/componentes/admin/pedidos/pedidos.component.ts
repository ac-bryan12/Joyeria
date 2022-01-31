import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submenu(submenu:any){
    submenu.classList.toggle("d-none")
  }

}
