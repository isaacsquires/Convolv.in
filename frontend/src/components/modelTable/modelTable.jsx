import React, { useContext, useEffect } from 'react';
import {Context} from '../../Store'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
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
        console.log(index)
        dispatch({type: 'DELETE_LAYER', payload: {'index': index}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    const updateInput = (e) => {
        dispatch({type: 'UPDATE_INPUT', payload: {"inputSize": Number(e.target.value)}});
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

    const updateType = (key, e) => {
        dispatch({type: 'UPDATE_TYPE', payload: {"layer": key, "type": e.target.innerHTML}});
        dispatch({type: "UPDATE_OUTPUT"})
    }

    

    const listItems = Object.keys(state.layers).map((key, i) => (
        <div className='row p-4 g-0 layerInfo'>
        <div className='col-sm-1 col-md-1 layerShow text-center'>
            <IndeterminateCheckBoxIcon className='deleteLayer' onClick={() => deleteLayer(i)}/>
        </div>
        <div className='col-sm-12 col-md-2'>
        <p class="font-monospace">Layer: {key}</p> 
        <p class="font-monospace">Type: <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {state.layers[key]['type']}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><button class="dropdown-item" onClick={(e) => updateType(key, e)}>conv2d</button></li>
                <li><button class="dropdown-item" onClick={(e) => updateType(key, e)}>convTranspose2d</button></li>
            </ul>
            </div>
            </p> 
        </div>
        <div className='col-md-2 col-sm-12'>
        <div class="input-group p-4">
            <span class="input-group-text" id="basic-addon1">k</span>
            <input type="text" class="form-control" value={state.layers[key]['k']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateK(key, e)}/>
        </div>
        </div>
        <div className='col-md-2 col-sm-12'>
        <div class="input-group p-4">
            <span class="input-group-text" id="basic-addon1">p</span>
            <input type="text" class="form-control" value={state.layers[key]['p']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateP(key, e)}/>
        </div>
        </div>
        <div className='col-md-2 col-sm-12'>
        <div class="input-group p-4">
            <span class="input-group-text" id="basic-addon1">s</span>
            <input type="text" class="form-control" value={state.layers[key]['s']} aria-label="kernel" aria-describedby="basic-addon1" onChange={(e) => updateS(key, e)}/>
        </div>
        </div>
        <div className='col-md-2 col-sm-12'>
        <div className="container p-4 d-flex h-100">
        <div class="row justify-content-center align-self-center">
            <p class="font-monospace ">Output size: {state.layers[key]['outputSize']}</p>
            </div>
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
            <input type="text" class="form-control" value={state.inputSize} aria-label="kernel" aria-describedby="basic-addon1" onChange={updateInput}/>
        </div>
        </div>
        </div>
        {listItems}
        <div className="row p-4 g-0">
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
            <h1 class="display-6 pb-4" >{state.outputSize} </h1>
            {/* <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={calculateOutput}>Calculate</button> */}
        </div>
        </div>
        </>
    );
};


export default ModelTable;