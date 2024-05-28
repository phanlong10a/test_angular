import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "xxx-home-page",
  styleUrls: ["./xxx-home-page.component.scss"],
  templateUrl: "./xxx-home-page.component.html",
})
export class XxxHomePageComponent implements AfterContentInit, OnInit {
  @ViewChild("splitComponent", { static: true }) split: ElementRef;
  @ViewChild("lastComponent", { static: true }) lastChild: ElementRef;

  maxWidth: number;
  minWidth: number = 50;
  initialWidth: number;
  width1: number;
  width2: number;
  width3: number;

  constructor(private changeDetect: ChangeDetectorRef) {}
  ngAfterContentInit(): void {
    // throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.changeDetect.detectChanges();
    if (!!this.split.nativeElement.offsetWidth) {
      this.calculateWidth(this.split.nativeElement.offsetWidth);
      this.initialWidth =
        this.width1 =
        this.width2 =
        this.width3 =
          Math.floor(
            Math.max(
              this.minWidth,
              Math.floor(this.split.nativeElement.offsetWidth / 3)
            )
          );
      this.changeDetect.detectChanges();
    }
  }

  @HostListener("window:resize", ["$event.target.innerWidth"])
  onResize(width: number) {}

  calculateWidth(width?: number): any {
    this.maxWidth = Math.floor(Math.max(this.minWidth, Math.floor(width / 2)));
    this.changeDetect.detectChanges();
  }

  resize() {
    const currentHalfWidth = Math.floor(
      Math.max(
        this.minWidth,
        Math.floor(this.split.nativeElement.offsetWidth / 2)
      )
    );
    if (this.lastChild.nativeElement.offsetWidth === currentHalfWidth) return;
    this.width2 = this.initialWidth;
    this.width1 = this.initialWidth;
    setTimeout(() => {
      this.width2 = currentHalfWidth / 2;
      this.width1 = currentHalfWidth / 2;
      this.changeDetect.detectChanges();
    });
  }

  collapse1() {
    this.width1 = this.initialWidth;
    setTimeout(() => {
      this.width1 = this.minWidth;
      this.changeDetect.detectChanges();
    });
  }

  collapse2() {
    this.width2 = this.initialWidth;
    setTimeout(() => {
      this.width2 = this.minWidth;
      this.changeDetect.detectChanges();
    });
  }

  open1() {
    this.width1 = this.minWidth;
    setTimeout(() => {
      this.width1 = this.initialWidth;
      this.changeDetect.detectChanges();
    });
  }

  open2() {
    this.width2 = this.minWidth;
    setTimeout(() => {
      this.width2 = this.initialWidth;
      this.changeDetect.detectChanges();
    });
  }
}
