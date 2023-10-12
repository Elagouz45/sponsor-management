import {NgModule} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from "@angular/common";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {NgSelectModule} from '@ng-select/ng-select';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [],
  imports: [CommonModule, MatTableModule, MatSnackBarModule, MatSortModule, MatIconModule, MatButtonModule, MatCheckboxModule, NgxDatatableModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, NgSelectModule, MatPaginatorModule, MatInputModule],
  exports: [CommonModule, MatTableModule, MatSnackBarModule, MatSortModule, MatIconModule, MatButtonModule, MatCheckboxModule, NgxDatatableModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule, NgSelectModule, MatPaginatorModule, MatInputModule],
  providers: [],
})
export class SharedModule {
}
