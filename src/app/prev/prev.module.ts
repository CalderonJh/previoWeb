import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { InputComponent } from './components/input/input.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [FormComponent, InputComponent, FormPageComponent],
  exports: [FormComponent, InputComponent, FormPageComponent],
  imports: [CommonModule, FormsModule],
})
export class PrevModule {}
