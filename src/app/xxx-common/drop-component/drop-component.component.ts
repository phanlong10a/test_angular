import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "xxx-drop-component",
  templateUrl: "./drop-component.component.html",
  styleUrls: ["./drop-component.component.scss"],
})
export class DropComponentComponent {
  todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

  done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer.data);
    console.log(event.previousContainer.data[event.previousIndex]);
  }
}
