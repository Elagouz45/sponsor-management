import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { AddComponent } from './components/add/add.component';
import {ListComponent} from "./components/list/list.component";
import { SponsorsComponent } from './pages/leads/sponsors.component';
import {MatCardModule} from "@angular/material/card";
import {FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {RepeatTypeComponent} from "./components/repeat-section.type";
import {CommonModule} from "@angular/common";
import {FilterPipe} from "./pipes/filter.pipe";
const routes: Routes = [
  {
    path: '',
    component: SponsorsComponent
  }
];


@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    SponsorsComponent,
    RepeatTypeComponent,
    FilterPipe

  ],
    imports: [RouterModule.forChild(routes),CommonModule, SharedModule, MatCardModule,
      FormlyBootstrapModule,
      FormlyModule.forChild({
        types: [{ name: 'repeat', component: RepeatTypeComponent }],
        validationMessages: [{ name: 'required', message: 'This field is required' }],
      }),
    ],
  exports: [],
  providers: [FilterPipe],
})
export class SponsorModule {
}
