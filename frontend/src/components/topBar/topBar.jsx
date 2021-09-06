import React, { Component } from 'react';
import HelpModal from '../helpModal/helpModal';

class TopBar extends Component{
    render(){
        return(
            <>
            <div className='row g-0'>
                <div className='offset-md-3 col-md-6'>
                    <h1 className='display-3 p-4'>
                    Conv
                    <small class="text-muted">Calc</small>
                    </h1>
                </div>
                <div className='offset-md-2 col-md-1'>
                    <div className="container p-4 d-flex">
                        <HelpModal />
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