import type { CollateTypesFromObject, UnwrapArray } from "../types"

type SortOrderLiteral = "descending" | "ascending"

function sortDates<T extends Array<Record<string, unknown>>>(
  objectToSort: T,
  accessor: (item: UnwrapArray<T>, index?: number) => CollateTypesFromObject<UnwrapArray<T>>,
  order?: SortOrderLiteral
) {
  // ...
}
