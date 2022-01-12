import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  @Input() url : any
  @Input() titulo: any
  
  productos : any = []
  constructor() { }

  ngOnInit(): void {
  }

}
