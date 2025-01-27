type ElementOrWindowTarget = Element | Window

namespace DispatchMultiListeners {
  interface AdvancedEvents {
    target: ElementOrWindowTarget
    events: string | string[]
  }

  export type DefinedEvents = (string | AdvancedEvents)[]
  export type EventOptions =
    | boolean
    | AddEventListenerOptions
    | EventListenerOptions
}


type CallbackFunction = ((e?: Event) => void)

interface MappedEventTypes {
  target: ElementOrWindowTarget,
  event: string,
  callback: CallbackFunction
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
export class DispatchMultiListeners<DOMTarget extends ElementOrWindowTarget | null> {
  private definedEvents: DispatchMultiListeners.DefinedEvents
  private target: DOMTarget
  private globalEventOptions: DispatchMultiListeners.EventOptions

  private __mappedEventTypes: Array<MappedEventTypes | never>
  private __abortSignalHandler: AbortController

  constructor(
    target: DOMTarget,
    events: DispatchMultiListeners.DefinedEvents,
    options?: DispatchMultiListeners.EventOptions
  ) {
    this.target = target
    this.definedEvents = events
    this.globalEventOptions = options

    // To keep track of all defined event listeners so a user can dispose a certain event listener
    this.__mappedEventTypes = []

    // A safety net to remove ALL event listeners
    this.__abortSignalHandler = new AbortController()

    if (this.target !== null && typeof this.definedEvents === "object") {
      throw new TypeError("When defining multiple targets, the target parameter should be `null` and the event parameter should be an object.")
    }
  }

  /** @internal */
  private __pushEvents<Callback extends CallbackFunction>(
    target: ElementOrWindowTarget,
    event: string,
    callback: Callback,
    options?: DispatchMultiListeners.EventOptions
  ) {
    target!.addEventListener(event, callback, options)
    this.__mappedEventTypes.push({ target, event, callback })
  }

  /** 
   * Adds the defined event listeners, can optionally call the func upon initialization
   * 
   * @param callback An event callback function
   * @param callOnInit Call the function first before attaching its event listeners
   * @template Callback A compatible callback event-based function type
   * */
  emit<Callback extends CallbackFunction>(callback: Callback, callOnInit?: boolean) {
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
          this.__pushEvents(target, event, callback, _eventOptions)
          return
        }

        event.forEach((ev) => {
          this.__pushEvents(target, ev, callback, _eventOptions)
          return
        })
      }
    })
  }

  dispose(event: string) {
    // WIP
  }

  disposeAll(optionalReason?: any) {
    return this.__abortSignalHandler.abort(optionalReason)
  }
}
