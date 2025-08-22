import { InferActionsTypes } from "./reduxStore";


//const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

type DialogType = {
  id:number
  name:string
}
type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: "Vlad" },
    { id: 2, name: "Maria" },
    { id: 3, name: "Ilya" },
    { id: 4, name: "Matvey" },
    { id: 5, name: "Ivan" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "hi" },
    { id: 2, message: "how r u" },
    { id: 3, message: "want pizza?" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState

function dialogsReducer(state = initialState, action:ActionsTypes):InitialStateType {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: 5,
            message: action.newMessageText,
          },
        ],
      };

    // case UPDATE_NEW_MESSAGE_TEXT:
    //   return { ...state, newMessageText: action.newMessage };

    default:
      return state;
  }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
  addMessage: (newMessageText: string) => {
    return { type: 'ADD_MESSAGE', newMessageText } as const
  }
}




// export function updateNewMessageTextActionCreator(message:string) {
//   return {
//     type: UPDATE_NEW_MESSAGE_TEXT,
//     newMessage: message,
//   };
// }

export default dialogsReducer;
