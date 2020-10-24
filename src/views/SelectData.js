import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import Button from '@material-ui/core/Button';
import 'react-dropzone-uploader/dist/styles.css';
import csvToJson from 'convert-csv-to-json';

function SelectData() {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: 'https://httpbin.org/post' };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {
    let fileInputName = files;
    let fileOutputName = 'output.json';
    csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
    console.log(fileOutputName);
  };
  return (
    <div className='container'>
      <div>
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
        />
      </div>
    </div>
  );
}

export default SelectData;
