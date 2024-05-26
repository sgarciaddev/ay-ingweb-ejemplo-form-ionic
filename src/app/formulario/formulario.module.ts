import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormularioPage } from './formulario.page';
import { FormularioPageRoutingModule } from './formulario-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FormularioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormularioPage]
})

export class FormularioPageModule {}
