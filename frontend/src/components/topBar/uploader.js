import React, { useContext } from "react";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {Context} from '../../Store'

export function Upload({ children }) {
  const [, dispatch] = useContext(Context);
  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      dispatch({type: 'LOAD_STATE', payload: JSON.parse(e.target.result)});
    };

    
  };
  return (
    <div className='pt-4'>
      <label for="upload-data"><CloudUploadIcon className='load-button'/>
      <p className='hide mb-0'>Load</p>
      </label>
      <input type="file" accept=".json" className='invisible' id="upload-data" onChange={handleChange} />
    </div>
  );
}