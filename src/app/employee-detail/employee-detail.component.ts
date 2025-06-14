import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = {};
  loading = true;
  error: string | null = null;
  editing = false;
  formData: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    const empId = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployee(empId).subscribe({
      next: (data) => {
        this.employee = data;
        this.formData = { ...data };
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to fetch employee details';
        this.loading = false;
      }
    });
  }

  enableEdit() {
    this.editing = true;
    this.formData = { ...this.employee };
  }

  save() {
    this.employeeService.updateEmployee(this.employee.id, this.formData).subscribe({
      next: (data) => {
        this.employee = data;
        this.editing = false;
      },
      error: () => {
        this.error = 'Failed to update employee';
      }
    });
  }

  delete() {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.error = 'Failed to delete employee';
        }
      });
    }
  }
}