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

  maxWidth: number;
  minWidth: number = 50;

  constructor(private changeDetect: ChangeDetectorRef) {}
  ngAfterContentInit(): void {
    // throw new Error("Method not implemented.");
  }
  ngOnInit(): void {
    this.changeDetect.detectChanges();
    if (!!this.split.nativeElement.offsetWidth) {
      this.calculateWidth(this.split.nativeElement.offsetWidth);
    }
  }

  @HostListener("window:resize", ["$event.target.innerWidth"])
  onResize(width: number) {}

  calculateWidth(width?: number): any {
    console.log("🚀 ~ XxxHomePageComponent ~ calculateWidth ~ width:", width);
    this.maxWidth = Math.floor(Math.max(this.minWidth, Math.floor(width / 2)));
    this.changeDetect.detectChanges();
  }
}
