import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormPageComponent} from "./prev/pages/form-page/form-page.component";
import {CardPageComponent} from "./prev/pages/card-page/card-page.component";

const routes: Routes = [
  {
    path: 'card',
    component: CardPageComponent,
  },
  {
    path: '',
    component: FormPageComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
