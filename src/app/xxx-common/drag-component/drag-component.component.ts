import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, Input } from "@angular/core";
@Component({
  selector: "xxx-drag-component",
  templateUrl: "./drag-component.component.html",
  styleUrls: ["./drag-component.component.scss"],
})
export class DragComponentComponent {
  @Input() todo: string[] = [];

  constructor() {
    setTimeout(() => {
      console.log(this.todo);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
