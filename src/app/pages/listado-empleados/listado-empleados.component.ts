import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrl: './listado-empleados.component.css'
})
export class ListadoEmpleadosComponent implements OnInit {
  //propiedes
  empleados: any = [];

  constructor(private empleadoService: EmpleadoService) {
    this.getEmpleados();
  }

  ngOnInit(): void {

  }

  //método para obtener a todos los empleados
  getEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe((data) => {
      this.empleados = data;
    })
  }

  //método para eliminar un empleado
  eliminarEmpleado(empleado, index) {
    if (window.confirm('¿Estás seguro de eliminar al empleado?')) {
      this.empleadoService.eliminarEmpleado(empleado._id).subscribe((data) => {
        this.empleados.splice(index, 1);
      })
    }
  }

}
