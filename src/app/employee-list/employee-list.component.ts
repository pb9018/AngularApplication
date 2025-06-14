import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  deptId = '';
  employees: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  fetchEmployees() {
    this.error = null;
    this.loading = true;
    this.employeeService.getEmployeesByDepartment(this.deptId).subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch employees';
        this.loading = false;
      }
    });
  }

  viewEmployee(emp: any) {
    this.router.navigate(['/employee', emp.id]);
  }
}