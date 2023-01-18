import { CircularProgress } from '@material-ui/core';
import React from 'react'

export default function Imagedropbox({onChange, processing}) {

    const dragOver  = (e) => e.preventDefault();
    const dragEnter = (e) => e.preventDefault();
    const dragLeave = (e) => e.preventDefault();

    // const fileChange = (e) => {
    //     e.preventDefault();
    //     const file = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    // }

    return (
        <div id="Imagedropbox">
            <div className="coverImageDropZone fs-12 Heading22R cp" 
                onDragOver   = {dragOver}
                onDragEnter  = {dragEnter}
                onDragLeave  = {dragLeave}
                onDrop       = {onChange}
            >
                {processing ? <div className="text-center"><CircularProgress size={20} color={'inherit'}/></div> :
                    <>
                        <label htmlFor="imageUpload" className="mb_0 cp fs-12 fw-5">
                            Drop your image here
                        </label>
                        <input
                            id       = "imageUpload"
                            style    = {{display:'none'}}
                            type     = "file"
                            onChange = {onChange}
                        />
                    </>
                }
            </div>
            
        </div>
    )
}
