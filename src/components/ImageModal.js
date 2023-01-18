import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { utils } from '../utils';
import CustomButton from './CustomButton';


function ImageModal({setImageModal, imageModal, image, formik, type}) {
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30, height: 30, aspect: type === 'cover' ? 16 / 6  : 1 / 1}); // check whether it's logo or cover image
    //   , aspect: 9 / 9 
    const [completedCrop, setCompletedCrop] = useState(null);
    
    const generateDownload = (canvas, crop) => {
        if (!crop || !canvas) return;
        canvas.toBlob(
            async(blob) => {
                if(image === 'cover'){
                    setImageModal({...imageModal, cover: {...imageModal.cover, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                    formik.setValues({...formik.values, brandCoverFile: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})})
                } 
                if(image === 'logo'){
                    setImageModal({...imageModal, logo: {...imageModal.logo, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                    formik.setValues({...formik.values, brandLogoFile: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})})
                } 
                if(image === 'image'){
                    setImageModal({...imageModal, cover: {...imageModal.cover, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                    formik.setValues({...formik.values, image: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})})
                } 
                if(image === 'coverFile'){
                    setImageModal({...imageModal, coverFile: {...imageModal.coverFile, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                    const resizedImage = await utils.resizeImage({file: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()}), width: 750, height: 280})
                    formik.setValues({...formik.values, coverFile: resizedImage})
                } 
                if(image === 'filledImageFile'){
                    setImageModal({...imageModal, filledImageFile: {...imageModal.filledImageFile, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                    const resizedImage = await utils.resizeImage({file: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()}), width: 63, height: 63})
                    formik.setValues({...formik.values, filledImageFile: resizedImage})
                } 
                if(image === 'unFilledImageFile'){
                    setImageModal({...imageModal, unFilledImageFile: {...imageModal.unFilledImageFile, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                    const resizedImage = await utils.resizeImage({file: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()}), width: 63, height: 63})
                    formik.setValues({...formik.values, unFilledImageFile: resizedImage})
                } 
                if(image === 'dealOfferImageFile'){
                  setImageModal({...imageModal, dealOfferImageFile: {...imageModal.dealOfferImageFile, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                  formik.setValues({...formik.values, dealOfferImageFile: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})})
                } 
            }
            ,'image/png',1
        );
    }

const onLoad = useCallback((img) => {
    imgRef.current = img;
}, []);

const _imageEvent = (imageEvent) => {
    if (imageEvent.target.files && imageEvent.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(imageEvent.target.files[0]);
    }
}

useEffect(() => {
    if(image === 'cover') _imageEvent(imageModal.cover.imageEvent)
    if(image === 'logo') _imageEvent(imageModal.logo.imageEvent)
    if(image === 'image') _imageEvent(imageModal.cover.imageEvent)
    if(image === 'coverFile') _imageEvent(imageModal.coverFile.imageEvent)
    if(image === 'filledImageFile') _imageEvent(imageModal.filledImageFile.imageEvent)
    if(image === 'unFilledImageFile') _imageEvent(imageModal.unFilledImageFile.imageEvent)
    if(image === 'dealOfferImageFile') _imageEvent(imageModal.dealOfferImageFile.imageEvent)
  }, [imageModal])

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);
    return (
        <div className="App">
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />
      <div className="d-none">
        <canvas
          ref={previewCanvasRef}
          // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
          style={{
            width: Math.round(completedCrop?.width ?? 0),
            height: Math.round(completedCrop?.height ?? 0)
          }}
        />
      </div>
      <div className="middle">
        <CustomButton 
            btntext="Crop" 
            onClick = { ()=>generateDownload(previewCanvasRef.current, completedCrop) }
        />
      </div>
    
    </div>
    )
}

export default ImageModal
