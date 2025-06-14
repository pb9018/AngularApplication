import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService, Employee } from './employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent {
  @Input() employee!: Employee;
  @Output() updated = new EventEmitter<Employee>();
  @Output() deleted = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  editMode = false;
  editEmployee!: Employee;
  errorMsg: string = '';

  constructor(private employeeService: EmployeeService) {}

  enableEdit() {
    this.editMode = true;
    this.editEmployee = { ...this.employee };
  }

  save() {
    this.employeeService.updateEmployee(this.editEmployee).subscribe({
      next: (emp) => { this.editMode = false; this.updated.emit(emp); },
      error: () => { this.errorMsg = 'Update failed.'; }
    });
  }

  delete() {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => this.deleted.emit(this.employee.id),
        error: () => { this.errorMsg = 'Delete failed.'; }
      });
    }
  }
}