import type { Dateish } from "../types"

export class BaseTimeMethods {
  protected _consistentDateObjects(d: Dateish) {
    if (typeof d === "string" || typeof d === "number") {
      return new Date(d)
    }

    return d
  }
}