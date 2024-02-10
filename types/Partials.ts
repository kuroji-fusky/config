export type PartialArray<T> = Partial<T>[]

/**
 * A `Record` type generic wrapped in `Partial` generic
 */
export type PartialRecord<K extends PropertyKey, T = string> = Partial<
  Record<K, T>
>
