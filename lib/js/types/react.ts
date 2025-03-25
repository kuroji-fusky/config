import React from "react"
import type { MutateType } from "./literals"

type _JSX__IntrinsicElements = React.JSX.IntrinsicElements

/**
 * Gets all the React attributes from a given native HTML tag
 * 
 * @template E An HTML Element
 * @example
 * type ReactButton = ReactMapElement<"button"> // React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
 * type ReactSVGContainer = ReactMapElement<"svg"> // React.SVGProps<SVGSVGElement>
 */
export type ReactMapElement<E extends keyof _JSX__IntrinsicElements> = _JSX__IntrinsicElements[E] extends React.DetailedHTMLProps<infer P, any> ? P : _JSX__IntrinsicElements[E]

/**
 * Appends properties with their corresponding setters for useState,
 * created for mapping props with `React.createContext()`
 *
 * @template T An interface or object
 * @template KeysToOmit Optional keys to exclude from the setters
 */
export type MapUseStateSetters<T extends object, KeysToOmit extends keyof T = never> = T & {
  [P in keyof T as P extends KeysToOmit ? never : MutateType<Capitalize<P & string>, "set">]: React.Dispatch<React.SetStateAction<T[P]>>
}