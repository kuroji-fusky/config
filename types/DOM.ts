import React from "react"

export type MapElement<T extends keyof HTMLElementTagNameMap> = HTMLElementTagNameMap[T]
export type ReactMapElement<T extends keyof React.JSX.IntrinsicElements> =
  React.JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<infer P, any> ? P : React.JSX.IntrinsicElements[T]
