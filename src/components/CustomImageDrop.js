import React from 'react'

import { CircularProgress } from '@material-ui/core';

export default function CustomImageDrop({onChange, isImage, imageUrl, uploadError, processing, className, text}) {

    const dragOver  = (e) => e.preventDefault();
    const dragEnter = (e) => e.preventDefault();
    const dragLeave = (e) => e.preventDefault();
    return (
        <div id="CoverImageDrop">
            <div className={`col-12 col-md-12 pl_0 pr_0 mt_10 ${className} dropImageCircle borderRadius-4 inputImageBox text-center ${isImage && 'image'}`} >
                {isImage && !processing && 
                <img 
                    src       = {imageUrl}
                    className = "insideImage"
                    alt       = "new"
                    width     = '100%'
                />}
                {processing ? <div className="text-center"><CircularProgress size={20} color={'inherit'}/></div> :
                    <label 
                        
                        className   = {`Body14M m_0 color-Secondary fw-5 ${imageUrl && 'uploadHover'} cp imageUpload ${isImage && 'remove'}`}
                        onDragOver  = {dragOver}
                        onDragEnter = {dragEnter}
                        onDragLeave = {dragLeave}
                        onDrop      = {onChange}
                    > 
                        <label htmlFor = "coverUpload" className="mb_0 pt_24">
                            <span className="text fw-5 fs-14 cp">{text}</span><br/>
                        </label>
                        <input
                            id       = "coverUpload"
                            style    = {{display:'none'}}
                            type     = "file"
                            onChange = {onChange}
                        />
                    </label>
                }
            </div>
            {uploadError && <div className="mx-auto error">{uploadError}</div>}
        </div>
    )
}
