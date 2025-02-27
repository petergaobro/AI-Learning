/**
 * This represents an event that is fired when web chat receives a custom response (response_type = "user_defined").
 */
interface CustomResponseEvent {
  /**
   * The type of the event.
   */
  type: 'customResponse';

  data: {
    /**
     * The item within the MessageResponse.output.generic array that this custom response is for.
     */
    message: unknown;

    /**
     * The full MessageResponse that this custom response is fired for. A MessageResponse may contain multiple items
     * and an event will be fired for each.
     */
    fullMessage: unknown;

    /**
     * The host element that web chat has created where your custom content should be attached.
     */
    element?: HTMLElement;
  };
}

export type { CustomResponseEvent };
