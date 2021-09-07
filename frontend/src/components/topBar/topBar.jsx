import React, { Component } from 'react';
import HelpModal from '../helpModal/helpModal';
import './topBar.css'
import GetAppIcon from '@material-ui/icons/GetApp';
import { Context } from '../../Store';
import { Upload } from './uploader';
class TopBar extends Component{
    static contextType = Context

    saveState = () => {
        console.log(this.context[0], Date.now())
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(this.context[0])], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = Date.now();
        a.click();
    }

    render(){
        return(
            <>
            <div className='row g-0'>
                <div className='col-md-1'>
                <div className="container pt-4 ps-4">
                    <div className='pt-4'>
                        
                        <GetAppIcon className='load-button' onClick={this.saveState}/>
                        <p className='hide mb-0'>Save</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-1 load-container'>
                <div className="container pt-4 ps-0">
                    <Upload />
                    </div>
                </div>
                <div className='offset-md-1 col-md-6'>
                    <h1 className='display-3 p-4'>
                    Convolv.<small class="ps-2 text-muted">in</small>
                    </h1>
                </div>
                <div className='offset-md-2 col-md-1'>
                    <div className="container p-4 d-flex">
                        <div className='p-4'>
                        <HelpModal />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row g-0'>
            <div className='offset-md-3 col-md-6'>
            <p>A convolutional neural network calculator</p>
            </div>
            </div>
            
            </>
        )
    }
}

export default TopBar