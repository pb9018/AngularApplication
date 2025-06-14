import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getEmployeesByDepartment(deptId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departments/${deptId}/employees`);
  }

  getEmployee(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/employees/${employeeId}`);
  }

  updateEmployee(employeeId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/employees/${employeeId}`, data);
  }

  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/employees/${employeeId}`);
  }
}