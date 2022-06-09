import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../.././shared/firebase";

const initialState = {
  is_loaded: false,
  list: [],
};

// Actions
const LOAD = "ukstagram/LOAD";
const CREATE = "ukstagram/CREATE";
const UPDATE = "ukstagram/UPDATE";
const DELETE = "ukstagram/DELETE";

// Action Creators
export function loadUkstagram(payload) {
  return { type: LOAD, payload };
}
export function createUkstagram(payload) {
  return { type: CREATE, payload };
}
export function updateUkstagram(payload) {
  return { type: UPDATE, payload };
}
export function deleteUkstagram(payload) {
  return { type: DELETE, payload };
}

// middlewares
export const loadUkstagramFB = () => {
  return async function (dispatch) {
    const ukstagram_data = await getDocs(collection(db, "posts"));

    let ukstagram_list = [];

    ukstagram_data.forEach((load) => {
      ukstagram_list.push({ id: load.id, ...load.data() });
    });
    // console.log(ukstagram_list);
    dispatch(loadUkstagram(ukstagram_list));
  };
};

export function createUkstagramFB(post) {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "posts"), post);
    const post_data = { ...post, id: docRef.id };
    dispatch(createUkstagram(post_data));
  };
}

export const deleteUkstagramFB = (targetId) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "posts", targetId.id);
    await deleteDoc(docRef);

    const delete_data = getState().posts.list;
    dispatch(deleteUkstagram(delete_data));
  };
};
// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ukstagram/LOAD":
      return { list: action.payload, is_loaded: true };

    case "ukstagram/CREATE": {
      return { ...state, list: [...state.list] };
    }

    // case "ukstagram/UPDATE": {
    //   const new_word_list = state.list.map((word) => {
    //     return word.id === action.word.id ? { ...word, ...action.word } : word;
    //   });
    //   return { ...state, list: new_word_list };
    // }

    case "ukstgram/DELETE": {
      return { ...state, list: [...state.list] };
    }

    default:
      return state;
  }
}
