import React, {useState, useEffect, useContext, createRef} from 'react';
import Fade from 'react-reveal/Fade';

import {SvgIcons, PngIcons} from '../../icons';

import CustomTextField from '../CustomTextField';
import CustomSelect from '../CustomSelect';
import CustomTextArea from '../CustomTextArea';
import CustomRadio from '../CustomRadio';
import CustomButton from '../CustomButton';
import ClickOutside from '../../utils/ClickOutside'

import {ChromePicker} from 'react-color';
import { Brand, ColorScheme, enums, User } from '../../enums';
import CustomsModal from '../CustomModal';
import { ImageModalV2 } from '../ImageModalV2/ImageModalV2';
import { Options, utils } from '../../utils';
import CustomImageDrop from '../CustomImageDrop';
import { ColorSchemeCode } from '../../enums/ColorScheme';
import { BrandService, PermissionService } from '../../services';
import * as localForage from 'localforage'
import { AgencyContext } from '../../context/Agency.context';
import { BusinessType, RedemptionType } from '../../enums/enums';
import Autocomplete from '../googleMap/Autocomplete';
import GoogleMap from '../googleMap/GoogleMap';

import { CircularProgress, FormHelperText, RadioGroup , FormControl } from '@material-ui/core';

export default function BrandLogoScreen({formik, setActivePage, index, state}){

    const [pageStatus, setPageStatus]           = useState('');
    const [brandNameIcon, setBrandNameIcon]     = useState('');
    const [brandNameLoader, setBrandNameLoader] = useState(false);
    const [show, setShow]                       = useState({
            brandNameIcon    : false,
            expandLoyaltyType: false,
    });
    const [imageModal, setImageModal]           = useState({
        logo  : {open: false, imageEvent: '', return: ''},
        cover : {open: false, imageEvent: '', return: ''}
    })


    const [brandNameError, setBrandNameError]     = useState('')
    const [masterAdminCheck, setMasterAdminCheck] = useState(false);
    const [loader, setLoader]                     = useState(false);
    const [process, setProcess]                   = useState(false);
    const [brandselected, setBrandSelected]       = useState('');
    const [loyaltyTypeName, setLoyaltyTypeName]   = useState(formik.values.brandType ? (formik.values.brandType === Brand.BrandTypes.NORMAL ? 'Small Business' : formik.values.brandType === Brand.BrandTypes.DEMO ? 'Demo' : formik.values.brandType === Brand.BrandTypes.SHARED_LOYALITY ? 'Shared  Loyalty Provider' : '') : 'Small Business');
    const [sharedBrandCheck, setSharedBrandCheck] = useState(false);
    const [demoCheck, setDemoCheck]               = useState(false);
    
    const agency = useContext(AgencyContext)

    useEffect (()=> setShow(true),[])

    const onLoad = async () => {
        setShow(true)
        const user = await localForage.getItem('user');
        let query = {userId : user._id, businessType: BusinessType.AGENCY, roles : User.Roles.MASTER_ADMIN}
        const permissions = await PermissionService.GetQueriedPermissions({query})
        let check = false;
        if(user.roles.includes(User.Roles.MASTER_ADMIN) && permissions.response.data[0].businessId === agency._id){check = true; setMasterAdminCheck(true);}
        if(agency&&agency.agencyUse&&agency.agencyUse==='partner') { setMasterAdminCheck(false);}
        
        if(check || masterAdminCheck){
            query = {createdBy: user._id, brandType: Brand.BrandTypes.SHARED_LOYALITY, delete: false}
            const {error, response} = await BrandService.Get({query});
            if(response) {setSharedBrandCheck(true);}
            else  {setSharedBrandCheck(false); }
        }

        query = {createdBy: user._id, brandType: Brand.BrandTypes.DEMO, delete: false}
        const {error, response} = await BrandService.Get({query})
        if(response)  {setDemoCheck(true)}
        else {setDemoCheck(false)}
    }

    useEffect(onLoad, []);


    const serviceName = [
        {serviceName: 'Small Business', value: Brand.BrandTypes.NORMAL, disable: false, detail : 'Run a single loyalty program.'},
        {serviceName: 'Demo', value: Brand.BrandTypes.DEMO, disable: demoCheck || !agency.whiteLabel, detail : 'Create a demo business for trial period to experience how walletly works.'},
        {serviceName: 'Shared  Loyalty Provider', value: Brand.BrandTypes.SHARED_LOYALITY, disable: (!masterAdminCheck || (masterAdminCheck && sharedBrandCheck)) , detail: 'The concept of shared loyalty is that many unrelated businesss join together in a partnership, which they may not be able to partner more traditionally.'}, 
    ]

    const dragOver  = (e) => e.preventDefault();
    const dragEnter = (e) => e.preventDefault();
    const dragLeave = (e) => e.preventDefault();
    
    const validateBrandNameFunc = async() => {
        setBrandNameLoader(true)
        const query = { brandName: formik.values.brandName , delete: false}

        const { error, response } = await BrandService.Get({query})
        if(response){
            formik.setFieldError('brandName', 'Brand name already exist')
            setShow({...show, brandNameIcon : false});
        }
        else{
            setShow({...show, brandNameIcon : true});
        }
        setBrandNameLoader(false)
    }

    


    const selectServiceType = async (e, value) => {
        e.preventDefault()
        setBrandNameError('') 
        setProcess(true);
        setBrandSelected(value.value)
        setLoyaltyTypeName(value.serviceName);
        setShow({...show, expandLoyaltyType : false})

        if(value.value === Brand.BrandTypes.NORMAL) {setProcess(false); return formik.setValues({...formik.values, brandType: value.value});}

        const user = await localForage.getItem('user'); 
        
        let query
        if(value.value === Brand.BrandTypes.SHARED_LOYALITY)
        {
            query = {createdBy: user._id, brandType: Brand.BrandTypes.SHARED_LOYALITY, delete: false}
            const {error, response} = await BrandService.Get({query})
            if(agency.whiteLabel && response && response.data[0].agency && response.data[0].agency.id === agency._id) return setBrandNameError('Shared Loyalty brand already exist')
            if(response && !agency.whiteLabel) return setBrandNameError('Shared Loyalty brand already exist')
        }

        if(value.value === Brand.BrandTypes.DEMO)
        {
            query = {createdBy: user._id, brandType: Brand.BrandTypes.DEMO, delete: false}
            const {error, response} = await BrandService.Get({query})
            if(response) return setBrandNameError('You already have Demo account')
        }

        setProcess(false);
        return formik.setValues({...formik.values, brandType: value.value})

        // nextScreen();
    }


    const [location, setLocation] = useState({
        lat         : '',
        lng         : '',
        address     : '',
        country     : '',
        city        : '',
        countryCode : '',
        state       : '',
        offset      : ''
    })

    useEffect(()=> setShow(true), [])

    const locationUpdate = () => setLocation(formik.values.location)
    useEffect(locationUpdate, [formik.values.location])
    
    // const formiklocationUpdate = () => formik.setValues({...formik.values, location: location})
    // useEffect(formiklocationUpdate, [location])

    const onAddressChange = (event) => {
        setLocation({...location, address: event.target.value})
        formik.setValues({...formik.values, location: {...formik.values.location, address: event.target.value}})
    }
    const onCityChange = (event) => {
        setLocation({...location, city: event.target.value})
        formik.setValues({...formik.values, location: {...formik.values.location, city: event.target.value}})
    }
    const onCountryChange = (event) => {
        setLocation({...location, country: event.target.value})
        formik.setValues({...formik.values, location: {...formik.values.location, country: event.target.value}})
    }
   

    const locationSummary = (location) => {
        // formik.setValues({...formik.values, location})
        // setLocation(location)
        const currency = utils.getCurrency({location: location})
        const selectedTimezone = utils.getTimezone({location: location})
        setTimezone(selectedTimezone)
        location.offset = selectedTimezone.utcOffset
        // formik.setValues({...formik.values, currency})
        formik.setValues({...formik.values, location, currency})
        setLocation(location)
    }

    const getPlace = (e) => {
        const Geocoder = new window.google.maps.Geocoder()
        const placeRequest = {location: {lat: e.latLng.lat(), lng: e.latLng.lng()}}

        Geocoder.geocode(placeRequest, (places, status) => {
            if(status !== window.google.maps.GeocoderStatus.OK) return
            const location = utils.summarisedLocation(places[0])
            formik.setValues({...formik.values, location})            
        })
    }

    const [timezone, setTimezone] = useState('')

    const onLoadMap = () => {
        const currency = utils.getCurrency({location: formik.values.location})
        const selectedTimezone = utils.getTimezone({location: formik.values.location})
        setTimezone(selectedTimezone)
        formik.setValues({...formik.values, currency})
    }

    useEffect(onLoadMap, [formik.values.location])

    const onCurrencyChange = (e) => {
        const currency = utils.getCurrency({currencyCode: e.target.value})
        formik.setValues({...formik.values, currency})
    }

    const onTimezoneChange = (e) => {
        const selectedTimezone = utils.getTimezone({timezoneName: e.target.value})
        setTimezone(selectedTimezone.name)
        const location = formik.values.location
        location.offset = selectedTimezone.utcOffset
        formik.setValues({...formik.values, location: location})
    }

    const locationRef = createRef(null);
    const mapRef      = createRef(null);


    useEffect(()=>{
        const goToSection = () => {
            state.locationShow &&  locationRef.current.scrollIntoView({ behavior: 'smooth' });
            formik.values.location != ""  &&  mapRef.current.scrollIntoView({ behavior: 'smooth' });
        };
        goToSection();
    },[state.locationShow, formik.values.location])


    return(
        <div id="brandLogoScreen" className='mobileCol animationComponent'>
                <div className="d-flex bg-color-cF7F7F7 vh-100" >
                    <div className="leftBox pb_100">
                        <div>
                        <div className="Heading20M color-neutral100">
                            Tell a little about your business.
                        </div>
                        <div className="mt_8 color-neutral60 Body16R pb-16">
                            This will help you setup your brand.
                        </div>

                        <div className="contentBox">
                            <div>                  
                                <CustomTextField 
                                    className  = "customInputField w-100"
                                    label      = "Business Name*"
                                    name       = "brandName"
                                    value      = {formik.values.brandName}
                                    onChange   = {formik.handleChange}
                                    // onKeyUp    = {handleKeyPress}
                                    inputProps = {{ onFocus: formik.handleBlur }}
                                    error      = {formik.touched.brandName && formik.errors.brandName}
                                    helperText = {formik.touched.brandName && formik.errors.brandName ? formik.errors.brandName : ''}
                                    onBlur     = {validateBrandNameFunc}
                                    icon       = {brandNameLoader && !formik.errors.brandName ? <CircularProgress size={14} color={'inherit'}/> : !brandNameLoader && !formik.errors.brandName && show.brandNameIcon ? <SvgIcons.TickIconSub/> : ''}
                                    position   = {'end'}
                                />
                            </div>

                            <div className="position-relative">
                                <div className="customLabel mb_4 mt_16">
                                    Business Type*
                                </div>
                                <div className="selectDropdown cp d-flex space-between" onClick={()=>setShow({...show, expandLoyaltyType : !show.expandLoyaltyType})} >
                                    <div>
                                        {loyaltyTypeName}
                                    </div>
                                    <div>
                                        <SvgIcons.DropDownTriangleIcon color={ColorSchemeCode.Heading} />
                                    </div> 
                                </div>
                                <div className={`servicesOuterBox expandable cp ${show.expandLoyaltyType && 'expand'}`}>
                                    {serviceName.map((value,index)=> 
                                        <div className={`singleLoyaltyType cp ${value.disable && 'disabled'} ${!value.disable && value.value == formik.values.brandType && 'activeCheckout'}`} onClick={(e) => selectServiceType(e, value)}>
                                            <div className="Heading16M color-neutral100">
                                                {value.serviceName}
                                            </div>
                                            <div className="color-neutral60 Body14R mt_8">
                                                {value.detail}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {formik.values.brandType == Brand.BrandTypes.SHARED_LOYALITY && <FormControl className='mt_16' error = {formik.touched.loyaltyConnectionBrand && formik.errors.loyaltyConnectionBrand}>
                                <div className="Heading20M color-neutral100">
                                    Would you like to connect with Loyalty/ Reward Program?
                                </div>

                                <div className='mt_16'>

                                </div>
                                <RadioGroup 
                                    name     = "loyaltyConnectionBrand"
                                    value    = {formik.values.loyaltyConnectionBrand}
                                    onChange = {formik.handleChange}
                                    onFocus  = {formik.handleBlur}
                                    className= {'d-flex flex-row' }
                                >
                                    <div>
                                        <CustomRadio 
                                            value = {'true'}
                                            label = "Yes"
                                        />
                                    </div>
                                    <div className="ml_32">
                                        <CustomRadio 
                                            value={'false'}
                                            label="No"
                                        />
                                    </div>
                                </RadioGroup>
                                <FormHelperText>
                                    {formik.touched.loyaltyConnectionBrand && formik.errors.loyaltyConnectionBrand ? formik.errors.loyaltyConnectionBrand : ''}
                                </FormHelperText>
                            </FormControl>}

                            <div className="categoryBox mt_8 ">
                                <CustomSelect 
                                    label      = {'Category*'}
                                    options    = {Options.getVenueType()}
                                    name       = "businessService"
                                    value      = {formik.values.businessService}
                                    onChange   = {(e)=>formik.setValues({...formik.values, businessService : e.target.value})}
                                    error      = {formik.touched.businessService && formik.errors.businessService}
                                    helperText = {formik.errors.businessService && formik.errors.businessService}
                                />
                            </div>

                            <div className="Link13R color-neutral60 mt_8">
                                Choose a category that describes what type of business or organization the business represents.
                            </div>
                            
                            <div className="mt_16 row">
                                <div className="col-4 pr_0">
                                    <CustomSelect 
                                        className  = "w-100"
                                        options    = {Options.getContryCodes()}
                                        name       = "dialingCode"
                                        label      = {'Dialing Code'} 
                                        value      = {formik.values.dialingCode}
                                        onChange   = {(e)=>formik.setValues({...formik.values, dialingCode : e.target.value})}
                                        error      = {formik.touched.dialingCode && formik.errors.dialingCode}
                                        helperText = {formik.errors.dialingCode && formik.errors.dialingCode}
                                    />
                                </div>
                                <div className="col-8">
                                    <CustomTextField 
                                        className  = "col-12"
                                        type       = "text"
                                        label      = "Phone Number*"
                                        name       = "phone"
                                        borer      = {"1px solid " + ColorSchemeCode.borderColor }
                                        value      = {formik.values.phone}
                                        onChange   = {formik.handleChange}
                                        inputProps = {{ onFocus: formik.handleBlur }}
                                        error      = {formik.touched.phone && formik.errors.phone}
                                        helperText = {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                                    />
                                    {formik.errors.phone && <div className="error">Phone number is not  valid</div>}
                                </div>
                            </div>
                                    {console.log('formik.errors ', formik.errors)}
                            <div className="description mt_16 w-100">
                                <CustomTextArea 
                                    label        = {'Description*'}
                                    name         = 'description'
                                    className    = "w-100"
                                    onChange     = {formik.handleChange}
                                    error        = {formik.touched.description && formik.errors.description}
                                    helperText   = {formik.touched.description && formik.errors.description ? formik.errors.description : ''}
                                    defaultValue = {formik.values.description}
                                    onBlur       = {formik.handleChange}
                                />
                            </div>
                            <div className='row text-center cp'>
                                <label htmlFor="imageUpload" className="contents col-12 mt_32 text-center" >
                                    <div className={(formik.values.brandLogo || formik.values.brandLogoFile) && !formik.errors.brandLogoFile ? "subheading dropImageCircle cp image text-center" : "subheading dropImageCircle cp text-center"}>
                                        {(formik.values.brandLogo || formik.values.brandLogoFile) && !formik.errors.brandLogoFile && 
                                        <img 
                                            src          = {formik.values.brandLogoFile ? URL.createObjectURL(formik.values.brandLogoFile) : formik.values.brandLogo}
                                            className    = "insideImage"
                                            alt          = "new"
                                        />}
                                        <span 
                                            className    = {(formik.values.brandLogo || formik.values.brandLogoFile) && !formik.errors.brandLogoFile ?
                                                                "imageUpload cp fs-14 color-Secondary remove" : "fs-14 cp color-Secondary imageUpload"}
                                            onDragOver  = {dragOver}
                                            onDragEnter = {dragEnter}
                                            onDragLeave = {dragLeave}
                                            onDrop      = {(e)=> {setImageModal({...imageModal, logo: {...imageModal.logo, open: true, imageEvent: e}}) }}
                                            // onDrop       = {fileChange}

                                        >
                                            <div className="mt_2">
                                                <label htmlFor="imageUpload" className="mb_0">
                                                    <div className="cp">
                                                        <SvgIcons.ImageDropIcon/>
                                                    </div>
                                                    <div className="color-neutral100 Link14M fs-14 cp mt_8 logoHeading">Add business logo*</div>
                                                </label>
                                                <div className="Link13R color-neutral60 mt_8 logoHeading">
                                                    or drag or drop
                                                </div>
                                                <input
                                                    id       = "imageUpload"
                                                    style    = {{display:'none'}}
                                                    type     = "file"
                                                    onChange = {(e)=> {setImageModal({...imageModal, logo: {...imageModal.logo, open: true, imageEvent: e}}) }}
                                                    // onChange = {fileChange}
                                                />
                                            </div>
                                        </span>
                                    </div>

                                    <CustomsModal
                                        open      = { imageModal.logo.open }
                                        // onClose   = { ()=> setImageModal({...imageModal, logo: {...imageModal.logo, open: false}}) }
                                        minWidth  = "470px"
                                        minHeight = "470px"
                                        padding   = "0px"
                                        component = { 
                                            <ImageModalV2 
                                                imageModal    = { imageModal }
                                                setImageModal = { setImageModal }
                                                image         = { 'logo' }
                                                formik        = { formik }
                                            />
                                        }
                                    />

                                </label>
                                {formik.values.brandLogoFile && formik.errors.brandLogoFile && <div className="mx-auto error">{formik.errors.brandLogoFile}</div>}
                            </div>

                            <div style={{height: '160px'}}>
                                <div className="w-100">
                                    <CustomImageDrop 
                                        imageUrl = {formik.values.brandCoverFile ? URL.createObjectURL(formik.values.brandCoverFile) : formik.values.brandCover}
                                        // onChange = {fileChange}
                                        onChange    = {(e)=> {setImageModal({...imageModal, cover: {...imageModal.cover, open: true, imageEvent: e}}) }}
                                        formik   = {formik}
                                        isImage  = {formik.values.brandCoverFile || formik.values.brandCover}
                                        text     = {<>
                                                    <div>
                                                        <SvgIcons.ImageDropIcon/>
                                                    </div>
                                            <div className="color-neutral100 Link14M fs-14 cp mt_8">Add business cover image </div>
                                            <div className="Link13R color-neutral60 mt_8">
                                                        or drag or drop
                                                </div>
                                            </>
                                        }
                                    />
                                    <FormHelperText>{formik.touched.brandCoverFile && formik.errors.brandCoverFile ? formik.errors.brandCoverFile : ''}</FormHelperText>
                                </div>

                                <CustomsModal
                                    open      = { imageModal.cover.open }
                                    onClose   = { ()=> setImageModal({...imageModal, cover: {...imageModal.cover, open: false}}) }
                                    minWidth  = "470px"
                                    minHeight = "470px"
                                    padding   = "0px"
                                    component = { 
                                        <ImageModalV2 
                                            imageModal    = { imageModal }
                                            setImageModal = { setImageModal }
                                            image         = { 'cover' }
                                            type         = { 'cover' }
                                            formik        = { formik }
                                        />
                                    }
                                />
                                
                                {/* {formik.values.brandCoverFile && formik.errors.brandCoverFile && <div className="mx-auto error">{formik.errors.brandCoverFile}</div>} */}
                            </div> 
                            <div  style = {{height : '56px'}}>

                            </div>
                            {state.locationShow && <div id="locationScreen" ref={locationRef} className = "position-relative">
                                <div>
                                    <div className="Heading20M color-neutral100">
                                        Add an address to get accurate outcome.
                                    </div>
                                    <div className="mt_32 pl_0">
                                        <Autocomplete 
                                            className       = "w-100"
                                            label           = "Address*"
                                            value           = {location.address}
                                            onChange        = {onAddressChange}
                                            locationSummary = {locationSummary}
                                            autocomplete    = "off"
                                        />
                                        <div className="error fs-12">{
                                            location.address && (location.lat==='' || location.lng==='' || !formik.values.location.lat || !formik.values.location.lng) && "Please type your address and select from dropdown"
                                        }</div>
                                    </div>
                    
                                    <div className="mt_16 row">
                                        <div className="col-md-6">
                                            <CustomTextField 
                                                // className  = "customInputField"
                                                placeholder = "City"
                                                value       = {location.city}
                                                onChange    = {onCityChange}
                                                // InputProps = {{ disableUnderline: false, style: {  fontSize: 16,color: 'color(neutral80)'} }}
                                            />
                                        </div>

                                        <div className="col-md-6 pl_0">
                                            <CustomTextField 
                                                // className  = "customInputField"
                                                placeholder = "Country"
                                                value       = {location.country}
                                                onChange    = {onCountryChange}
                                                // InputProps = {{ disableUnderline: false, style: {  fontSize: 16,color: 'color(neutral80)'} }}
                                            />
                                        </div>

                                    </div>

                                    <div className="mt_16 pl_0">
                                        <div className="customLabel">
                                            Timezone
                                        </div>
                                        <CustomSelect 
                                            className  = "w-100"
                                            options    = {Options.getTimezones()}
                                            label      = "Timezone Offset"
                                            value      = {timezone}
                                            onChange   = {onTimezoneChange}
                                        />
                                    </div>

                                    <div className="mt_16 pl_0">
                                        <div className="customLabel mt_16">
                                            Currency
                                        </div>
                                        <CustomSelect 
                                            className  = "w-100"
                                            options    = {Options.getCurrencyCodes()}
                                            label      = "Currency"
                                            value      = {formik.values.currency ? formik.values.currency.code : ''}
                                            onChange   = {onCurrencyChange}
                                        />
                                    </div>
                                </div>
                            </div>}
                        </div> 
                    </div>
                    </div>
                    <div className="rightSideBox">
                        <div className="logoPreviewBox">
                        <div className="Link14M color-neutral100">
                            Business page preview:
                        </div>
                        <div className="mt_16 position-relative previewCoverBox"> 
                            <img className="previewCover" src={formik.values.brandCoverFile != "" ?  URL.createObjectURL(formik.values.brandCoverFile) : formik.values.brandCover != "" ? formik.values.brandCover : PngIcons.emptyCover}/>  
                        </div>
                            
                        <div className="logoBoxPreview pl_24 d-flex">
                            <img className="previewLogo" src={formik.values.brandLogoFile != "" ? URL.createObjectURL(formik.values.brandLogoFile) : formik.values.brandLogo != "" ?  formik.values.brandLogo : PngIcons.emptyProfile}/>  
                            <div className="middle">
                                <div className="Heading22R2M color-neutral100 pl_8 capitalize">
                                    {formik.values.brandName == "" ? 'Business Name' : formik.values.brandName }
                                </div>
                                <div className="text-left w-100 pl_8 Body16R color-neutral60 capitalize">
                                    {formik.values.businessService ? formik.values.businessService : 'Category'}
                                </div>
                            </div>
                        </div>
                        
                        <div className="bar mt_16 mb_16"></div>
                            
                        <div className="mapOuterBox borderRadius-6">
                            <div className="insideMapBox">
                                <div className="color-neutral100 Heading18M">
                                    About
                                </div>
                                <div className="mapTopDetailsBox mt_16 d-flex">
                                    <div>
                                        <SvgIcons.InfoIcon/>
                                    </div>
                                    <div className="ml_10 brandDetailSection Body14R">
                                        {formik.values.description ? formik.values.description  : 'Business Description'}
                                    </div>
                                </div>
                                <div className="mapTopDetailsBox mt_16 d-flex">
                                    <div>
                                        <SvgIcons.PhoneIcon/>
                                    </div>
                                    <div className="ml_10 brandDetailSection Body14R">
                                        {formik.values.phone ? formik.values.dialingCode + ' ' + formik.values.phone  : 'Phone Number'}
                                    </div>
                                </div>
                                <div ref={mapRef} className="mapItself mt_16 position-relative">
                                    {formik.values.location == "" && <div className="mapOverlay"></div>}
                                    <div tabIndex="-1">
                                        <GoogleMap 
                                            width      = {"100%"}
                                            height     = {"244px"}
                                            zoom       = {location && location.lat ? 15 : 4}
                                            draggable  = {true}
                                            position   = {location ? {lat: location.lat, lng: location.lng } : ''}
                                            dragEnd    = {getPlace}
                                            className  = {'borderRadius-4'}
                                        />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
        </div>

    )

}