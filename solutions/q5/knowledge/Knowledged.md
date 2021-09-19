# redux-observable

RxJS-based middleware for Redux. Compose and cancel async actions to create side effects and more.

## ofType (Same with switch case in reduce)

Since filtering by a specific action type is so common, redux-observable includes an ofType operator to reduce that boilerplate

## combineEpics

An Epic is the core primitive of redux-observable.

```js
function (action$: Observable<Action>, state$: StateObservable<State>): Observable<Action>;

//Noticed how action$ has a dollar sign at the end? It's simply a common RxJS convention to identify variables that reference a stream.
```

It is a function which takes a stream of actions and returns a stream of actions. Actions in, actions out.

Finally, redux-observable provides a utility called combineEpics() that allows you to easily combine multiple Epics into a single one:

---

# RxJS

Think of RxJS as Lodash for events.

mergeMap

```js
import { of, interval } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

const letters = of('a', 'b', 'c');
const result = letters.pipe(
  mergeMap((x) => interval(1000).pipe(map((i) => x + i)))
);
result.subscribe((x) => console.log(x));

// Results in the following:
// a0
// b0
// c0
// a1
// b1
// c1
// continues to list a,b,c with respective ascending integers
```

<!-- Videos -->

## Rxjs:

https://www.youtube.com/watch?v=T9wOu11uU6U&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi

## Observables:

https://www.youtube.com/watch?v=Tux1nhBPl_w
