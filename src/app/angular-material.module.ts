import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ]
})
export class AngularMaterialModule { }
