import React, { Component } from 'react';

class HelpModal extends Component{
    render(){
        return(
            <>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            ?
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">How to use this calculator</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body ">
                    <p className='text-start'><b>Input: </b>This is the input size of your image to the network. E.g. a 64x64 image would have an input size of 64</p>
                    <p className='text-start'><b>Layers: </b>Layers are the building blocks of the network. You can change the type of the layer with the dropdown on the layer info panel on the left. You can also change the kernel size (k), padding (p) and stride (s). The first layer is passed the input, and the subsequent layers are passed the output from the layer before. The output size for each layer is displayed on the right. You can add layers with the (+) underneath the final layer, and remove layers by hovering over the layer info panel and clicking the (-).</p>
                    <p className='text-start'><b>Output: </b>The output is the size of the image after passing through all of the convolutional layers.</p>
                </div>
                </div>
            </div>
            </div>
            </>
        )
    }
}

export default HelpModal