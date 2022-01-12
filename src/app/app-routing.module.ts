import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/sitioComercial/inicio/inicio.component';
const routes: Routes = [
    {path: '',redirectTo: 'home',pathMatch:'full'},
    {path: 'home',component:InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
