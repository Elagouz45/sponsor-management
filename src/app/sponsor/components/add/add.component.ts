import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SponsorService} from "../../services/sponsor.service";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    public name: string = '';
    description: string = '';
    public addForm!: FormGroup;
  model: any = {
    contact_officers: [{}],
  };
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      key: 'sponsor_contact_officer',
      type: 'repeat',
      props: {
        addText: 'Add sponsor contact',
        label: 'sponsor contact officer',
      },

      fieldArray: {
        fieldGroupClassName: 'row',
        templateOptions: {
          btnText: 'Add another investment',
        },
        fieldGroup: [
          {
            className: 'col-sm-4 col-12',
            type: 'input',
            key: 'contact_officer_name',
            defaultValue: '',
            templateOptions: {
              label: 'Contact Officer Name:',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'email',
            className: 'col-sm-4 col-12',
            templateOptions: {
              type: 'email',
              label: 'email',
              required: true,
            },
          },
          {
            type: 'input',
            key: 'phone',
            className: 'col-sm-4 col-12',
            defaultValue: '',
            templateOptions: {
              label: 'phone',
              required: true,
            },
          },
        ],
      },
    },
  ];
    public submitted = false;
    mailMsg = '';

    /**
     *
     * @param {CoreTranslationService} _coreTranslationService
     */
    constructor(private _sponsorService: SponsorService,private _snackBar: MatSnackBar,public activeModal: NgbActiveModal) {
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.addForm = new FormGroup({
          sponsor_name: new FormControl('', [Validators.required]),
          sponsor_type: new FormControl('', [Validators.required]),
          sponsor_ID: new FormControl('', [Validators.required, ]),
          email: new FormControl('', [Validators.required]),
          phone: new FormControl('', [Validators.required]),
          address: new FormControl('', [Validators.required]),
          postal_code: new FormControl('', [Validators.required]),
          max_limit: new FormControl('', [Validators.required]),
          financial_limit: new FormControl('', [Validators.required]),
          time_limit: new FormControl('', [Validators.required,Validators.min(1),Validators.max(27)]),
        });
    }

    get f() {
        return this.addForm;
    }

    addSponsor() {
        this._sponsorService.addSponsor(this.f.value).subscribe(res => {
          console.log(res)
          alert('تم إضافة الكفيل بنجاح')
          this.addForm.reset()
        }, () => {

        });
    }


    onSubmit() {
        this.submitted = true;
      console.log(this.addForm)
        if (this.addForm.invalid) {
          this._snackBar.open('All fileds required!', 'close', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
            return;
        }
       this.addSponsor();
    }

}
