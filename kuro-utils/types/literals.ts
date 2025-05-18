/**
 * Appends a prefix and/or suffix from a given type or literal type
 * 
 * @template Prefix An optional prefix added at the beginning of a literal, if you want to add a `Suffix` instead, add `null` to bypass it
 * @template Suffix An optional suffix added at the end of a literal
 */
export type MutateType<
  SL extends string | number | boolean,
  Prefix extends string | number | null = null,
  Suffix extends string | number | null = null
> = `${Prefix}${SL}${Suffix}`