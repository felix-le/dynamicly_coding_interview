
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
import { ofType, combineEpics } from 'redux-observable';
import {
  map, mapTo, catchError, mergeMap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import {
  MAKE_REQUEST,
  makeRequestSuccess,
  makeRequestError,
} from '../store';

const makeRequest$ = (action$, state$) => action$.pipe(
  ofType(MAKE_REQUEST),
  mergeMap(({ payload: id }) => {
    return ajax(`/api/items/${id}`)
      .pipe(
        map(({ response }) => makeRequestSuccess(data)),
        catchError((error) => of(makeRequestError(error)))
      );
  }),
);

const epics = combineEpics(
  makeRequest$,
);

export default epics;
