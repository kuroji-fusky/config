type ElementOrWindowTarget = Element | Window

interface _Target {
  target: ElementOrWindowTarget
}

interface AdvancedEvents extends _Target {
  events: string | string[]
}

type DefinedEvents = (string | AdvancedEvents)[]
type EventOptions = boolean | AddEventListenerOptions | EventListenerOptions

type CallbackFunction = ((e?: Event) => void)

interface MappedEventTypes extends _Target {
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
export class DispatchMultipleEvents<DOMTarget extends ElementOrWindowTarget | null> {
  private definedEvents: DefinedEvents
  private target: DOMTarget
  private eventOptions: EventOptions

  private __mappedEventTypes: Array<MappedEventTypes | never>
  private __abortSignalHandler: AbortController

  constructor(
    target: DOMTarget,
    events: DefinedEvents,
    options?: EventOptions
  ) {
    this.target = target
    this.definedEvents = events

    // To keep track of all defined event listeners so a user can dispose a certain event listener
    this.__mappedEventTypes = []

    // A safety net to remove ALL event listeners
    this.__abortSignalHandler = new AbortController()

    if (this.target !== null && typeof this.definedEvents === "object") {
      throw new TypeError("When defining multiple targets, the target parameter should be `null` and the event parameter should be an object.")
    }

    this.eventOptions = (typeof options !== "boolean"
      ? { ...options, signal: this.__abortSignalHandler.signal }
      : options) satisfies EventOptions
  }

  /** @internal */
  private __pushEvents<Callback extends CallbackFunction>(
    target: ElementOrWindowTarget,
    event: string,
    callback: Callback,
    options?: EventOptions
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
    if (typeof callback === "function" && callback && callOnInit) {
      callback()
    }

    this.definedEvents.forEach((definedEvent) => {
      if (typeof definedEvent === "string") {
        this.__pushEvents(this.target!, definedEvent, callback, this.eventOptions)
        return
      }

      if (typeof definedEvent === "object") {
        const { target, events: event } = definedEvent

        if (!Array.isArray(event)) {
          this.__pushEvents(target, event, callback, this.eventOptions)
          return
        }

        event.forEach((innerEvent) => {
          this.__pushEvents(target, innerEvent, callback, this.eventOptions)
          return
        })
      }
    })
  }

  dispose(...eventsToDispose: string[]) {
    this.definedEvents.forEach((definedEvent) => {
      if (typeof definedEvent === "string") {
        if (eventsToDispose !== null) {
          // Implementation: WIP
          return
        }

        // Automatically remove all event listeners if none are specified
        this.__mappedEventTypes.forEach((mappedEvent) => {
          const { target, event, callback } = mappedEvent

          target.removeEventListener(event, callback)
          return
        })
      }
    })
  }

  disposeAll(optionalReason?: any) {
    return this.__abortSignalHandler.abort(optionalReason)
  }
}
