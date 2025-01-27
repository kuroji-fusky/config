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
 * dispatchCloseDialogEvents.dispose()
 * ```
 */
export class DispatchMultiListeners<DOMTarget extends ElementOrWindow | null> {
  private definedEvents: DispatchMultiListeners.DefinedEvents
  private target: DOMTarget
  private globalEventOptions: DispatchMultiListeners.EventOptions
  private __abortSignalHandler: AbortController

  private __definedEventTypes: Array<{ target: ElementOrWindow, event: string } | never>

  constructor(
    target: DOMTarget,
    events: DispatchMultiListeners.DefinedEvents,
    options?: DispatchMultiListeners.EventOptions
  ) {
    this.target = target
    this.definedEvents = events
    this.globalEventOptions = options

    this.__definedEventTypes = []
    this.__abortSignalHandler = new AbortController()

    if (this.target !== null && typeof this.definedEvents === "object") {
      throw new TypeError("When defining multiple targets, the target parameter should be `null` and the event parameter should be an object.")
    }
  }

  /** 
   * Adds the defined event listeners, can optionally call the func upon initialization
   * 
   * @param callback An event callback function
   * @param callOnInit Call the function first before attaching its event listeners
   * @template Callback A compatible callback event-based function type
   * */
  emit<Callback extends ((e?: Event) => void)>(callback: Callback, callOnInit?: boolean) {
    if (!!callback && callOnInit) callback()

    const _eventOptions = typeof this.globalEventOptions !== "boolean"
      ? {
        ...this.globalEventOptions, signal: this.__abortSignalHandler.signal
      } : this.globalEventOptions satisfies DispatchMultiListeners.EventOptions

    this.definedEvents.forEach((definedEvent) => {
      if (typeof definedEvent === "string") {
        this.target!.addEventListener(definedEvent, callback, _eventOptions)
        return
      }

      if (typeof definedEvent === "object") {
        const { target, events: event } = definedEvent

        if (!Array.isArray(event)) {
          target!.addEventListener(event, callback, _eventOptions)
          return
        }

        event.forEach((ev) => {
          target!.addEventListener(ev, callback, _eventOptions)
          return
        })
      }
    })
  }

  dispose(event: string) {
    // WIP
  }

  disposeAll() {
    return this.__abortSignalHandler.abort()
  }
}
