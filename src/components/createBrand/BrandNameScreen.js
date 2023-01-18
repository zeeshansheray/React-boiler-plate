import React, {useContext, useEffect, useState} from 'react';

import Fade from 'react-reveal/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as localForage from 'localforage'

import CustomButton from '../CustomButton';
import CustomTextField from '../CustomTextField'; 

import { Brand, ColorScheme, enums, User } from '../../enums';
import { BrandService, PermissionService } from '../../services';
import { AgencyContext } from '../../context/Agency.context';
import { BusinessType, RedemptionType } from '../../enums/enums';
import {SvgIcons} from '../../icons'
import { FormControl, FormHelperText, RadioGroup } from '@material-ui/core';
import CustomRadio from '../CustomRadio';
import { ColorSchemeCode } from '../../enums/ColorScheme';

export default function BrandNameScreen({formik, state, setActivePage, index}) {

    const [show, setShow]                         = useState(false)
    const [brandNameError, setBrandNameError]     = useState('')
    const [masterAdminCheck, setMasterAdminCheck] = useState(false);
    const [loader, setLoader]                     = useState(false);
    const [process, setProcess]                   = useState(false);
    const [brandselected, setBrandSelected]       = useState('');
    const [loyaltyTypeName, setLoyaltyTypeName]   = useState('Demo');

    const agency = useContext(AgencyContext)


    const onLoad = async () => {
        setShow(true)
        const user = await localForage.getItem('user');
        let query = {userId : user._id, businessType: BusinessType.AGENCY, roles : User.Roles.MASTER_ADMIN, delete: false}
        const permissions = await PermissionService.GetQueriedPermissions({query})
        if(permissions.error) setMasterAdminCheck(false)
        else{if(user.roles.includes(User.Roles.MASTER_ADMIN) && permissions.response.data[0].businessId === agency._id) setMasterAdminCheck(true)}
        
        if(agency&&agency.agencyUse&&agency.agencyUse==='partner') setMasterAdminCheck(false)
    }

    useEffect(onLoad, [])

  

    // const handleKeyPress = (e) => {
    //     setBrandNameError('')
    //     e.keyCode === 13 && nextScreen()
    // }

    const serviceName = [
        {serviceName: 'Demo', value: Brand.BrandTypes.DEMO, disable: false, detail : 'Create a demo business for trial period to experience how walletly works.'},
        {serviceName: 'Small Business', value: Brand.BrandTypes.NORMAL, disable: false, detail : 'Run a single loyalty program.'},
        {serviceName: 'Shared  Loyalty Provider', value: Brand.BrandTypes.SHARED_LOYALITY, disable: !masterAdminCheck, detail: 'The concept of shared loyalty is that many unrelated businesss join together in a partnership, which they may not be able to partner more traditionally.'}, 
    ]


    const selectServiceType = async (e, value) => {
        e.preventDefault()
        setBrandNameError('') 
        setProcess(true);
        setBrandSelected(value.value)
        setLoyaltyTypeName(value.serviceName);

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

    return(
        <div id="brandNameScreen" className="mobileCol">

          <div className="Heading22M color-neutral100">
                Select which loyalty type you want to run?
            </div>
            <div className="mt_8 color-neutral60 Body16R">
                This will help us personalize your experience.
            </div>

            <div className="selectDropdown cp d-flex space-between">
                <div>
                    {loyaltyTypeName}
                </div>
                <div>
                    <SvgIcons.DropDownTriangleIcon color={ColorSchemeCode.Heading} />
                </div> 
            </div>
            <div className="servicesOuterBox">
                {serviceName.map((value,index)=> 
                    <div className={`singleLoyaltyType ${value.disable && 'disabled'} ${!value.disable && value.value == formik.values.brandType && 'activeCheckout'}`} onClick={(e) => selectServiceType(e, value)}>
                        <div className="Heading16M color-neutral100">
                            {value.serviceName}
                        </div>
                        <div className="color-neutral60 Body14R mt_8">
                            {value.detail}
                        </div>
                    </div>
                )}
            </div>

{/* 
            <div className="">       
                <div className="d-flex space-between">
                    {serviceName.map((value,index)=>
                        <div  className={`fw-5 loyaltyTypeBox text-left mt_24 ${value.disable && 'disabled'} ${!value.disable && value.value == formik.values.brandType && 'activeCheckout'}`} key={index} onClick={(e) => selectServiceType(e, value)}>
                            <div>
                            <div className="Heading16M color-neutral100">
                                {value.serviceName}
                            </div>
                            <div className="color-neutral60 Body14R mt_8">
                                {value.detail}
                            </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="error">{brandNameError}</div>                            
            </div> */}

            
        </div>
    )

}
