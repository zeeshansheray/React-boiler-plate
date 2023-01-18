import React, {useEffect, useState} from 'react';

import CustomTextField from '../CustomTextField';
import CustomButton from '../CustomButton';
import Autocomplete from '../googleMap/Autocomplete';
import GoogleMap from '../googleMap/GoogleMap';
import { Options, utils } from '../../utils';
import CustomSelect from '../CustomSelect';


export default function LocationScreen({formik, setActivePage, index}){

    const [show,setShow]=useState(false)
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

    const onAddressChange = (event) => setLocation({...location, address: event.target.value})
    const onCityChange = (event) => setLocation({...location, city: event.target.value})
    const onCountryChange = (event) => setLocation({...location, country: event.target.value})
   
    const locationSummary = (location) => {
        formik.setValues({...formik.values, location})
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

    const onLoad = () => {
        setShow(true)
        const currency = utils.getCurrency({location: formik.values.location})
        const selectedTimezone = utils.getTimezone({location: formik.values.location})
        setTimezone(selectedTimezone)
        formik.setValues({...formik.values, currency})

    }

    useEffect(onLoad, [formik.values.location])

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


    return(
        <div id = "locationScreen" className = "position-relative mb_80">
            <div>
                    <div className="Heading22M color-neutral100">
                        Add an address to get accurate outcome.
                    </div>
                    <div className="mt_8 color-neutral60 Body16R">
                        This will help us personalize your experience.
                    </div>
                    <div className="col-12 mt_24 pl_0">
                        <Autocomplete 
                            className       = "w-100"
                            label           = "Address"
                            value           = {location.address}
                            onChange        = {onAddressChange}
                            locationSummary = {locationSummary}
                        />                        
                    </div>

                    <div className="col-6 mt_20 pl_0">
                        <CustomTextField 
                            className  = "customInputField"
                            label      = "City"
                            value      = {location.city}
                            onChange   = {onCityChange}
                            variant    = "standard"
                            InputProps = {{ disableUnderline: false, style: {  fontSize: 16,color: 'color(neutral80)'} }}
                        />
                    </div>

                    <div className="col-6 mt_20 pl_0">
                        <CustomTextField 
                            className  = "customInputField"
                            label      = "Country"
                            value      = {location.country}
                            onChange   = {onCountryChange}
                            variant    = "standard"
                            InputProps = {{ disableUnderline: false, style: {  fontSize: 16,color: 'color(neutral80)'} }}
                        />
                    </div>

                    <div className="col-12 mt_16 pl_0">
                        <div className="customLabel">
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

                    <div className="col-12 mt_16 pl_0">
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
            </div>
                    {/* <div className="col-md-7 pl_80">
                        <div tabIndex="-1">
                            <GoogleMap 
                                width      = {"100%"}
                                height     = {"500px"}
                                zoom       = {location && location.lat ? 15 : 4}
                                draggable  = {true}
                                position   = {location ? {lat: location.lat, lng: location.lng } : ''}
                                dragEnd    = {getPlace}
                                className  = {'borderRadius-4'}
                            />
                        </div>
                    </div> */}
        </div>
    )


}