import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SponsorService} from "../../services/sponsor.service";
import {ColumnMode} from '@swimlane/ngx-datatable';
import {Sponsor} from "../../interfaces/sponsor";
import {AddComponent} from "../add/add.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'sponsor_name', 'sponsor_type', 'sponsor_ID', 'email', 'phone', 'address', 'max_limit', 'financial_limit', 'time_limit', 'action'];

  isLoading = true;

  pageNumber: number = 1;
  searchText: string = ''
  VOForm!: FormGroup;

  isEditableNew: boolean = true;
  rows: Sponsor[] = [];
  expanded: any = {};
  timeout: any;
  dataSource: any = new MatTableDataSource<any>();
  paginatorList!: HTMLCollectionOf<Element>;
  idx!: number;
  page: { current_page: any, per_page: any, total_elements: number } = {
    current_page: 1,
    per_page: 10,
    total_elements: 200
  };
  tableLength: number = 0
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _sponsorService: SponsorService, private modalService: NgbModal, private fb: FormBuilder,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.getLeads()
    this.initTable()
  }

  initTable() {
    this.VOForm = this._formBuilder.group({
      VORows: this._formBuilder.array([])
    });
    this.VOForm = this.fb.group({
      VORows: this.fb.array(this.rows.map((val, index) => this.fb.group({
          sponsor_name: new FormControl(val.sponsor_name),
          address: new FormControl(val.address),
          email: new FormControl(val.email),
          position: new FormControl(index),
          phone: new FormControl(val.phone),
          postal_code: new FormControl(val.postal_code),
          max_limit: new FormControl(val.max_limit),
          time_limit: new FormControl(val.time_limit),
          financial_limit: new FormControl(val.financial_limit),
          sponsor_ID: new FormControl(val.sponsor_ID),
          sponsor_type: new FormControl(val.sponsor_type),
          action: new FormControl('existingRecord'),
          isEditable: new FormControl(true),
          isNewRow: new FormControl(false),
        })
      )) //end of fb array
    }); // end of form group cretation
    this.isLoading = false;
    this.dataSource = new MatTableDataSource((this.VOForm.get('VORows') as FormArray).controls);
    this.dataSource.paginator = this.paginator;

    const filterPredicate = this.dataSource.filterPredicate;
  }

  goToPage() {
    this.paginator.pageIndex = this.pageNumber - 1;
    this.paginator.page.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      length: this.paginator.length
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginatorList = document.getElementsByClassName('mat-paginator-range-label');

    this.onPaginateChange(this.paginator, this.paginatorList);

    this.paginator.page.subscribe(() => {
      this.onPaginateChange(this.paginator, this.paginatorList);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  AddNewRow() {
    const control: FormArray = this.VOForm.get('VORows') as FormArray;
    this.tableLength = control.value.length
    control.insert(0, this.initiateVOForm());
    this.dataSource = new MatTableDataSource(control.controls)
  }

  EditSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(false);
  }

  SaveVO(VOFormElement: any, i: any) {
    // alert('SaveVO')
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  CancelSVO(VOFormElement: any, i: any) {
    VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
  }

  onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
    setTimeout((idx: any) => {
      let from = (paginator.pageSize * paginator.pageIndex) + 1;

      let to = (paginator.length < paginator.pageSize * (paginator.pageIndex + 1))
        ? paginator.length
        : paginator.pageSize * (paginator.pageIndex + 1);

      let toFrom = (paginator.length == 0) ? 0 : `${from} - ${to}`;
      let pageNumber = (paginator.length == 0) ? `0 of 0` : `${paginator.pageIndex + 1} of ${paginator.getNumberOfPages()}`;
      let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

      if (list.length >= 1)
        list[0].innerHTML = rows;

    }, 0, paginator.pageIndex);
  }


  initiateVOForm(): FormGroup {
    return this.fb.group({
      position: new FormControl(this.tableLength),
      sponsor_name: new FormControl(`item${this.tableLength}`),
      address: new FormControl(`item${this.tableLength}`),
      email: new FormControl(`item${this.tableLength}`),
      phone: new FormControl(`item${this.tableLength}`),
      postal_code: new FormControl(this.tableLength),
      max_limit: new FormControl(this.tableLength),
      time_limit: new FormControl(this.tableLength),
      financial_limit: new FormControl(this.tableLength),
      sponsor_ID: new FormControl(this.tableLength),
      sponsor_type: new FormControl(this.tableLength),
      action: new FormControl('newRecord'),
      isEditable: new FormControl(false),
      isNewRow: new FormControl(true),
    });
  }

  getLeads() {
    this._sponsorService.getSponsors().subscribe(res => {
      this.rows = res.data;
      this.page.current_page = res.current_page;
      this.page.per_page = res.per_page;
      this.page.total_elements = +res.total * this.page.per_page;
      this.initTable()
    })
  }

  openDialog(): void {
    this.modalService.open(AddComponent, {
      backdrop: true,
      centered: true,
      size: 'lg'
    }).result.then((data => {
    }));
  }
}


