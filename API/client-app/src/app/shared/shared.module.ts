import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPrintModule } from 'ngx-print';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    //PagingHeaderComponent,
    //PagerComponent,
    //OrderTotalsComponent,
    //TextInputComponent,
    //StepperComponent,
    //BasketSummaryComponent
  ],
  imports: [
    CommonModule,

    ReactiveFormsModule,
    TranslateModule,
   // AppRoutingModule,
   // NgxSpinnerModule,
  // BrowserModule,
   // AppRoutingModule,
   // BrowserAnimationsModule,
    MatDividerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    NgxSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    
   // MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,

    MatSortModule,
    MatSnackBarModule,
    HttpClientModule,
    RouterModule,
  // AppRoutingModule
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    NgxPrintModule,
    NgxSpinnerModule,
   // BrowserModule,
  
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSortModule,
    MatSnackBarModule,
  //  HttpClientModule,
  //  RouterModule,
  ]
})
export class SharedModule { }
