import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
  is_loaded: false,
  list: [],
};

// Actions
const LOAD = "Chinese/LOAD";
const CREATE = "Chinese/CREATE";
const COMPLETED = "Chinese/COMPLETED";
const UPDATE = "Chinese/UPDATE";
// const DELETE = "Chinese/DELETE";

// Action Creators
export function loadWord(word_list) {
  return { type: LOAD, word_list };
}

export function createWord(word_data) {
  // console.log(word_data);
  return { type: CREATE, word_data };
}

export function completedWord(word_index) {
  // console.log(targetId);
  return { type: COMPLETED, word_index };
}

export function updateWord(word) {
  return { type: UPDATE, word };
}

// export function dlelteWord(word) {
//   return { type: DELETE, word };
// }

// middlewares
export function loadWordFB() {
  return async function (dispatch) {
    const word_data = await getDocs(collection(db, "Chinese"));
    let word_list = [];
    word_data.forEach((doc) => {
      word_list.push({ id: doc.id, ...doc.data() });
    });
    dispatch(loadWord(word_list));
  };
}

export function createWordFB(word) {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "Chinese"), word);
    const word_data = { id: docRef.id, ...word };
    dispatch(createWord(word_data));
  };
}

export function completedWordFB(word) {
  return async function (dispatch, getState) {
    const docRef = doc(db, "Chinese", word.id);
    await updateDoc(docRef, { completed: !word.completed });

    const word_list = getState().word.list;
    const word_index = word_list.findIndex((w) => {
      return w.id === word.id;
    });

    dispatch(completedWord(word_index));
    dispatch(loadWordFB());
  };
}

export function updateWordFB(word, id) {
  return async function (dispatch) {
    const docRef = doc(db, "Chinese", word.id);
    await updateDoc(docRef, {
      word: word.word,
      interpretation: word.interpretation,
      mean: word.mean,
      pronunciation: word.pronunciation,
      example: word.example,
    });
    const new_word = { ...word, id };

    dispatch(updateWord(new_word));
  };
}

// Reducer

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "Chinese/LOAD":
      return { list: action.word_list, is_loaded: true };

    case "Chinese/CREATE": {
      const new_word_list = [...state.list, action.word_data];
      // console.log({ list: new_word_list, ...state });
      // console.log({ ...state, list: new_word_list });
      return { list: new_word_list };
    }
    case "Chinese/COMPLETED": {
      const new_word_list = state.list.map((word) => {
        return word.id === action.word_index
          ? { ...word, completed: !word.completed }
          : word;
      });
      return { ...state, list: new_word_list };
    }
    case "Chinese/UPDATE": {
      const new_word_list = state.list.map((word) => {
        return word.id === action.word.id ? { ...word, ...action.word } : word;
      });
      return { ...state, list: new_word_list };
    }

    default:
      return state;
  }
}
