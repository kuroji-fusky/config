type ElementOrWindow = Element | Window

namespace DispatchMultiListeners {
  interface AdvancedEvents {
    target: ElementOrWindow
    events: string | string[]
  }

  export type DefinedEvents = (string | AdvancedEvents)[]
  export type EventOptions =
    | boolean
    | AddEventListenerOptions
    | EventListenerOptions
}

/**
 * Dispatch multiple event listeners
 *
 * For simple use cases, you can define a single target such as `window` or a DOM element
 * ```js
 * const handleCloseDialog = () => { ... }
 *
 * const dispatchCloseDialogEvents = new DispatchMultiListeners(window, ["blur", "mouseleave"])
 *
 * dispatchCloseDialogEvents.emit(handleCloseDialog)
 *
 * // Cleanup func
 * dispatchCloseDialogEvents.dispose(handleCloseDialog)
 * ```
 */
export class DispatchMultiListeners<DOMTarget extends ElementOrWindow | null> {
  private definedEvents: DispatchMultiListeners.DefinedEvents
  private target: DOMTarget
  private eventOptions: DispatchMultiListeners.EventOptions

  constructor(
    target: DOMTarget,
    events: DispatchMultiListeners.DefinedEvents,
    options?: DispatchMultiListeners.EventOptions
  ) {
    this.target = target
    this.definedEvents = events
    this.eventOptions = options

    if (this.target !== null && typeof this.definedEvents === "object") {
      throw new TypeError(
        "When defining multiple targets, the target parameter should be `null` and the event parameter should be an object."
      )
    }
  }

  /** Adds the defined event listeners, can optionally call the func upon initialization */
  emit(callback: (e?: unknown) => void, callOnInit?: boolean) {
    this.definedEvents.forEach((definedEvent) => {
      if (typeof definedEvent === "string") {
        this.target!.addEventListener(definedEvent, callback, this.eventOptions)
        return
      }

      if (typeof definedEvent === "object") {
        const { target, events: event } = definedEvent

        if (!Array.isArray(event)) {
          target!.addEventListener(event, callback, this.eventOptions)
          return
        }

        event.forEach((ev) => {
          target!.addEventListener(ev, callback, this.eventOptions)
          return
        })
      }
    })

    if (Boolean(callback) && callOnInit) callback()
  }

  /** Removes the defined event listeners */
  dispose(callback: (e?: unknown) => void) {
    this.definedEvents.forEach((definedEvent) => {
      if (typeof definedEvent === "string") {
        this.target!.removeEventListener(
          definedEvent,
          callback,
          this.eventOptions
        )
        return
      }

      if (typeof definedEvent === "object") {
        const { target, events: event } = definedEvent

        if (!Array.isArray(event)) {
          target!.removeEventListener(event, callback, this.eventOptions)
          return
        }

        event.forEach((ev) => {
          target!.removeEventListener(ev, callback, this.eventOptions)
          return
        })
      }
    })
  }
}
