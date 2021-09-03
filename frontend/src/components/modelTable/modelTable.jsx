import React, { useContext, useEffect } from 'react';
import {Context} from '../../Store'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './modelTable.css'

const ModelTable = (props) => {

    const [state, dispatch] = useContext(Context);
    
    useEffect(() => {dispatch({type: "UPDATE_OUTPUT"})}, []);

    const addLayer = () => {
        const lastIndex = Number(Object.keys(state.layers).sort()[Object.keys(state.layers).length-1]) +1
        dispatch({type: 'ADD_LAYER', payload: {lastIndex: lastIndex}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateInput = (e) => {
        dispatch({type: 'UPDATE_INPUT', payload: {"inputSize": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateK = (e) => {
        dispatch({type: 'UPDATE_K', payload: {"layer": e.target.id, "k": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateP = (e) => {
        dispatch({type: 'UPDATE_P', payload: {"layer": e.target.id, "p": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateS = (e) => {
        dispatch({type: 'UPDATE_S', payload: {"layer": e.target.id, "s": Number(e.target.value)}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateType = (e) => {
        console.log(e.target.innerHTML)
        dispatch({type: 'UPDATE_TYPE', payload: {"layer": e.target.id, "type": e.target.innerHTML}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    

    const listItems = Object.keys(state.layers).map((key, i) => (
        // console.log(state.layers[key])
        <div className='row p-4 g-0'>
        <div className='col-sm-12 col-md-3'>
        <p class="font-monospace">Layer: {key}</p> 
        <p class="font-monospace">Type: <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {state.layers[key]['type']}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button class="dropdown-item" id={key} onClick={updateType}>conv2d</button></li>
                <li><button class="dropdown-item" id={key} onClick={updateType}>convTranspose2d</button></li>
            </ul>
            </div>
            </p> 
        </div>
        <div className='col-md-3 col-sm-12'>
        <div class="input-group p-4">
            <span class="input-group-text" id="basic-addon1">k</span>
            <input type="text" class="form-control" id={key} placeholder={state.layers[key]['k']} aria-label="kernel" aria-describedby="basic-addon1" onChange={updateK}/>
        </div>
        </div>
        <div className='col-md-3 col-sm-12'>
        <div class="input-group p-4">
            <span class="input-group-text" id="basic-addon1">p</span>
            <input type="text" class="form-control" id={key} placeholder={state.layers[key]['p']} aria-label="kernel" aria-describedby="basic-addon1" onChange={updateP}/>
        </div>
        </div>
        <div className='col-md-3 col-sm-12'>
        <div class="input-group p-4">
            <span class="input-group-text" id="basic-addon1">s</span>
            <input type="text" class="form-control" id={key} placeholder={state.layers[key]['s']} aria-label="kernel" aria-describedby="basic-addon1" onChange={updateS}/>
        </div>
        </div>
    </div>
    ))

    return (
        <>
        <div className="row p-4 g-0">
        <div className='col-sm-12 col-md-4 offset-md-4'>
        <div class="input-group">
            <span class="input-group-text" id="basic-addon1">Input</span>
            <input type="text" class="form-control" placeholder={state.inputSize} aria-label="kernel" aria-describedby="basic-addon1" onChange={updateInput}/>
        </div>
        </div>
        </div>
        <div className="row p-4 g-0">
        <div className='col-sm-12 offset-md-4 col-md-4 text-center'>
            {/* <input type="text" class="form-control" placeholder={state.outputSize} aria-label="kernel" aria-describedby="basic-addon1" /> */}
            <h1 class="display-6">Output: </h1>
            </div>
            </div>
        <div className="row g-0">
            <div className='col-sm-12 offset-md-4 col-md-4 text-center'>
            <h1 class="display-4">{state.outputSize} </h1>
            {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={calculateOutput}>Calculate</button> */}
            <hr></hr>
        </div>
        </div>
        {listItems}
        <div className="row p-4 g-0">
        <div className="offset-4 col-4">
            <AddCircleIcon className='addLayer' onClick={addLayer}/>
        </div>
        </div>
        </>
    );
};


export default ModelTable;