class PubSub {
  #events;

  constructor() {
    this.#events = {};
  }

  #checkFunction(subscriber) {
    if (typeof subscriber !== "function") {
      throw new TypeError("subscriber parameter must be a function");
    }
  }

  subscribe(eventName, subscriber) {
    this.#checkFunction(subscriber);
    if (!(eventName in this.#events)) {
      this.#events[eventName] = [];
    }
    this.#events[eventName].push(subscriber);
  }

  unsubscribe(eventName, subscriber) {
    this.#checkFunction(subscriber);
    if (eventName in this.events) {
      const subscribers = this.#events[eventName];
      subscribers.forEach((sub) => sub());
    }
  }

  publish(eventName) {
    const handlers = this.events[eventName];
    if (!handlers) {
      return;
    }
    handlers.forEach((handler) => handler());
  }
}
