import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  email: string;
  departmentId: number;
  // Add other fields as needed
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private apiUrl = '/api/employees';

  constructor(private http: HttpClient) {}

  getEmployeesByDepartment(deptId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`/api/departments/${deptId}/employees`);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}