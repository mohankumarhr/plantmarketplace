import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import '../CSS/dropzone.css'

function Previews(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  
  const thumbs = files.map(file => (
    <div key={file.name}>
      <div >
        <img
          src={file.preview}
          className='dropedimage'
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
        <button onClick={()=>{setFiles([])}}>Remove</button>
      </div>
    </div>
  ));

  useEffect(()=>{
    props.handleChange(files)
  },[files])

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div>
    <section className="container">
      {files.length < 1&&<div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop image, or click to select files</p>
      </div>}
      <aside>
        {thumbs}
      </aside>
    </section>
    </div>
  );
}

export default Previews