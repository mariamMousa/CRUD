import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDialogComponent } from './emp-dialog/emp-dialog.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'DofB',
    'gender',
    'email',
    'education',
    'experianc',
    'company',
    'salary',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title: any;

  constructor(
    private _dialog: MatDialog,
    private _empSer: EmployeeService,
    private _coreSer: CoreService
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit(): void {
    this.getEmpList();
  }

  openDialog() {
    const DialogRef = this._dialog.open(EmpDialogComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmpList();
        }
      },
    });
  }

  getEmpList() {
    this._empSer.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openEditDialog(data: any) {
    const DialogRef = this._dialog.open(EmpDialogComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmpList();
        }
      },
    });
  }

  deleteEmployee(id: number) {
    this._empSer.delEmployee(id).subscribe({
      next: (res) => {
        this._coreSer.openSnackBar('Employee Delleted');
        this.getEmpList();
      },
      error: console.log,
    });
  }
}
