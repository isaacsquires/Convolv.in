const calculateOutput = (state) => {
    var H_o = state.inputSize
    for(const [ , value] of Object.entries(state.layers)){
        if(value['type']==='conv2d'){
        H_o = (H_o+2*value['p']-value['k'])/value['s']+1
        }
        else if(value['type']==='convTranspose2d'){
            H_o = (H_o-1)*value['s']-2*value['p']+value['k']
        }
    }
    return H_o
}

const Reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_LAYER':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.payload.lastIndex]: {
                        'k': 4,
                        'p': 2,
                        's': 2,
                        'type': 'conv2d'
                    },
                }
            };
        case 'UPDATE_OUTPUT':
            return {
                ...state,
                outputSize: calculateOutput(state)
            };
            case 'UPDATE_INPUT':
                return {
                    ...state,
                    inputSize: action.payload.inputSize
                };
        case 'UPDATE_K':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.payload.layer]: {
                        ...state.layers[action.payload.layer],
                        "k": action.payload.k
                        }
                },
            };
        case 'UPDATE_P':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.payload.layer]: {
                        ...state.layers[action.payload.layer],
                        "p": action.payload.p
                        }
                },
            };
        case 'UPDATE_S':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.payload.layer]: {
                        ...state.layers[action.payload.layer],
                        "s": action.payload.s
                        }
                },
            };
        case 'UPDATE_TYPE':
            return {
                ...state,
                layers: {
                    ...state.layers,
                    [action.payload.layer]: {
                        ...state.layers[action.payload.layer],
                        "type": action.payload.type
                        }
                },
            };
        default:
            return state;
    }
};

export default Reducer;