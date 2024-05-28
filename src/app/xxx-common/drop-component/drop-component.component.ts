import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

@Component({
  selector: "xxx-drop-component",
  templateUrl: "./drop-component.component.html",
  styleUrls: ["./drop-component.component.scss"],
})
export class DropComponentComponent {
  done = [];

  constructor(private readonly dtc: ChangeDetectorRef) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      return;
    }
    this.done.push(event.previousContainer.data[event.previousIndex]);
    this.dtc.detectChanges();
  }
}
