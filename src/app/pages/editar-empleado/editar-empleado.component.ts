import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-editar-empleado',
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent implements OnInit{

  // propiedades
  empleadoForm: FormGroup;
  
  enviado = false;
  empleadoDepartamento: any = [
    'Contabilidad',
    'Finanzas',
    'Recursos humanos',
    'Ventas',
    'TI'
  ];

  empleadoData: Empleado[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getEmpleado(id);

    this.empleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,4}'),
      ],
      ],
      telefono: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ],

      ]
    });

  }

  //metodo para generar el formulario
  mainForm() {
    this.empleadoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[a-z]{2,4}'),
      ],
      ],
      telefono: ['',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
        ],

      ]
    });
  }

  //metodo para asignar el departamento seleccionado por el usuario
  actualizarDepartamento(d) {
    this.empleadoDepartamento.get('departamento').setValue(d, {
      onlySelf: true,
    });
  }

  //getter para acceder a los controles del formulario
  get myForm() {
    return this.empleadoForm.controls;
  }

  //metodo para buscar el empleado que vamos a modificar
  getEmpleado(id) {
    this.empleadoService.obtenerEmpleado(id).subscribe((data) => {
      this.empleadoForm.setValue({
        nombre: data['nombre'],
        departamento: data['departamento'],
        email: data['email'],
        telefono: data['telefono']
      });
    })
  }

  //metodo para enviar el formulario
  onSubmit() {
    this.enviado = true;

    if (!this.empleadoForm.valid) {
      return false;
    } else {
      if (window.confirm('¿Estas seguro que lo quieres modificar')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.empleadoService.actualizarEmpleado(id, this.empleadoForm.value)
          .subscribe({
            complete: () => {
              this.router.navigateByUrl('/listado-empleados');
              console.log('Se actualizo correctamente')
            },
            error: (e) => {
              console.log(e);
            }
          })
      }
    }
  }

}