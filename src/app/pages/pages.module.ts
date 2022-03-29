import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CountToModule } from 'angular-count-to';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LightboxModule } from 'ngx-lightbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import {TokenService} from "../services/token.service";
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PagetitleComponent} from "../shared/pagetitle/pagetitle.component";
import {UserComponent} from "./user/user.component";
import { dataTableSortableDirective } from './user/user-sorable.directive';
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { UsercreateComponent } from './user/usercreate/usercreate.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PersonsComponent } from './persons/persons.component';
import {PersonsCreateComponent} from "./persons/persons-create.component";

@NgModule({
  declarations: [
    DashboardComponent,
    UserComponent,
    dataTableSortableDirective,
    UsercreateComponent,
    PersonsComponent,
    PersonsCreateComponent,
  ],
  imports: [
    CommonModule,
    WidgetModule,
    CountToModule,
    SharedModule,
    NgApexchartsModule,
    PagesRoutingModule,
    SimplebarAngularModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    LightboxModule,
    LeafletModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:TokenService, multi:true}],
  exports: [PagetitleComponent,UserComponent]
})
export class PagesModule { }
