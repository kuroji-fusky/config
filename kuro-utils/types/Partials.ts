// Private types to prevent circular reference
type _Record<K extends keyof any, T> = Record<K, T>

export namespace Partials {
  export type Array<T> = (T | never)[]

  /** An equivalent of `Partial<Record<K, T>>` */
  export type Record<K extends PropertyKey, T = string> = Partial<_Record<K, T>>
}