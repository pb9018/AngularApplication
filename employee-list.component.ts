import { Component } from '@angular/core';
import { EmployeeService, Employee } from './employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  departmentId: number | null = null;
  employees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  errorMsg: string = '';

  constructor(private employeeService: EmployeeService) {}

  fetchEmployees() {
    if (this.departmentId == null) return;
    this.employeeService.getEmployeesByDepartment(this.departmentId).subscribe({
      next: (data) => { this.employees = data; this.errorMsg = ''; },
      error: () => { this.errorMsg = 'Failed to fetch employees.'; this.employees = []; }
    });
  }

  selectEmployee(emp: Employee) {
    this.selectedEmployee = emp;
  }

  onEmployeeUpdated(emp: Employee) {
    this.selectedEmployee = null;
    this.fetchEmployees();
  }

  onEmployeeDeleted(id: number) {
    this.selectedEmployee = null;
    this.fetchEmployees();
  }
}