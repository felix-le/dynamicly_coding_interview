# Observables, observers and subscriptions

[Youtube Link](https://www.youtube.com/watch?v=Tux1nhBPl_w)

- A data stream is a sequence of digitally encoded coherent signals used to transmit or receive information that is the process of being transmitted.

- A data stream is a set of extracted information from a source (data provider). It contains raw data that was gathered out of users' browser behavior from websites, where a dedicated pixel is placed.

- In a formal way, a data stream is any ordered pair (s, \Delta )where:

  1. s is a sequence of tuples (In mathematics, a tuple is a finite ordered list (sequence) of elements. An n-tuple is a sequence (or ordered list) of n elements, where n is a non-negative integer. There is only one 0-tuple, referred to as the empty tuple. An n-tuple is defined inductively using the construction of an ordered pair.)

  2. Delta is the sequence of positive real time intervals between consecutive tuples in s.

* Observable:

  - a wrapper around some data source. It uses for asynchronous data - not limited

* Observer:

  - executes some code when an observable emits a new value. (we receive a new value) / error / done.

=> Observer is a part of the Observable.

- Subscription:

  - a subscription is a link between an observer and an observable. tell an observable our wrapper around that stream of values that someone is caring about these values.

---

- Observer: has 3 methods: next, error, complete.

  - next: will be called by the observable when it emits a new value.
  - error: will be called by the observable when it emits an error.
  - complete: will be called by the observable when it completes. No more values will be emitted.

[example](https://jsfiddle.net/2eefj8Ld/)
