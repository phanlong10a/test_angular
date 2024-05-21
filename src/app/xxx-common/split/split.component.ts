import {
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
  AfterViewInit,
  OnInit,
} from "@angular/core";
import { SplitService } from "./split.service";

@Component({
  selector: "app-split",
  templateUrl: "./split.component.html",
  styleUrls: ["./split.component.scss"],
})
export class SplitComponent implements AfterViewInit, OnInit {
  leftPaneWidth: number = 200;
  middlePaneWidth: number = 200;
  endPaneWidth: number;
  isDragging: boolean = false;
  dragType: "left" | "right" = "left";
  startX: number = 0;
  startLeftWidth: number = 0;
  startMiddleWidth: number = 0;
  minWidth: number = 200;

  @ViewChild("splitContainer", { static: true }) splitContainer: ElementRef;

  constructor(
    private renderer: Renderer2,
    private readonly splitService: SplitService
  ) {}

  listenResizeEvent(event: Event): void {
    console.log("🚀 ~ SplitComponent ~ listenResizeEvent ~ event:", event);
  }

  ngAfterViewInit() {
    // th
  }

  ngOnInit(): void {
    document.addEventListener("resize", this.listenResizeEvent);
    const clientWidth = this.splitContainer.nativeElement.clientWidth;
    this.leftPaneWidth = Math.round(clientWidth / 3);
    this.middlePaneWidth = Math.round(clientWidth / 3);
    this.leftPaneWidth = clientWidth - Math.round(clientWidth / 3) * 2;
  }

  onMouseDown(event: MouseEvent, type: "left" | "right") {
    this.isDragging = true;
    this.dragType = type;
    this.startX = event.clientX;
    this.startLeftWidth = this.leftPaneWidth;
    this.startMiddleWidth = this.middlePaneWidth;
    this.renderer.setStyle(document.body, "cursor", "col-resize");
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const dx = event.clientX - this.startX;
    const containerWidth = this.splitContainer.nativeElement.clientWidth;

    if (this.dragType === "left") {
      const newLeftPaneWidth = this.startLeftWidth + dx;
      if (
        newLeftPaneWidth >= this.minWidth &&
        newLeftPaneWidth <=
          containerWidth - this.middlePaneWidth - this.minWidth
      ) {
        this.leftPaneWidth = newLeftPaneWidth;
      }
    } else {
      const newMiddlePaneWidth = this.startMiddleWidth + dx;
      if (
        newMiddlePaneWidth >= this.minWidth &&
        this.leftPaneWidth + newMiddlePaneWidth <=
          containerWidth - this.minWidth
      ) {
        this.middlePaneWidth = newMiddlePaneWidth;
      }
    }
  }

  onMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.renderer.removeStyle(document.body, "cursor");
  }

  resizeLeftPaneTo50() {
    const containerWidth = this.splitContainer.nativeElement.clientWidth;
    this.splitService.calculateWidth(containerWidth);
  }
}
