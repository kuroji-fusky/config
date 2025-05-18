import type { Dateish } from "../types"
import { BaseTimeMethods } from "./base"
import { MILLISECONDS, SECONDS, MINUTES, HOURS } from "../constants"

export class DateDifference extends BaseTimeMethods {
  protected _difference: number
  protected _computedValue: number | null = null

  constructor(date1: Dateish, date2: Dateish) {
    super()

    const __date1 = this._consistentDateObjects(date1)
    const __date2 = this._consistentDateObjects(date2)

    this._difference = Math.abs(__date2.valueOf() - __date1.valueOf())
  }

  private __setComputed(value: number) {
    this._computedValue = value
    return this
  }

  round(decimals: number = 0) {
    if (this._computedValue === null) this.__setComputed(this._difference)

    const factor = 10 ** decimals
    return Math.round(this._computedValue! * factor) / factor
  }

  get seconds() {
    return this.__setComputed(this._difference / (MILLISECONDS))
  }

  get minutes() {
    return this.__setComputed(this._difference / (MILLISECONDS * SECONDS))
  }

  get hours() {
    return this.__setComputed(this._difference / (MILLISECONDS * SECONDS * MINUTES))
  }

  get days() {
    return this.__setComputed(this._difference / (MILLISECONDS * SECONDS * MINUTES * HOURS))
  }

  get years() {
    return this.__setComputed(this._difference / (MILLISECONDS * SECONDS * MINUTES * HOURS * 365))
  }

  // Primitives
  valueOf() {
    return this._computedValue
  }

  toString(): string {
    return String(this._computedValue)
  }

  [Symbol.toPrimitive](hint: string) {
    return hint === "string" ? this.toString() : this._computedValue
  }
}