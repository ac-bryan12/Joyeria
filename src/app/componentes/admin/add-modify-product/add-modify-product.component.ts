import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/requests/peticiones.service';

@Component({
  selector: 'app-add-modify-product',
  templateUrl: './add-modify-product.component.html',
  styleUrls: ['./add-modify-product.component.css']
})
export class AddModifyProductComponent implements OnInit {

  title = "Agregar Producto"
  categorias:any[] = []
  id = 0

  public product_form: FormGroup;

  constructor(private router: Router,private service: PeticionesService,private form: FormBuilder,private route: ActivatedRoute) {
    this.product_form = this.form.group({
      nombre: this.form.control('', [Validators.required, Validators.minLength(3),Validators.maxLength(255),Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$')]),
      categoria: this.form.control('',[Validators.required]),
      precio: this.form.control('',[Validators.required,Validators.pattern('^[0-9]+([.][0-9]+)?$'),Validators.maxLength(12)]),
      promocion: this.form.control('',[Validators.pattern('^[0-9]+([.][0-9]+)?$'),Validators.maxLength(12)]),
      image_url: this.form.control('',[Validators.required,Validators.maxLength(1024)]),
      stock: this.form.control('',[Validators.required])
    })
   }

  ngOnInit(): void {
    if(this.router.url.includes("modify_product")){
      this.title = "Editar Producto"
    }  
    this.cargarCategorias() 
  }

  cargarCategorias(){
    this.service.peticionGet("http://localhost:8000/api/articulos/categorias",true).subscribe(res=>{
      this.categorias = res
      this.cargarProducto()
    },err=>{

    })
  }

  cargarProducto(){
    this.id = this.router.parseUrl(this.router.url).queryParams['id']
    if(this.id){
      this.product_form.get(["nombre"])?.setValue(this.router.parseUrl(this.router.url).queryParams['nombre'])
      this.product_form.get(["categoria"])?.setValue(this.router.parseUrl(this.router.url).queryParams['categoria_id'])
      this.product_form.get(["image_url"])?.setValue(this.router.parseUrl(this.router.url).queryParams['image_url'])
      this.product_form.get(["precio"])?.setValue(this.router.parseUrl(this.router.url).queryParams['precio'])

      let promocion = this.router.parseUrl(this.router.url).queryParams['promocion']
      this.product_form.get(["promocion"])?.setValue(promocion)
      console.log(promocion)
      if(promocion == null){
        let checkbox: any = document.querySelector("input[type$='checkbox']")
        let input:any = document.querySelector("input[type$='checkbox'] + input")
        checkbox.checked = false
        input.disabled = true
      }
      this.product_form.get(["stock"])?.setValue(this.router.parseUrl(this.router.url).queryParams['stock'])
    }
    
  }

  enviar(values:any){
    let categoria_id = values.categoria
    delete values['categoria']

    if(!values.promocion){
      delete values['promocion']
    }
    
    values.categoria = {
      id : categoria_id
    }

    if(this.id > 0){
      this.service.peticionPut("http://localhost:8000/api/articulos/"+this.id,values).subscribe(res=>{
        alert(res.msg)
        this.router.navigate(['../all_products'],{relativeTo:this.route})
      },err=>{
        alert(err.error.error)
      })
    }
    else{
      this.service.peticionPost("http://localhost:8000/api/articulos",values,true).subscribe(res=>{
        alert(res.msg)
        this.router.navigate(['../all_products'],{relativeTo:this.route})
      },err=>{
        alert(err.error.error)
      })
    }

  }

  changePromocion(input_promocion:any,checkbox:any){
    input_promocion.disabled = !input_promocion.disabled
    if (!checkbox.checked){
      input_promocion.value = null
    }
  }


}
