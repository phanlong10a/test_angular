import { Injectable } from "@angular/core";

/**
 * Subscribes to search text changed message, generates and stores route, triggers route event.
 */
@Injectable({ providedIn: "root" })
export class SplitService {
  constructor() {}

  calculateWidth(totalContentWidth: number) {
    return [1, 2, 3, 4, 5, 6];
  }
}
