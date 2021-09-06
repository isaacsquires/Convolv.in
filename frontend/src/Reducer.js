const calculateOutput = (state) => {
    var H_o = state.inputSize
    for(const [key , value] of Object.entries(state.layers)){
        if(value['type']==='conv2d'){
        H_o = (H_o+2*value['p']-value['k'])/value['s']+1
        }
        else if(value['type']==='convTranspose2d'){
            H_o = (H_o-1)*value['s']-2*value['p']+value['k']
        }
        state.layers[key].outputSize = H_o
    }
    state = {
        ...state,
        outputSize: H_o
    }
    return state
}

// TODO not working - need to delete layer and then rename the later layers with label -1


// const resetKeys = (state) => {
//     console.log(state.layers.length)
// }

const Reducer = (state, action) => {

    switch (action.type) {
        case 'ADD_LAYER':
            var newLayer = {
                'label': Math.random(),
                'k': 4,
                'p': 2,
                's': 2,
                'type': 'conv2d'
            }
            var layers = state.layers.concat(newLayer)
            return {
                ...state,
                layers: layers
            };
        case 'DELETE_LAYER':
            let filteredLayers = state.layers.filter(function (e, index) {
                return index !== action.payload.index
            })
            return {
                ...state,
                layers: filteredLayers
            };
        case 'UPDATE_OUTPUT':
            state = calculateOutput(state)
            return {
                ...state
            };
            case 'UPDATE_INPUT':
                return {
                    ...state,
                    inputSize: action.payload.inputSize
                };
        case 'UPDATE_K':
            state.layers[action.payload.layer].k = action.payload.k
            return {
                ...state,
            };
        case 'UPDATE_P':
            state.layers[action.payload.layer].p = action.payload.p
            return {
                ...state,
            };
        case 'UPDATE_S':
            state.layers[action.payload.layer].s = action.payload.s
            return {
                ...state,
            };
        case 'UPDATE_TYPE':
            state.layers[action.payload.layer].type = action.payload.type
            return {
                ...state,
            };
        case 'UPDATE':
            return {
                ...state,
            };
        default:
            return state;
    }
};
export default Reducer;