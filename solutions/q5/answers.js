/* ********************** 
  QUESTION 5 (BONUS! - this one is nice because we use redux-observables and rxjs extensively, but it can be quite tricky if you're not used to them - please tackle last)

  Let's say we have a RESTful API endpoint serving entries from an Items type.
  Each item is structured like so:
  {
    id: String, // unique identifier
    parent: String // id of another Item
  }
  Where Items can have a parent, which can then also have a parent, in a tree-like structure.

  Now, let's say we want to load the entire "parents" history of a given Item, for example:
  { id: 'A', parent: 'B' }
  { id: 'B', parent: 'C' }
  { id: 'C', parent: null }

  So for the item A, we will want to load A, B, and C.

  Below, we have set up a redux store with some redux-observables/rxjs epics to handle actions.

  Please create or modify the epics below so that a simple click on the button in the component, we will load all of the items A, B and C
********************** */

// component
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeRequest } from '../store';

const SomeComponent = () => {
  const dispatch = useDispatch();

  const loadData = () => dispatch(makeRequest('A'));
  
  return (
    <div>
      <button onClick={loadData}>Load</button>
    </div>
  )
}

// store
export const MAKE_REQUEST = 'MAKE_REQUEST';
export const MAKE_REQUEST_SUCCESS = 'MAKE_REQUEST_SUCCESS';
export const MAKE_REQUEST_ERROR = 'MAKE_REQUEST_ERROR';

const initialState = {
  items: [],
  error: '',
}

export const makeRequest = (id) => ({
  type: MAKE_REQUEST,
  payload: id,
});

export const makeRequestSuccess = (data) => ({
  type: MAKE_REQUEST_SUCCESS,
  payload: data,
});

export const makeRequestError = (error) => ({
  type: MAKE_REQUEST_ERROR,
  meta: { error },
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case MAKE_REQUEST_SUCCESS:
      return {
        ...state,
        items: [...state.items, payload],
        error: null,
      };
    case MAKE_REQUEST_ERROR:
      return {
        ...state,
        error: 'There was an error in the request',
      };
    default: 
      return state;
  }
};

export default reducer;
// epics
import { ofType, combineEpics } from 'redux-observable'; //filter, combine epics
import { map, mapTo, catchError, mergeMap } from 'rxjs/operators'; // Think of RxJS as Lodash for events.
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { MAKE_REQUEST, makeRequestSuccess, makeRequestError } from '../store';

// flat data function
function getAllTree(array, payload) {
  let id = payload;
  const result = [];
  while (id !== null) {
    const item = array.find((v) => v.id === id);
    console.log(item);

    if (item) {
      id = item.parent;
      result.push(item);
    } else {
      id = null;
    }
  }
  return result;
}

//Noticed how action$ has a dollar sign at the end? It's simply a common RxJS convention to identify variables that reference a stream.
const makeRequest$ = (action$, state$) =>
  action$.pipe(
    ofType(MAKE_REQUEST), //filter for the action type
    mergeMap(({ payload: id }) => {
      // mergeMap allows for multiple inner subscriptions to be active at a time. Because of this, one of the most common use-case for mergeMap is requests that should not be canceled, think writes rather than reads.
      //https://www.learnrxjs.io/learn-rxjs/operators/transformation/mergemap
      return ajax(`/api/items/${id}`).pipe(
        map(
          ({ response }) => makeRequestSuccess(getAllTree(response.data, id)) //map the response to the action
        ),
        catchError((error) => of(makeRequestError(error))) //get notification of error consquently
      );
    })
  );

//pipe is a method that allows you to chain multiple operators together.
// Pipeable Operators are the kind that can be piped to Observables using the syntax observableInstance.pipe(operator()). These include, filter(...), and mergeMap(...). When called, they do not change the existing Observable instance. Instead, they return a new Observable, whose subscription logic is based on the first Observable.

//A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmo

//A Pipeable Operator is essentially a pure function which takes one Observable as input and generates another Observable as output. Subscribing to the output Observable will also subscribe to the input Observable.
//https://rxjs.dev/guide/operators

// Following the questions
/**
 * I. What is the output of the following code? => We have a stream of actions, and we want to load all of the item A, B,C.
 * 1. Components => listen to the actions, and when the action is completed, we want to load the item A, B, C.
 * 2. store => store the data in the store with initialState where saves the data.
 * 3. reducer => reducer is a function that takes the previous state and an action, and returns the next state.
 * 4. epics => epics is a function that takes the action stream and the state stream and returns a stream of actions.
 *
 * II. the flow:
 *  user clicks on the button on the component >> the makeRequest action in store is active with the id of the item (A) >> the makeRequest$ function is active >> the ajax request is active >> the response is mapped to the makeRequestSuccess action in store >> the makeRequestSuccess action is active >> the getAllTree function is active >> the getAllTree function is active >> the makeRequestSuccess action is active >> the store is updated with the data.
 */

const epics = combineEpics(makeRequest$);
export default epics;
