import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
// import { getOrientation } from 'get-orientation/browser'
import ImgDialog from './ImgDialog'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import { styles } from './styles'
import { utils } from '../../utils'
import { SvgIcons } from '../../icons'
import { ColorSchemeCode } from '../../enums/ColorScheme'
import { CircularProgress, IconButton } from '@material-ui/core';
import Compress from "react-image-file-resizer";


export const ImageModalV2 = withStyles(styles)(Demo)

 function Demo({ classes, setImageModal, imageModal, image, formik, type }){
   const [crop, setCrop]                           = useState({ x: 0, y: 0 })
   const [zoom, setZoom]                           = useState(1)
   const [loader, setLoader]                       = useState(false)
   const [rotation, setRotation]                   = useState(0)
   const [imageSrc, setImageSrc]                   = React.useState(null)
   const [croppedImage, setCroppedImage]           = useState(null)
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const showCroppedImage = async () => {
    setLoader(true)
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
        )
  
      let blobFirst = await fetch(croppedImage).then(r => r.blob());
      let blob;
      let file = new File([blobFirst], "image",{type:"image/png", lastModified:new Date().getTime()})

      Compress.imageFileResizer(
        file, // the file from input
        650, // width
        365, // height
        "PNG", // compress format WEBP, JPEG, PNG
        100, // quality
        0, // rotation
        async (uri) => {
          blob = uri
              if(image === 'cover'){
                setImageModal({...imageModal, cover: {...imageModal.cover, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                formik.setValues({...formik.values, brandCoverFile: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})})
              } 
              if(image === 'customField'){
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
              if(image === 'giftCardImageFile'){
                setImageModal({...imageModal, giftCardImageFile: {...imageModal.giftCardImageFile, open: false, return: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})}})
                formik.setValues({...formik.values, giftCardImageFile: new File([blob], "image",{type:"image/png", lastModified:new Date().getTime()})})
            } 
              setCroppedImage(croppedImage)
            console.log('Image ', image);

        },
        "blob", // blob or base64 default base64
        650, // width
        365, // height
      );

    } catch (e) {
      console.error(e)
    }
    setLoader(false)
  }

  const _imageEvent = async(imageEvent) => {
    if (imageEvent.target.files && imageEvent.target.files.length > 0) {
      const file = imageEvent.target.files[0]
      let imageDataUrl = await readFile(file)
      setImageSrc(imageDataUrl)
    }
  }

  useEffect(() => {
    if(image === 'cover') _imageEvent(imageModal.cover.imageEvent)
    if(image === 'customField') _imageEvent(imageModal.cover.imageEvent)
    if(image === 'logo') _imageEvent(imageModal.logo.imageEvent)
    if(image === 'image') _imageEvent(imageModal.cover.imageEvent)
    if(image === 'coverFile') _imageEvent(imageModal.coverFile.imageEvent)
    if(image === 'filledImageFile') _imageEvent(imageModal.filledImageFile.imageEvent)
    if(image === 'unFilledImageFile') _imageEvent(imageModal.unFilledImageFile.imageEvent)
    if(image === 'dealOfferImageFile') _imageEvent(imageModal.dealOfferImageFile.imageEvent)
    if(image === 'giftCardImageFile') _imageEvent(imageModal.giftCardImageFile.imageEvent)

  }, [imageModal])


  const handleCancel = () =>{
    if(image === 'cover'){
      setImageModal({...imageModal, cover: {...imageModal.cover, open: false}})
    } 
    if(image === 'customField'){
      setImageModal({...imageModal, cover: {...imageModal.cover, open: false}})
    } 
    if(image === 'logo'){
        setImageModal({...imageModal, logo: {...imageModal.logo, open: false}})
    } 
    if(image === 'image'){
        setImageModal({...imageModal, cover: {...imageModal.cover, open: false}})
    } 
    if(image === 'coverFile'){
        setImageModal({...imageModal, coverFile: {...imageModal.coverFile, open: false}})
    } 
    if(image === 'filledImageFile'){
        setImageModal({...imageModal, filledImageFile: {...imageModal.filledImageFile, open: false}})
    } 
    if(image === 'unFilledImageFile'){
        setImageModal({...imageModal, unFilledImageFile: {...imageModal.unFilledImageFile, open: false}})
    } 
    if(image === 'dealOfferImageFile'){
      setImageModal({...imageModal, dealOfferImageFile: {...imageModal.dealOfferImageFile, open: false}})
    } 
    if(image === 'giftCardImageFile'){
      setImageModal({...imageModal, giftCardImageFile: {...imageModal.giftCardImageFile, open: false}})
    } 
  }

  return (
    <div id="imageModalV2" >
      <div className="d-flex space-between align-items-center otherBorderBottom1px">
        <div><IconButton className="deleteIcon" onClick={handleCancel}>
                  <SvgIcons.CrossIcon color={ColorSchemeCode.Paragraph}/>
              </IconButton></div>
              <div className="color-neutral100 Heading16M">Icon</div>
        <div><IconButton className="deleteIcon" onClick={showCroppedImage}>
                  {loader?<CircularProgress size={20} color={ColorSchemeCode.Paragraph}/> : <SvgIcons.IconTick color={ColorSchemeCode.themeColor}/>}
              </IconButton></div>
      </div>
       {imageSrc && <div>
          <div className="w-100"> 
          <div className={classes.cropContainer}>
            <Cropper
              image    = {imageSrc}
              crop     = {crop}
              rotation = {rotation}
              zoom     = {zoom}
              // cropAreaStyle    = {{width: '100px !important', height: '100px'}}
              // cropSize           = {{width : '100%' , height: (image === 'cover' || image === 'coverFile' || image === 'dealOfferImageFile') ? '56.6%' : '100%'  214 / 125}}
              aspect           = {(image === 'logo' || image === 'image') ? 1 / 1 : (image === 'cover' || image === 'coverFile') ? 205 / 78 : (image === "customField") ? 205 / 78 : (image === 'dealOfferImageFile') ? 5 / 4 : (image === 'giftCardImageFile') ? 214 / 125 : 1 / 1}
              onCropChange     = {setCrop}
              onRotationChange = {setRotation}
              onCropComplete   = {onCropComplete}
              onZoomChange     = {setZoom}

              //214x125
            />
          </div>
          </div>
        </div>}
    </div>
  )
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}
