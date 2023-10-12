import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'sponsor',
    loadChildren: () => import('./sponsor/sponsor.module').then(m => m.SponsorModule)
  },
  {
    path: '',
    redirectTo: 'sponsor',
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
