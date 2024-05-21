import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
} from "@angular/core";

@Component({
  selector: "app-split-vertical",
  templateUrl: "./split-vertical.component.html",
  styleUrls: ["./split-vertical.component.scss"],
})
export class SplitVerticalComponent implements OnInit {
  @ContentChildren("splitPane") splitPanes: QueryList<ElementRef>;

  @Input() totalElement: number;

  panes: { height: number }[] = [];
  isDragging: boolean = false;
  startY: number = 0;
  startHeight: number = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.panes = new Array(this.totalElement).fill(null).map(() => {
      return {
        height: 100,
      };
    });
  }

  onMouseDown(event: MouseEvent, index: number) {
    this.isDragging = true;
    this.startY = event.clientY;
    this.startHeight = this.panes[index].height;
    this.renderer.setStyle(document.body, "cursor", "row-resize");
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    const dy = event.clientY - this.startY;
    const newIndex = this.calculateNewIndex(event.clientY);
    if (this.isInValidIndex(newIndex)) {
      return;
    }
    this.panes[newIndex].height += dy;
    this.panes[newIndex + 1].height -= dy;
    this.startY = event.clientY;
  }

  onMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.renderer.removeStyle(document.body, "cursor");
  }

  private calculateNewIndex(clientY: number): number {
    let totalHeight = 0;
    for (let i = 0; i < this.panes.length; i++) {
      totalHeight += this.panes[i].height;
      if (clientY < totalHeight) {
        return i;
      }
    }
    return -1;
  }

  private isInValidIndex(index: number): boolean {
    return index < 0 || index >= this.panes.length - 1;
  }
}
