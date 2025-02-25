/** Unwrap items from an array, mostly used in objects*/
export type UnwrapArray<T extends Array<unknown>> = T extends Array<infer U> ? U : never

/** Merges type values from an object */
export type CollateTypesFromObject<T extends Record<string, unknown>> = T[keyof T]

/** Is it a date? An epoch? Who the heck knows? */
export type Dateish = string | number | Date
