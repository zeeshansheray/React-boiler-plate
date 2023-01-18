import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import { FormControl, FormHelperText } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';

import * as localForage from 'localforage'

import LoyaltyAccordion from '../LoyaltyAccordion'
import CustomRadio from '../CustomRadio';
import CustomSelect from '../CustomSelect';
import CustomTextField from '../CustomTextField';
import CustomCheckBox from '../CustomCheckBox';
import ActivityTypeDetail from './ActivityType'
import SaveCloseButtons from '../Save&CloseButton'
import CommunicationDetail from './CommunicationDetail'

import PngIcons from '../../icons/png.icon'

import { useFormik } from 'formik';
import { Campaign } from '../../enums';
import { RedeemingWayVld } from '../../validation';
import { RedeemingWayService } from '../../services';
import { BrandContext } from '../../context/Brand.context';
import { uploadImage } from '../../utils/utils';


const ActionDetail = ({formik}) => {

    const brand = useContext(BrandContext)

    const dummyOptions = () => {
        const options = ['a', 'b', 'c', 'd']
        return options.map(option => <option value={option}>{option}</option>)
    }
    
    const fileChange = (e) => {
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        formik.setValues({...formik.values, iconFile: file[0]})
    }

    return(
        <div className="Activitytypedetails col-12 d-flex space-between">
            <div className="col-8">
                <div className='Heading4 color-neutral80'>Point Redemption Style</div>  
                <FormControl className="mt_24">
                    <RadioGroup 
                        name     = "redeemingType"
                        value    = {formik.values.redeemingType}
                        onChange = {formik.handleChange}
                        onFocus  = {formik.handleBlur}
                    >
                        <CustomRadio 
                            value     = {Campaign.RedeemingTypes.INCREMENTAL}
                            label     = "Increment of points (recommended)"
                            className = "mt_16"
                        />
                        <CustomRadio 
                            value = {Campaign.RedeemingTypes.FIXED}
                            label = "Fixed amount of points"
                        />
                    </RadioGroup>
                    <FormHelperText>
                        {formik.touched.redeemingType && formik.errors.redeemingType && formik.errors.redeemingType}
                    </FormHelperText>
                </FormControl>

                <div className='Heading4 color-neutral80 mt_32'>Earning value</div>  
                <div className="mt_24 d-flex">
                    <div className="col-6 pl_0">
                        <CustomTextField
                            className   = "w-100"
                            label       = "Points Cost"
                            placeholder = "500 Point"
                            name        = "cost"
                            type        = "number"
                            value       = {formik.values.cost}
                            onChange    = {formik.handleChange}
                            inputProps  = {{ onFocus: formik.handleBlur }}
                            error       = {formik.touched.cost && formik.errors.cost}
                            helperText  = {formik.touched.cost && formik.errors.cost && formik.errors.cost}
                        />
                    </div>
                    <div className="col-6 pl_0">
                        <CustomTextField
                            className   = "w-100"
                            label       = "Discount Value"
                            placeholder = "Rs 500"
                            name        = "redeemingValue"
                            type        = "number"
                            value       = {formik.values.redeemingValue}
                            onChange    = {formik.handleChange}
                            inputProps  = {{ onFocus: formik.handleBlur }}
                            error       = {formik.touched.redeemingValue && formik.errors.redeemingValue}
                            helperText  = {formik.touched.redeemingValue && formik.errors.redeemingValue && formik.errors.redeemingValue}
                        />
                    </div>
                </div>
                <div className='Heading4 color-neutral80 mt_32'>Applies to</div>  
                <FormControl className="mt_24">
                    <RadioGroup 
                        name     = "applyTo"
                        value    = {formik.values.applyTo}
                        onChange = {formik.handleChange}
                        onFocus  = {formik.handleBlur}
                    >
                        <CustomRadio 
                            value     = {Campaign.RedeemActivityApplies.ENTIRE}
                            label     = "Entire Order"
                            className = "mt_16"
                        />
                        <CustomRadio 
                            value = {Campaign.RedeemActivityApplies.SPECIFIC}
                            label = "Specific Order"
                        />
                    </RadioGroup>
                    <FormHelperText>
                        {formik.errors.applyTo && formik.errors.applyTo}
                    </FormHelperText>
                </FormControl>
                {formik.values.applyTo === Campaign.RedeemActivityApplies.SPECIFIC &&
                    <div className="col-6">
                        <CustomSelect
                            // options   = {getProgramApprovaltypes()}
                            className  = "w-100"
                            name       = "specificOrder"
                            value      = {formik.values.specificOrder}
                            onChange   = {formik.handleChange}
                            inputProps = {{ onFocus: formik.handleBlur }}
                            error      = {formik.touched.specificOrder && formik.errors.specificOrder}
                            helperText = {formik.touched.specificOrder && formik.errors.specificOrder && formik.errors.specificOrder}
                        />
                    </div>
                }
                <div className='Heading4 color-neutral80 mt_32'>Minimum Requirements</div>  
                <FormControl className="mt_24">
                    <RadioGroup 
                        value    = {formik.values.minRequirement}
                        onChange = {(e)=>formik.setValues({...formik.values, minRequirement: e.target.value})}
                    >
                        <CustomRadio 
                            value     = {'false'}
                            label     = "None"
                            className = "mt_16"
                        />
                        <CustomRadio 
                            value = {'true'}
                            label = "Minimum purchase amount"
                        />
                    </RadioGroup>
                </FormControl>
                {formik.values.minRequirement === 'true' &&
                    <div className="col-6">
                        <CustomSelect
                            // options   = {getProgramApprovaltypes()}
                            className  = "w-100"
                            value      = {formik.values.minPurchaseAmount}
                            onChange   = {formik.handleChange}
                            inputProps = {{ onFocus: formik.handleBlur }}
                            error      = {formik.touched.minPurchaseAmount && formik.errors.minPurchaseAmount}
                            helperText = {formik.touched.minPurchaseAmount && formik.errors.minPurchaseAmount && formik.errors.minPurchaseAmount}
                        />
                    </div>
                }
                   <div className='Heading4 color-neutral80 mt_32'>Discount Code</div>  
                <div className="mt_24">   
                    <CustomCheckBox
                        label="Add Prefix to discount code"
                        value={formik.values.addDiscountCode}
                        onChange={()=>formik.setValues({...formik.values, addDiscountCode: !formik.values.addDiscountCode})}
                    />
                </div>
                {formik.values.addDiscountCode &&
                    <div className="col-6 position-relative">
                    {/* <div className="Body14R position-absolute discountAmount z-index-1 fw-5">
                            $100OFF-
                    </div> */}

                    <CustomTextField
                            // paddingLeft="80px"
                            className   = "w-100"
                            placeholder = "$100OFF-"
                            name        = "discountCodePrefix"
                            value       = {formik.values.discountCodePrefix}
                            onChange    = {formik.handleChange}
                            inputProps  = {{ onFocus: formik.handleBlur }}
                            error       = {formik.touched.discountCodePrefix && formik.errors.discountCodePrefix}
                            helperText  = {formik.touched.discountCodePrefix && formik.errors.discountCodePrefix && formik.errors.discountCodePrefix}
                    />
                    </div>
                }
            </div>
            <div className="col-3">
                <div className='Heading4 color-neutral80'>Summary</div>  
                <div className="mt_24 Body14R">
                    {formik.values.redeemingValue &&
                        <div className="d-flex align-items-center">
                            <div className="square-box"></div>
                            <div>{brand.currency && brand.currency.symbol} {formik.values.redeemingValue} discount for {formik.values.cost} points</div>
                        </div>  

                    }
                    {formik.values.applyTo &&
                        <div className="d-flex align-items-center">
                            <div className="square-box"></div>
                            <div>Applies to {formik.values.applyTo} {formik.values.applyTo === Campaign.RedeemActivityApplies.SPECIFIC ? 'order' : 'orders'}</div>
                        </div>
                    }
                </div>
                <div className='Heading4 color-neutral80 mt_50 mb_24'>Icon</div>  
                    
                <CustomRadio label="Default" value={formik.values.icon} checked={!formik.values.iconFile} />
                
                <div className="d-flex mt_16">
                    <div className="mt_5">
                        <img src={formik.values.iconFile ? URL.createObjectURL(formik.values.iconFile) : formik.values.icon} width={20} alt=""/>
                    </div>
                    <div className="UploadImage ml_24">
                        <div className="mt_2">
                            <label htmlFor="imageUpload" className="mb_0 fs-12 fw-4">
                                Upload your own
                            </label>
                            <input
                                id       = "imageUpload"
                                style    = {{display:'none'}}
                                type     = "file"
                                onChange = {fileChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="Body14R mt_24">
                    Add a custom image to enhance the look of your program
                </div>
            </div>
        </div>
    )
}

export default function RedeemingWayForm({location, ...props}){

    const history = useHistory()

    const [state, setState] = useState({
        redeemingWays        : [],
        selectedActivityType : {},
        selectedRedeemingWay : {},
        campaign             : {},
        processing           : false,
        apiError             : ''
    })

    const communicationChild = {
        active      : false,
        referenceId : ''
    }

    const communication = {
        notification : communicationChild,
        sms          : communicationChild,
        email        : communicationChild,
        chatFlow     : communicationChild
    }

    const initState = {
        redeemingName      : '',
        activity           : '',
        active             : true,
        redeemingType      : '',
        cost               : '',
        redeemingValue     : '',
        applyTo            : '',
        specificOrder      : '',
        minRequirement     : 'false',
        minPurchaseAmount  : '',
        addDiscountCode    : false,
        discountCodePrefix : '',
        communication      : communication,
        icon               : '',
        iconFile           : '',
    }

    const handleSubmit = async() => {
        setState({...state, processing: true})
        let payload, icon

        const commonPayload = {...formik.values}
        delete commonPayload.iconFile
        delete commonPayload.minRequirement
        delete commonPayload.addDiscountCode

        if(formik.values.iconFile && !formik.errors.iconFile){
            const user = await localForage.getItem('user')
            const desiredPath = `${user._id}/${formik.values.brandName}`

            icon = await uploadImage({file: formik.values.iconFile, desiredPath})
            if(icon && icon.error) return setState({...state, processing: false, apiError: icon.error.message})
        }

        if(state.selectedRedeemingWay) // update earning way
        payload = {
            ...commonPayload,
            _id : state.selectedRedeemingWay._id,
        }
        else // create earning way
        payload = {
            ...commonPayload,
            campaignId : state.campaign._id,
            brandId    : state.campaign.brandId
        }

        if(icon && icon.response) payload.icon = icon.response.data

        const { error, response } = !state.selectedRedeemingWay ? 
                                    await RedeemingWayService.Create({toaster: true, payload}) : 
                                    await RedeemingWayService.Update({toaster: true, payload})
        if(error) return setState({...state, processing: false, apiError: error.message})
        

        const location = window.location.pathname.split('/')
        location.pop()
        history.push(location.join('/'))
    }

    const formik = useFormik({
        initialValues    : { ...initState },
        onSubmit         : handleSubmit,
        validationSchema : RedeemingWayVld.Create,
    })


    const onLoad = () => {
        if(!location.state) {
            const location = window.location.pathname.split('/')
            location.pop()
            history.push(location.join('/'))
            return
        }
        
        const selectedActivityType = location.state.selectedActivityType
        const selectedRedeemingWay = location.state.selectedWay
        const redeemingWays        = location.state.ways
        const campaign             = location.state.campaign

        setState({...state, redeemingWays, selectedActivityType, selectedRedeemingWay, campaign})


        selectedRedeemingWay &&
            formik.setValues({
                ...formik.values,
                redeemingName      : selectedRedeemingWay.redeemingName,
                active             : selectedRedeemingWay.active,
                activity           : selectedRedeemingWay.activity,
                cost               : selectedRedeemingWay.cost,
                redeemingType      : selectedRedeemingWay.redeemingType,
                redeemingValue     : selectedRedeemingWay.redeemingValue,
                applyTo            : selectedRedeemingWay.applyTo,
                specificOrder      : selectedRedeemingWay.specificOrder,
                minPurchaseAmount  : selectedRedeemingWay.minPurchaseAmount,
                discountCodePrefix : selectedRedeemingWay.discountCodePrefix,
                communication      : selectedRedeemingWay.communication,
                icon               : selectedRedeemingWay.icon,
                iconFile           : ''
             
            })
        
        selectedActivityType && 
            formik.setValues({
                ...formik.values, 
                activity      : selectedActivityType.key,
                icon          : selectedActivityType.image,
            })
    }

    useEffect(onLoad, [])

    const getSideValues = (title) => {

        function _activity(){
            return [{
                icon : formik.values.icon,
                name : formik.values.activity
            }]
        }
      
        function _actions(){
            
            return [
                {name: formik.values.redeemingType},
                formik.values.cost && {name: 'Point Cost '+ formik.values.cost},
                formik.values.redeemingValue && {name: 'Discount Value ' + formik.values.redeemingValue},
                {name: formik.values.applyTo},
                formik.values.discountCodePrefix && {name: 'Discount Prefix '+formik.values.discountCodePrefix}
            ]
        }
    
        function _communication(){
            return [
                Object.values(formik.values.communication).some(value => value.active) && {
                    name : 'Connected',
                    icon  : '',
                    style : 'sidebarConnectBtnStyle'
                },
                formik.values.communication.notification.active &&{
                    name : 'Notification',
                    icon  : PngIcons.notificationsidebarIcon,
                },
                formik.values.communication.email.active &&{
                    name : 'Email',
                    icon  : PngIcons.emailsidebarIcon,
                },
                formik.values.communication.sms.active &&{
                    name : 'SMS',
                    icon  : PngIcons.smssidebarIcon,
                },
                formik.values.communication.chatFlow.active &&{
                name : 'Chat Flow',
                icon  : PngIcons.chatFlowSidebarIcon,
                }
            ]
        }
    
        if(title === 'Activity Type')
        return _activity()
    
        if(title === 'Actions')
        return _actions()
    
        if(title === 'Communication')
        return _communication()
    }

    const checkExistance = (type) => {
        if(state.selectedRedeemingWay) 
        return state.redeemingWays.some(way => way.activity === type) && state.selectedRedeemingWay.activity !== type
        else return state.redeemingWays.some(way => way.activity === type)
    }

    const ActivityTypes = [
        {
            key         : Campaign.Activities.REDEEMING.AMOUNT,
            name        : 'Amount Discount',
            image       : PngIcons.dollarCashIcon,
            exist       : checkExistance(Campaign.Activities.REDEEMING.AMOUNT)
        },
        {
            key         : Campaign.Activities.REDEEMING.PRECENTAGE,
            name        : 'Percentage Off',
            image       : PngIcons.hundredIcon,
            exist       : checkExistance(Campaign.Activities.REDEEMING.PRECENTAGE)
        },
        {
            key         : Campaign.Activities.REDEEMING.SHIPPING,
            name        : 'Free Shipping',
            image       : PngIcons.deilveryBoxIcon,
            exist       : checkExistance(Campaign.Activities.REDEEMING.SHIPPING)
        },
        {
            key         : Campaign.Activities.REDEEMING.POS_AMOUNT,
            name        : 'POS Amount Discount',
            image       : PngIcons.dollarCashIcon,
            exist       : checkExistance(Campaign.Activities.REDEEMING.POS_AMOUNT)
        },
        {
            key         : Campaign.Activities.REDEEMING.POS_PERCENTAGE,
            name        : 'POS Percentage Off',
            image       : PngIcons.hundredIcon,
            exist       : checkExistance(Campaign.Activities.REDEEMING.POS_PERCENTAGE)
        },
    ]


    return (
        <div id="RedeemingWayForm" className="col-12">
            <form onSubmit={formik.handleSubmit} >
                <SaveCloseButtons formik={formik} state={state} name={'redeemingName'} />
                <LoyaltyAccordion
                    title      = {'Activity Type'}
                    details    = {<ActivityTypeDetail formik={formik} activityTypes={ActivityTypes} />}
                    sideValues = {getSideValues('Activity Type')}
                />
                <LoyaltyAccordion
                    title      = {'Actions'}
                    details    = {<ActionDetail formik={formik} />}
                    sideValues = {getSideValues('Actions')}
                />
                <LoyaltyAccordion
                    title      = {'Communication'}
                    details    = {<CommunicationDetail formik={formik} />}
                    sideValues = {getSideValues('Communication')}
                />
            </form>
        </div>
    )
}
