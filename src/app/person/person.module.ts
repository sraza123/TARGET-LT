import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenService} from "../services/token.service";
import {PersonsComponent} from "./persons/persons.component";
import {PersonsRoutingModule} from "./person-routing.module";
import {WidgetModule} from "../shared/widget/widget.module";
import {CountToModule} from "angular-count-to";
import {SharedModule} from "../shared/shared.module";
import {NgApexchartsModule} from "ng-apexcharts";
import {PagesRoutingModule} from "../pages/pages-routing.module";
import {SimplebarAngularModule} from "simplebar-angular";
import {CarouselModule} from "ngx-owl-carousel-o";
import {FeatherModule} from "angular-feather";
import {allIcons} from "angular-feather/icons";
import {RouterModule} from "@angular/router";
import {NgbDropdownModule, NgbNavModule, NgbPaginationModule, NgbTypeaheadModule} from "@ng-bootstrap/ng-bootstrap";
import {LightboxModule} from "ngx-lightbox";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {PersonsCreateComponent} from "./persons/persons-create.component";
import {dataTableSortableDirective2} from "./persons/table-sorable.directive";



@NgModule({
  declarations: [
    PersonsComponent,
    PersonsCreateComponent,
    dataTableSortableDirective2
  ],
  imports: [
    PersonsRoutingModule,
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
  exports: [PersonsComponent]
})
export class PersonModule { }
