import React, { useContext, useEffect } from 'react';
import {Context} from '../../Store'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';
import './modelTable.css'

const ModelTable = (props) => {

    const [state, dispatch] = useContext(Context);
    
    useEffect(() => {dispatch({type: "UPDATE_OUTPUT"})}, []);
    useEffect(() => {
        const persistState = localStorage.getItem('data');
        if (persistState) {
            try {
                dispatch({type: "LOAD_STATE", payload: JSON.parse(persistState)})
            } catch (e) {
              // is not json
            }
          }
    }, []);
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(state));
      }, [state]);

    const addLayer = () => {
        dispatch({type: 'ADD_LAYER'});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const deleteLayer = (index) => {
        if (state.layers.length>1){
        dispatch({type: 'DELETE_LAYER', payload: {'index': index}});
        dispatch({type: "UPDATE_OUTPUT"})
        }
    }

    const updateInput = (e) => {
        dispatch({type: 'UPDATE_INPUT', payload: {"inputSize": Number(e.target.value), "index": e.target.id}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateK = (key, e) => {
        dispatch({type: 'UPDATE_K', payload: {"layer": key, "k": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateP = (key, e) => {
        dispatch({type: 'UPDATE_P', payload: {"layer": key, "p": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateS = (key, e) => {
        dispatch({type: 'UPDATE_S', payload: {"layer": key, "s": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateSF = (key, e) => {
        dispatch({type: 'UPDATE_SF', payload: {"layer": key, "sf": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateType = (key, e) => {
        dispatch({type: 'UPDATE_TYPE', payload: {"layer": key, "type": e.target.innerHTML}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const clearLayers = (key, e) => {
        dispatch({type: 'CLEAR_LAYERS', payload: {}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateChannels = (key, e) => {
        let channels
        if (e.target.value===""){
            channels = 0
        }
        else{
            channels = Number(e.target.value)
        }
        dispatch({type: 'UPDATE_CHANNELS', payload: {"layer": key, "channels": channels}});
        dispatch({type: "UPDATE_OUTPUT"})
    }
    

    const updateInputChannel = (e) => {
        let channels
        if (e.target.value===""){
            channels = 0
        }
        else{
            channels = Number(e.target.value)
        }
        dispatch({type: 'UPDATE_INPUT_CHANNEL', payload: {"channels": channels}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateChannelsSwitch = (e) => {
        dispatch({type: 'UPDATE_CHANNELS_SWITCH', payload: {"to": e.target.checked}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateDims = (e) => {
        dispatch({type: 'UPDATE_DIMS', payload: {"dims": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const channelSwitch = state.channelsSwitch;
    let channelsLayers;
    let channelsInput;
    let layersOutput;
    let finalOutput;
    if (channelSwitch){
    channelsLayers = (key) =>
    <div className='col-md-2 col-sm-10'>
            <div class="input-group p-4">
                <span class="input-group-text" id="basic-addon1">c</span>
                <input type="text" class="form-control" value={state.layers[key]['channels']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateChannels(key, e)}/>
            </div>
            </div>

    channelsInput = 
    <div class="input-group ps-1">
        <span class="input-group-text" id="basic-addon1">c</span>
        <input type="text" class="form-control" value={state.input.channels} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateInputChannel(e)}/>
    </div>

    layersOutput = (output, outputChannels) => {
        return(
        <p class="font-monospace ">Output size: {outputChannels},{output?.toString() || ""}</p>)
    }

    finalOutput = (output, outputChannels) => {
        return(
            <h1 class="display-6 pb-4" >{outputChannels}, {output?.toString() || ""}</h1>)
    }
    }
    else{
        channelsLayers = () => <></>
        layersOutput = (output) => {
            return(
            <p class="font-monospace ">Output size: {output?.toString() || ""}</p>
            )
        }

        finalOutput = (output) => {
            return(
                <h1 class="display-6 pb-4" >{output?.toString() || ""}</h1>)
        }

        channelsInput = <></>
    }

    const  inputBoxes = (state, key) => {
        if (state.layers[key]['type']==='conv' | state.layers[key]['type']==='convTranspose'){
        return(
        <>
            <div className='col-md-2 col-4'>
            <div class="input-group p-4">
                <span class="input-group-text" id="basic-addon1">k</span>
                <input type="text" class="form-control" value={state.layers[key]['k']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateK(key, e)}/>
            </div>
            </div>
            <div className='col-md-2 col-4'>
            <div class="input-group p-4">
                <span class="input-group-text" id="basic-addon1">s</span>
                <input type="text" class="form-control" value={state.layers[key]['s']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateS(key, e)}/>
            </div>
            </div>
            <div className='col-md-2 col-4'>
            <div class="input-group p-4">
                <span class="input-group-text" id="basic-addon1">p</span>
                <input type="text" class="form-control" value={state.layers[key]['p']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateP(key, e)}/>
            </div>
            </div>
        </>
        )
        }
        else if (state.layers[key]['type']==='upsample'){
            return(
            <>
                <div className='col-md-2 col-sm-12'>
                <div class="input-group p-4">
                    <span class="input-group-text" id="basic-addon1">sf</span>
                    <input type="text" class="form-control" value={state.layers[key]['sf']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateSF(key, e)}/>
                </div>
                </div>
                <div className='col-md-4'>
                </div>
            </>
            )
        }
    }

    const listItems = Object.keys(state.layers).map((key, i) => (
        <div className='row p-4 g-0 layerInfo'>
        <div className='col-sm-12 col-md-2'>
        <div className='row'>
        <p class="font-monospace">Layer: {key}</p> 
        </div>
        <div className='row'>
        <div className='d-flex flex-row justify-content-center'>
        <p class="font-monospace mt-auto mb-auto me-2">Type: </p> <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {state.layers[key]['type']}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button class="dropdown-item" onClick={(e) => updateType(key, e)}>conv</button></li>
                <li><button class="dropdown-item" onClick={(e) => updateType(key, e)}>convTranspose</button></li>
                <li><button class="dropdown-item" onClick={(e) => updateType(key, e)}>upsample</button></li>
            </ul>
            </div>
            
        </div>
        </div>
        </div>
        {inputBoxes(state, key)}
        {channelsLayers(key)}
        <div className='col-md-2 col-sm-12'>
        <div className="container p-4 d-flex h-100">
        <div class="row justify-content-center align-self-center">
            {layersOutput(state.layers[key]['outputSize'], state.layers[key]['channels'])}
            </div>
        </div>
        </div>
        <div className='col-2'>
        <CloseIcon className='deleteLayer hidden-delete' onClick={() => deleteLayer(i)}/>
        </div>
    </div>
    ))

    return (
        <>
        <div className="row p-4 g-0">
        <div className='col-sm-12 offset-md-2 col-md-2'>
        <button type="button" onClick={clearLayers} class="btn btn-outline-secondary top-panel">Clear</button>
            </div>
        <div className='col-sm-12 col-md-4'>
        <div class="input-group top-panel">
            <span class="input-group-text" id="basic-addon1">Input</span>
            {
            [...Array(state.input.dims).keys()].map((key, i) => (
                <input type="text" class="form-control" value={state.input.size[i]} id={i} aria-label="kernel" aria-describedby="basic-addon1" onChange={updateInput}/>
            ))
            }
            
        </div>
        </div>

        <div className='offset-2 col-6 offset-md-1 col-md-3'>

        <div class="input-group mb-3 mx-auto top-panel">
        <span class="top-panel-span">  <p className="top-panel-text">Dims</p>
         <input type="number" step="1" max="10" min="1" value={state.input.dims} name="quantity" onChange={updateDims} class=" form-control dims me-4" />

            <p className="top-panel-text">Channels</p>
        <input class="form-check-input mt-0 me-2" type="checkbox" value={state.channelsSwitch} onChange={updateChannelsSwitch} aria-label="Checkbox for following text input"></input></span>
        </div>

        </div>

        </div>
        <div className='row'>
        <div className='col-sm-12 col-md-2 offset-md-5'>
        {channelsInput}
        </div>
        </div>
        <div className='row'>
        <div className='col-sm-12 col-md-6 offset-md-3'>
        <hr></hr>
        </div>
        </div>
        <div className="row p-2 g-0 show-mobile">
        <div className='col-sm-12 col-md-4 offset-md-4'>
            <p>Output: {state.outputSize?.toString() || ""}</p>
        </div>
        </div>
        {listItems}
        <div className="row p-2 g-0">
        <div className="offset-4 col-4">
            <AddCircleIcon className='addLayer' onClick={addLayer}/>
        </div>
        </div>
        <div className="row p-4 g-0">
        <div className='col-sm-12 offset-md-4 col-md-4 text-center'>
        <hr></hr>
            {/* <input type="text" class="form-control" placeholder={state.outputSize} aria-label="kernel" aria-describedby="basic-addon1" /> */}
            <h1 class="display-6">Output: </h1>
            </div>
            </div>
        <div className="row g-0">
            <div className='col-sm-12 offset-md-4 col-md-4 text-center'>
            {finalOutput(state.outputSize, state.layers[state.layers.length-1].channels)}
            {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={calculateOutput}>Calculate</button> */}
        </div>
        </div>
        </>
    );
};


export default ModelTable;