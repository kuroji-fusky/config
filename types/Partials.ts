export type PartialArray<T> = Array<Partial<T>>

/**
 * A `Record` type generic wrapped in `Partial` generic
 */
export type PartialRecord<K extends PropertyKey, T = string> = Partial<
  Record<K, T>
>

