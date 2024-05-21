import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { XxxHomePageRoutingModule } from "./xxx-home-page-routing.module";
import { XxxHomePageComponent } from "./xxx-home-page.component";
import { NgxSplitModule } from "../lib/src";
import { DragComponentComponent } from "@app/xxx-common/drag-component/drag-component.component";
import { DropComponentComponent } from "@app/xxx-common/drop-component/drop-component.component";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    XxxHomePageComponent,
    DragComponentComponent,
    DropComponentComponent,
    DropComponentComponent,
  ],
  exports: [XxxHomePageComponent],
  imports: [
    XxxHomePageRoutingModule,
    CommonModule,
    NgxSplitModule,
    DragDropModule,
  ],
})
export class XxxHomePageModule {}
