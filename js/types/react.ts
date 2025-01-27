import React from "react"
import type { MutateType } from "./literals"

type _JSX__IntrinsicElements = React.JSX.IntrinsicElements
export type ReactMapElement<E extends keyof _JSX__IntrinsicElements> = _JSX__IntrinsicElements[E] extends React.DetailedHTMLProps<infer P, any> ? P : _JSX__IntrinsicElements[E]

/**
 * Appends properties with their corresponding setters for useState,
 * created for mapping props with `React.createContext()`
 *
 * @template T An interface or object
 * @template KeysToOmit Optional keys to exclude from the setters
 */
export type MapUseStateSetters<T extends object, KeysToOmit extends keyof T = never> = T & {
  [Property in keyof T as Property extends KeysToOmit ? never : MutateType<Capitalize<Property & string>, "set">]: React.Dispatch<React.SetStateAction<T[Property]>>
}