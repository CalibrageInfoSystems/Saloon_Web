// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { BreadcrumbModule, CardModule } from './components';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';

// PrimeNg
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { PasswordModule } from 'primeng/password';


// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalFilterService } from './services/global-filter.service';
import { AlphaDirective } from './directives/alpha.directive';
import { AlphabetsNumaricsDirective } from './directives/alphanumaric.directive';
import { DecimalOnlyDirective } from './directives/decimal.directive';
import { HasAnyAuthorityDirective } from './directives/has-any-authority.directive';
import { PercentageOnlyDirective } from './directives/percentage.directive';
import { NumberOnlyDirective } from './directives/number.directive';
import { ThreeDigitDecimalDirective } from './directives/three-digit-decimal.directive';
import { TwoDigitDecimalDirective } from './directives/two-digit-decimal.directive';
import { GroupByPipe } from './pipes/group-by.pipe';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgbCollapseModule,
    NgScrollbarModule,
    NgxSpinnerModule,
    //Custom Directives
    AlphaDirective,
     AlphabetsNumaricsDirective, 
     DecimalOnlyDirective,
    HasAnyAuthorityDirective,
      NumberOnlyDirective, 
      PercentageOnlyDirective,
      ThreeDigitDecimalDirective,
      TwoDigitDecimalDirective,
    // primeng
    TableModule, CalendarModule, SliderModule, DialogModule, MultiSelectModule, ContextMenuModule, ButtonModule, ToastModule, InputTextModule, ProgressBarModule, DropdownModule, AutoCompleteModule, TooltipModule, PaginatorModule,
    PasswordModule,
    GroupByPipe,
    SafeHtmlPipe,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    SpinnerComponent,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbCollapseModule,
    NgScrollbarModule,
    NgxSpinnerModule,
    //Custom Directives
    AlphaDirective,
    AlphabetsNumaricsDirective, 
    DecimalOnlyDirective,
    HasAnyAuthorityDirective,
    NumberOnlyDirective,
    PercentageOnlyDirective,
    ThreeDigitDecimalDirective,
    TwoDigitDecimalDirective,
    // primeng
    TableModule, CalendarModule, SliderModule, DialogModule, MultiSelectModule, ContextMenuModule, ButtonModule, ToastModule, InputTextModule, ProgressBarModule, DropdownModule, AutoCompleteModule, TooltipModule, PaginatorModule,
    PasswordModule,
    GroupByPipe,
    SafeHtmlPipe
  ],
  providers: [
    DatePipe,
    GlobalFilterService
],
  declarations: [SpinnerComponent, UnAuthorizedComponent]
})
export class SharedModule {}
