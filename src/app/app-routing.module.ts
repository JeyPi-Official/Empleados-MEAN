import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEmpleadoComponent } from './pages/agregar-empleado/agregar-empleado.component';
import { ListadoEmpleadosComponent } from './pages/listado-empleados/listado-empleados.component';
import { EditarEmpleadoComponent } from './pages/editar-empleado/editar-empleado.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'agregar-empleado' },
  { path: 'agregar-empleado', component: AgregarEmpleadoComponent },
  { path: 'listado-empleados', component: ListadoEmpleadosComponent },
  { path: 'editar-empleado/:id', component: EditarEmpleadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
