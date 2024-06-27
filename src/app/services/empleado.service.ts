import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //método para agregar un empleado
  agregarEmpleado(data): Observable<any> {
    let url = `${this.baseUri}/agregar`;
    return this.http.post(url, data).pipe(catchError(this.errorManager));
  }

  //método para obtener todos los empleados
  obtenerEmpleados() {
    let url = `${this.baseUri}/empleados`;
    return this.http.get(url);
  }

  //método para obtener un empleado por su id
  obtenerEmpleado(id: string): Observable<any> {
    let url = `${this.baseUri}/empleado/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(map((res: Response) => { return res || {}; }),
      catchError(this.errorManager));
  }

  //método para actualizar un empleado
  actualizarEmpleado(id: string, data): Observable<any> {
    let url = `${this.baseUri}/actualizar/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(catchError(this.errorManager));
  }

  //método para eliminar un empleado
  eliminarEmpleado(id: string) {
    let url = `${this.baseUri}/eliminar/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(catchError(this.errorManager));
  }

  //manejador de errores
  errorManager(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //obtenemos error del lado del cliente
      errorMessage = error.error.message;
    } else {
      //obtenemos error del lado del servidor
      errorMessage = 'Error: ' + error.status + ' Mensaje: ' + error.message;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    })
  }
}
