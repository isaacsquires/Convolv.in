import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'

const initialState = {
    'channelsSwitch': false,
    input: {
        size: 64,
        channels: 3,
    },
    layers: [
        {
            "label": Math.random(),
            "k": 4,
            "p": 2,
            "s": 2,
            'channels': 3,
            "type": "conv2d",
        },
    ],
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;