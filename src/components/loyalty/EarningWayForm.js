import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';

import { FormControl, FormHelperText, CircularProgress } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';

import * as localForage from 'localforage'

import CustomButton from '../CustomButton'
import LoyaltyAccordion from '../LoyaltyAccordion'
import CustomRadio from '../CustomRadio';
import CustomSelect from '../CustomSelect';
import CustomTextField from '../CustomTextField';
import FullWidthCustomAccordion from '../FullWidthCustomAccordion';
import ActivityTypeDetail from './ActivityType'
import CommunicationDetail from './CommunicationDetail'
import CustomScroll from '../CustomScroll';
import CustomCheckBox from '../CustomCheckBox';
import CustomTextArea from '../CustomTextArea';


import { LayoutContext } from '../../context/Layout.context';
import { BrandContext } from '../../context/Brand.context';

import {Options, utils} from '../../utils'

import SvgIcons from '../../icons/svg.icon'
import PngIcons from '../../icons/png.icon'

import { ColorSchemeCode } from '../../enums/ColorScheme'

import { ClickOutside } from '../../utils'
import { uploadImage } from '../../utils/utils';


import { getOperands, getProgramApprovaltypes, getRuleSelectType } from '../../utils/Options';
import { useFormik } from 'formik';
import { Campaign, Fields } from '../../enums';
import { EarningWayVld } from '../../validation';
import { BrandService, EarningWayService } from '../../services';
import CustomSlider from '../CustomSlider';



const BusinessRulesDetail = ({formik}) => {

    const addNewAccordian = () => {
        const rules = formik.values.businessRules
        rules.push({conditions: [], actions: []})
        formik.setValues({...formik.values, businessRules: rules})
    }

    const removeAccordian = (e, idx) => {
        e.stopPropagation()
        const tempRules = formik.values.businessRules
        tempRules.splice(idx, 1)
        formik.setValues({...formik.values, businessRules: tempRules})
    }

    const copyAccordian = (e, idx) => {
        e.stopPropagation()
        const tempRules = formik.values.businessRules
        tempRules.push(formik.values.businessRules[idx])
        formik.setValues({...formik.values, businessRules: tempRules})
    }

    return(
        <div className="Businessrules col-12">
            {formik.values.businessRules.map((businessRule, idx) => (
                <div key={idx} className="mt_24">
                    <FullWidthCustomAccordion 
                        details         = {<SingelRule formik={formik} index={idx} />}
                        idx             = {idx}
                        formik          = {formik}
                        removeAccordian = {removeAccordian}
                        copyAccordian   = {copyAccordian}
                    />
                </div>
            ))}

            <div className="mt_24">
                <CustomButton
                    className = "fw-4"
                    btntext   = 'Add rule'
                    // height    = {'44px'}
                    width     = {'136px'}
                    fontSize  = {'14px'}
                    icon      = {<SvgIcons.PlusIcon/>}
                    onClick   = {addNewAccordian}
                />
            </div>
        </div>
    )
}

const SingelRule = ({formik, index}) =>{

    const [showConditon, setShowCondition] = useState(false)
    const [showAction, setShowAction]      = useState(false)

    const addCondition = (element) => {
        formik.values.businessRules[index].conditions.push({
            name     : element.name,
            field    : element.field,
            operand  : element.operand,
            value    : element.value,
            finished : element.finished
        })
        formik.setValues({...formik.values})
        setShowCondition(false)
    }

    const removeCondition = (e, idx) => {
        e.stopPropagation()
        formik.values.businessRules[index].conditions.splice(idx, 1)
        formik.setValues({...formik.values})
    }

    const updateCondition = (idx) => {
        formik.values.businessRules[index].conditions[idx].finished = false
        formik.setValues({...formik.values})
    }

    const finishCondition = (idx) => {
        formik.values.businessRules[index].conditions[idx].finished = true
        formik.setValues({...formik.values})
    }

    const addAction = (element) => {
        formik.values.businessRules[index].actions.push({
            name     : element.name,
            field    : element.field,
            value    : element.value,
            finished : element.finished
        })
        formik.setValues({...formik.values})
        setShowAction(false)
    }

    const removeAction = (e, idx) => {
        e.stopPropagation()
        formik.values.businessRules[index].actions.splice(idx, 1)
        formik.setValues({...formik.values})
    }

    const updateAction = (idx) => {
        formik.values.businessRules[index].actions[idx].finished = false
        formik.setValues({...formik.values})
    }

    const finishAction = (idx) => {
        formik.values.businessRules[index].actions[idx].finished = true
        formik.setValues({...formik.values})
    }

    return(
        <div className="singleRule col-12">
            <div className="pl_0 col-12 fs-20 fw-6">
                Conditions
            </div>
            <div className="col-12 bg-color-white">
                <div className="col-2 mt_8 pl_0">
                    <CustomSelect
                        options    = {getRuleSelectType()}
                        border     = {'0px'}
                        name       = {`businessRules[${index}].match`}
                        value      = {formik.values.businessRules[index].match}
                        onChange   = {formik.handleChange}
                        error      = {formik.errors.businessRules && formik.errors.businessRules[index].match}
                        helperText = {formik.errors.businessRules && formik.errors.businessRules[index].match}
                    />  
                </div>
                <div className="d-flex">
                    <div className="col-3 pb_40 pl_0 position-relative mt_16">
                        <ClickOutside onClick={()=>setShowCondition(false)}>
                            <CustomButton
                                className       = "fw-4"
                                btntext         = 'Add Condition'
                                // height          = {'44px'}
                                width           = {'183px'}
                                onClick         = {()=>setShowCondition(!showConditon)}
                                backgroundColor = {ColorSchemeCode.white}
                                border          = {`1px solid ${ColorSchemeCode.accordionBorderColor}`}
                                color           = {ColorSchemeCode.textfieldColor}
                                fontSize        = {'14px'}
                                hover           = {ColorSchemeCode.white}
                                focus           = {ColorSchemeCode.white}
                                icon            = {<SvgIcons.PlusIcon color={ColorSchemeCode.textfieldColor}/>}
                            />
                            {showConditon && <Conditions addCondition={addCondition} />}
                        </ClickOutside>
                    </div>
                    <div className="col-9 pl_0 pb_40 row">
                        {formik.values.businessRules[index].conditions.map((condition,idx)=>
                            <div className="singleActivityBox body1 color-c828282 mr_16 mt_16">
                                <div onClick={()=>updateCondition(idx)} className="cp pt_9 pb_9 pl_12 pr_12 borderRadius-4" style={{border: '1px dashed #E0E0E0'}}>
                                    <span>{condition.name}</span>
                                    <span onClick={(e)=>removeCondition(e, idx)} className="ml_20">x</span>
                                </div>
                                {!condition.finished &&  <UpdateCondition formik={formik} index={index} finishCondition={finishCondition} idx={idx} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div class="actions col-12 pl_0 pr_0 mt_16">
                <div className="pl_0 col-12 fs-20 fw-6">
                    Actions
                </div>
                <div className="d-flex bg-color-white mt_8">
                    <div className="col-3 pt_16 pb_40 position-relative">
                        <ClickOutside onClick={()=>setShowAction(false)}>
                            <CustomButton
                                className       = "fw-4"
                                btntext         = 'Add Action'
                                // height          = {'44px'}
                                width           = {'154px'}
                                onClick         = {()=>setShowAction(!showAction)}
                                backgroundColor = {ColorSchemeCode.white}
                                border          = {`1px solid ${ColorSchemeCode.accordionBorderColor}`}
                                color           = {ColorSchemeCode.textfieldColor}
                                fontSize        = {'14px'}
                                hover           = {ColorSchemeCode.white}
                                focus           = {ColorSchemeCode.white}
                                icon            = {<SvgIcons.PlusIcon color={ColorSchemeCode.textfieldColor}/>}
                            />
                            {showAction && <Actions addAction={addAction}/>}
                        </ClickOutside>
                    </div>
                    <div className="col-9 pl_0 pb_40 row">
                        {formik.values.businessRules[index].actions.map((action,idx)=>
                            <div className="singleActivityBox body1 color-c828282 mr_16 mt_16">
                                <div onClick={()=>updateAction(idx)} className="cp pt_9 pb_9 pl_12 pr_12 borderRadius-4" style={{border: '1px dashed #E0E0E0'}}>
                                    <span>{action.name}</span>
                                    <span onClick={(e)=>removeAction(e, idx)} className="ml_20">x</span>
                                </div>
                                {!action.finished && <UpdateAction formik={formik} index={index} finishAction={finishAction} idx={idx} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Conditions = ({addCondition}) => {
    const AcitvityAttributes = [
            {
                name     : 'Order value',
                field    : 'amount',
                operand  : '',
                value    : '',
                finished : false
            },
    ]

    const AcitvityAttributesBackup = [
        {
            name : 'Product Id',
            value: 'Equals to',
        },
        {
            name : 'Product Category',
            value: 'Equals to',
        },
        {
            name : 'Transition Date',
            value: 'Equals to',
        },
        {
            name : 'Order value',
            value: 'Equals to',
        },
    ]

    const MemberAttributes = [
        {
            name : 'Member Tag',
            value: 'Contains all of',
        },
        {
            name : 'Available Points',
            value: '',
        },
        {
            name : 'Points Expired ',
            value: '',
        },
        {
            name : 'Points Redeemed',
            value: '',
        },
        {
            name : 'Number of Purchases',
            value: '',
        },
        {
            name : 'User Tier',
            value: '',
        },
        {
            name : 'Lifetime Points Earned',
            value: '',
        },
        {
            name : 'Frequency',
            value: '',
        },       
    ]


    return(
        <div className="dropdown-box col-12 pt_8 pb_8">
            <div className="Heading4">Activity Attributes</div>
            <div>
                {
                    AcitvityAttributes.map((element, idx)=>
                        <div className="Body14R ml_10 mt_8 pr_10 d-flex space-between cp" onClick={()=>addCondition(element)}>
                            {element.name}
                            <SvgIcons.ArrowExpand/> 
                        </div>
                    )
                }
            </div>
            <div className="Heading4 mt_16">Member Attributes</div>
            <div>
                {
                    MemberAttributes.map((element)=>
                        <div className="Body14R ml_10 pr_10 mt_8 d-flex space-between cp" onClick={()=>addCondition(element)}>
                        {element.name}
                        <SvgIcons.ArrowExpand/> 
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const UpdateCondition = ({formik, index, finishCondition, idx}) => {

    return (
        <div className="dropdown-box col-6 p_8">
            <div className="d-flex align-items-center">
                <div className="col-4 label color-c828282 text-left">Operand</div>
                <CustomSelect
                    options    = {getOperands()}
                    border     = {'0px'}
                    name       = {`businessRules[${index}].conditions[${idx}].operand`}
                    value      = {formik.values.businessRules[index].conditions[idx].operand}
                    onChange   = {formik.handleChange}
                    error      = {  formik.errors.businessRules && 
                                    formik.errors.businessRules[index] &&
                                    formik.errors.businessRules[index].conditions && 
                                    formik.errors.businessRules[index].conditions[idx] && 
                                    formik.errors.businessRules[index].conditions[idx].operand
                                }
                    helperText = {  formik.errors.businessRules && 
                                    formik.errors.businessRules[index] && 
                                    formik.errors.businessRules[index].conditions && 
                                    formik.errors.businessRules[index].conditions[idx] && 
                                    formik.errors.businessRules[index].conditions[idx].operand
                                }
                /> 
            </div>
            <div className="d-flex align-items-center mt_16">
                <div className="col-4 label color-c828282 text-left">Value</div>
                <CustomTextField
                    className   = "w-100"
                    placeholder = ""
                    name        = {`businessRules[${index}].conditions[${idx}].value`}
                    value       = {formik.values.businessRules[index].conditions[idx].value}
                    onChange    = {formik.handleChange}
                    inputProps  = {{ onFocus: formik.handleBlur }}
                    error       = { formik.errors.businessRules &&
                                    formik.errors.businessRules[index] &&
                                    formik.errors.businessRules[index].conditions && 
                                    formik.errors.businessRules[index].conditions[idx] && 
                                    formik.errors.businessRules[index].conditions[idx].value
                                }
                    helperText  = { formik.errors.businessRules && 
                                    formik.errors.businessRules[index] && 
                                    formik.errors.businessRules[index].conditions && 
                                    formik.errors.businessRules[index].conditions[idx] && 
                                    formik.errors.businessRules[index].conditions[idx].value
                                }
                />
            </div>
            <hr className="my-4"></hr>
            <div 
                onClick={()=>finishCondition(idx)} 
                className={`color-cEB763C w-fit-content ml_auto cp mr_20 mb_10 ${(!formik.values.businessRules[index].conditions[idx].operand || !formik.values.businessRules[index].conditions[idx].value) && 'disabled'}`}
            >Done</div>
        </div>
    )
}

const Actions = ({addAction}) => {
    const AcitvityAttributes = [
        {
            name     : 'Give Bonus Points',
            field    : 'bonus',
            value    : '',
            finished : false,
        }
    ]

    const AcitvityAttributesBackup = [
        {
            name : 'Product Id',
            value: 'Equals to',
        },
        {
            name : 'Product Category',
            value: 'Equals to',
        },
        {
            name : 'Transition Date',
            value: 'Equals to',
        },
        {
            name : 'Order value',
            value: 'Equals to',
        },
    ]

    return (
        <div className="dropdown-box col-12 pt_8 pb_8">
            <div className="Heading4">Actions</div>
            <div>
                {
                    AcitvityAttributes.map((element)=>
                        <div className="Body14R ml_10 mt_8 pr_10 d-flex space-between cp" onClick={()=>addAction(element)}>
                            {element.name}
                            <SvgIcons.ArrowExpand/> 
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const UpdateAction = ({formik, index, finishAction, idx}) => {
    return (
        <div className="dropdown-box col-6 p_8">
           
            <div className="d-flex align-items-center mt_16">
                <div className="col-4 label color-c828282 text-left">Value</div>
                <CustomTextField
                    className   = "w-100"
                    placeholder = ""
                    name        = {`businessRules[${index}].actions[${idx}].value`}
                    value       = {formik.values.businessRules[index].actions[idx].value}
                    onChange    = {formik.handleChange}
                    inputProps  = {{ onFocus: formik.handleBlur }}
                    error       = { formik.errors.businessRules && 
                                    formik.errors.businessRules[index] && 
                                    formik.errors.businessRules[index].actions && 
                                    formik.errors.businessRules[index].actions[idx] && 
                                    formik.errors.businessRules[index].actions[idx].value
                                }
                    helperText  = { formik.errors.businessRules && 
                                    formik.errors.businessRules[index] && 
                                    formik.errors.businessRules[index].actions && 
                                    formik.errors.businessRules[index].actions[idx] && 
                                    formik.errors.businessRules[index].actions[idx].value
                                }
                
                />
            </div>
            <hr className="my-4"></hr>
            <div 
                onClick={()=>finishAction(idx)} 
                className={`color-cEB763C w-fit-content ml_auto cp mr_20 mb_10 ${(!formik.values.businessRules[index].actions[idx].value) && 'disabled'}`}
            >Done</div>
        </div>
    )
}

export default function EarningWayForm({location, ...props}){
    
    const history = useHistory()
    const layout  = useContext(LayoutContext);

    
    const [selectedEarningWay, setSelectedEarningWay] = useState();

    const [state, setState] = useState({
        earningWays          : [],
        selectedActivityType : {},
        selectedEarningWay   : {},
        campaign             : {},
        processing           : false,
        apiError             : '',
        edit                 : history.location.edit && history.location.edit ? true : false,
        loader               : false,
        components           : [],
    })
    
    useEffect(()=>{
        layout.setLayout({
            title        : "Edit Earning Way",
            backTitles   : ['Loyalty Suite','Earning Ways'],
            button       : '',
            borderBottom : true,
            edit         : false
        });
    },[history, state])

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
        earningName      : '',
        activity         : '',
        earningType      : '',
        earningValue     : '',
        approvalType     : 'immediately',
        active           : true,
        businessRules    : [],
        communication    : communication,
        iconFile         : '',
        icon             : '',
        earningValueRange: [],
        passcodeType     : '',
        passCode         : '',
        sendSms          : false,
        validatePasscode : false,
        description      : ''
    }

    const handleSubmit = async () => {
        setState({...state, processing: true, loader: true})
        let payload, icon
        

        const commonPayload = {...formik.values}
        delete commonPayload.iconFile

        console.log('commonPayload', commonPayload);

        if(formik.values.iconFile && !formik.errors.iconFile){
            const user = await localForage.getItem('user')
            const desiredPath = `${user._id}/${formik.values.brandName}`

            icon = await uploadImage({file: formik.values.iconFile, desiredPath})
            if(icon && icon.error) return setState({...state, processing: false, apiError: icon.error.message})
        }

        if(selectedEarningWay) // update earning way
        payload = {
            ...commonPayload,
            _id : selectedEarningWay._id,
        }
        else // create earning way
        payload = {
            ...commonPayload,
            campaignId  : state.campaign._id,
            campaignType: state.campaign.campaignType,
            brandId     : state.campaign.brandId
        }

        if(payload.earningValueRange&&payload.earningValueRange.length>0){
            payload.earningValueRange.map((value, index)=>{
                delete payload.earningValueRange[index].check
                if(value.maxValue==='') delete payload.earningValueRange[index].maxValue
            })
        }

        if(payload.activity === Campaign.Activities.EARNING.CHECKIN)
        {
            if(payload.earningType === Campaign.EarningTypes.RANGE) delete payload.earningValue
            else delete payload.earningValueRange
            // delete payload.earningValue
            // delete payload.earningType
            // delete payload.approvalType
        }
        else if(payload.earningType === Campaign.EarningTypes.RANGE){
            delete payload.passcodeType;
            delete payload.earningValue;
            delete payload.passCode;
            delete payload.sendSms;
        }
        else 
        {
            delete payload.earningValueRange;
            delete payload.passcodeType;
            delete payload.passCode;
            delete payload.sendSms;
        }

        
        if(icon && icon.response) payload.icon = icon.response.data
        
        console.log('payload', payload);

        const { error, response } = !selectedEarningWay ? 
                                    await EarningWayService.Create({toaster: true, payload}) : 
                                    await EarningWayService.Update({toaster: true, payload})

            console.log(
                'response.data;', response.data
            )
        
        if(response.data){
            let selectedLoyalityEarningWays = await localForage.getItem('selectedLoyalityEarningWays')   
            selectedLoyalityEarningWays.map((element, idx)=>{
                if(element._id === selectedEarningWay._id) {
                    selectedLoyalityEarningWays[idx] = response.data;
                    if(selectedLoyalityEarningWays[idx].earningType === 'range') delete selectedLoyalityEarningWays[idx].earningValue
                    else if(selectedLoyalityEarningWays[idx]?.earningValueRange && selectedLoyalityEarningWays[idx].earningType !== 'range') delete selectedLoyalityEarningWays[idx].earningValueRange
                    console.log('selectedLoyalityEarningWays', selectedLoyalityEarningWays)
                    localForage.setItem('selectedLoyalityEarningWays', selectedLoyalityEarningWays) 
                }
            })
            props.setEarningWays([...selectedLoyalityEarningWays])
        }                       
        if(error) return setState({...state, processing: false, apiError: error.message , loader : false})
        
        setState({...state, processing: false, loader : false})

        const location = window.location.pathname.split('/')
        location.pop()
        props.earningWays.forEach((i,idx) => {
            if(i._id === history.location.state.selectedWay._id){
                props.earningWays[idx].active = payload.active

            }
        });
        history.push(location.join('/'))
    }

    const formik = useFormik({
        initialValues    : { ...initState },
        onSubmit         : handleSubmit,
        validationSchema : EarningWayVld.Create,
    })

    const onLoad = () => {
        if(!location.state) {
            const location = window.location.pathname.split('/')
            location.pop()
            history.push(location.join('/'))
            return
        }

        const selectedActivityType = location.state.selectedActivityType
        const selectedEarningWay   = location.state.selectedWay
        const earningWays          = location.state.ways
        const campaign             = location.state.campaign


        setState({...state, earningWays, selectedActivityType, selectedEarningWay, campaign})
        setSelectedEarningWay(selectedEarningWay)


        selectedEarningWay &&
            formik.setValues({
                ...formik.values,
                earningName      : selectedEarningWay.earningName,
                active           : selectedEarningWay.active,
                activity         : selectedEarningWay.activity,
                earningType      : selectedEarningWay.earningType,
                earningValue     : selectedEarningWay.earningValue&&selectedEarningWay.earningValue,
                earningValueRange: selectedEarningWay.earningValueRange?selectedEarningWay.earningValueRange:[],
                approvalType     : selectedEarningWay.approvalType,
                approvalDuration : selectedEarningWay.approvalDuration,
                businessRules    : selectedEarningWay.businessRules,
                communication    : selectedEarningWay.communication,
                icon             : selectedEarningWay.icon,
                iconFile         : '',
                description      : selectedEarningWay?.description || "" ,
            })
        
        if(selectedEarningWay.activity === Campaign.Activities.EARNING.CHECKIN){
            formik.setValues({
                ...formik.values, 
                earningName      : selectedEarningWay.earningName,
                activity         : selectedEarningWay.activity,
                businessRules    : selectedEarningWay.businessRules,
                icon             : selectedEarningWay.icon,
                earningType      : selectedEarningWay.earningType,
                earningValue     : selectedEarningWay.earningValue&&selectedEarningWay.earningValue,
                earningValueRange: selectedEarningWay.earningValueRange?selectedEarningWay.earningValueRange: [],
                approvalType     : selectedEarningWay.approvalType,
                passcodeType     : selectedEarningWay.passcodeType,
                passCode         : selectedEarningWay.passCode,
                sendSms          : selectedEarningWay.sendSms,
                validatePasscode : selectedEarningWay.validatePasscode


            })
        }


        selectedActivityType && 
            formik.setValues({
                ...formik.values, 
                activity    : selectedActivityType.key,
                icon        : selectedActivityType.image,
                earningType : selectedActivityType.key === Campaign.Activities.EARNING.SPENDING ? Campaign.EarningTypes.INCREMENTAL : Campaign.EarningTypes.FIXED
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
            const approvalType = {
                'immediately'    : 'Immediatley',
                'manually'       : 'Manually',
                'fixed_duration' : 'After a fixed duration'
            }
            return [
                {name: formik.values.earningType},
                {name: approvalType[formik.values.approvalType]},
                formik.values.earningValue && {name: formik.values.earningValue + ' Points'}
            ]
        }
    
        function _businessRule(){
            const conditionCheck = formik.values.businessRules[0].conditions && formik.values.businessRules[0].conditions[0]
            const actionCheck = formik.values.businessRules[0].actions && formik.values.businessRules[0].actions[0]
        
            return [
                {name: formik.values.businessRules[0].match},
                conditionCheck && {name: formik.values.businessRules[0].conditions[0].field},
                actionCheck && {name: formik.values.businessRules[0].actions[0].name},
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
    
        if(title === 'Business Rules' && formik.values.businessRules && formik.values.businessRules.length)
        return _businessRule()
    
        if(title === 'Communication')
        return _communication()
    }

    const checkExistance = (type) => {
        if(state.selectedEarningWay) 
        return state.earningWays.some(way => way.activity === type) && state.selectedEarningWay.activity !== type
        else return state.earningWays.some(way => way.activity === type)
    }

    const ActivityTypes = [
        {
            key         : Campaign.Activities.EARNING.SPENDING,
            name        : 'Spending',
            image       : PngIcons.spendingIcon,
            exist       : checkExistance(Campaign.Activities.EARNING.SPENDING)
        },
        {
            key         : Campaign.Activities.EARNING.BIRTHDAY,
            name        : 'Celebrate a birthday',
            image       : PngIcons.birthdayIcon,
            exist       : checkExistance(Campaign.Activities.EARNING.BIRTHDAY)
        },
        {
            key         : Campaign.Activities.EARNING.SIGNUP,
            name        : 'Signup',
            image       : PngIcons.smileIcon,
            exist       : checkExistance(Campaign.Activities.EARNING.SIGNUP)
        },
        {
            key         : Campaign.Activities.EARNING.CUSTOM,
            name        : 'Custom',
            image       : PngIcons.starIcon,
            exist       : false
        },
        {
            key         : Campaign.Activities.EARNING.VISIT,
            name        : 'Visit',
            image       : PngIcons.keyIcon,
            exist       : checkExistance(Campaign.Activities.EARNING.VISIT)
        },
    ]

    return (
        <div id="EarningWayForm" className="col-12 d-flex middle pt_40"> 
            <div className="w-55">
                <ActionDetail handleSubmot={handleSubmit} state={state} formik={formik}  ActivityTypes={ActivityTypes} />
            </div>
        </div>
    )
}


const ActionDetail = ({formik ,state, handleSubmit}) => {
    const EarningValueLabel = {
        [Campaign.EarningTypes.FIXED]       : '1 Points earned on every amount',
        [Campaign.EarningTypes.INCREMENTAL] : 'Points earned for every $ 1 spent',
    }

    const fileChange = (e) => {
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        formik.setValues({...formik.values, iconFile: file[0]})
    }

    const handleChangeCustom = (e, key) => {
        if(e.target.value >= 0){
            formik.setValues({...formik.values, [key] : e.target.value})
        }
    }

    const addPointRangesFunc = () => {
        let newRange = {
            minValue : 0,
            maxValue : 0,
            points   : 0,
        }
        formik.setValues({...formik.values , earningValueRange : [...formik.values.earningValueRange , newRange]})
    }

    const removingEarningValue = (element, idx) => {
        const values = formik.values.earningValueRange.filter((element, index)=>{
           return  index != idx
        })

        formik.setValues({...formik.values , earningValueRange : values})
    }

    // const changeHandle = (e,newValue) => {
    //     console.log('idx ', selected);
    //     console.log('new Value  ', newValue);

    //     let minValue = newValue[0];
    //     let maxValue = newValue[1];


    //     formik.values.earningValueRange[selected].minValue = minValue
    //     formik.values.earningValueRange[selected].maxValue = maxValue

    //     formik.setValues({...formik.values})

    //     // formik.setValues({...formik.values,
    //     //     earningValueRange : {
    //     //         ...formik.values.earningValueRange, 
    //     //             formik.values.earningValueRange[selected] : {minValue : minValue, maxValue : maxValue} 
    //     //         // formik.values.earningValueRange[selected].minValue : minValue, 
    //     //         // formik.values.earningValueRange[selected].maxValue : maxValue
    //     //     },
    //     // })

    // }

    // const [selected, setSelected] = useState(0);

    // const onChangePoints  = (e , idx) => {
    //     if(e.target.value >= 0 && e.target.value < 10){
    //         formik.values.earningValueRange[idx].points = e.target.value;
    //         formik.setValues({...formik.values})
    //     }
    //     // else{
            
    //     // }
    // }

    return(
        <div className="">
            <div className="mb_16">
                {
                    <div>
                        <div>
                        <div className="Heading22M color-neutral100 mb_6">
                            Place an Order
                        </div>  
                        <div className="Body14R color-neutral60">
                        {Campaign.Activities.EARNING.CHECKIN == formik.values.activity ? 'Set earning value by setting points on specific spending ranges.'  : 'In place an order earning way, customer will earn points every time they place any order.'}
                        </div>
                        <div className="bar mt_16 mb_16"></div>
                        <div className="w-100 mt_16 mb_16">
                            <CustomTextArea  
                                onChange = {formik.handleChange}
                                value    = {formik.values.description}
                                name     = "description"
                                label    = "Description"
                            />
                    
                        </div>
                        <div className="Heading16M color-neutral100">Earning Type</div>
                            <div className="w-100 mt_16">
                                <FormControl error = {formik.touched.earningType && formik.errors.earningType}>
                                    <RadioGroup 
                                        name      = "earningType"
                                        className = 'Body14R'
                                        // value    = {formik.values.activity === Campaign.Activities.EARNING.SIGNUP ? Campaign.EarningTypes.INCREMENTAL : formik.values.earningType}
                                        value    = {formik.values.earningType}
                                        onChange = {formik.handleChange}
                                        onFocus  = {formik.handleBlur}
                                        classes = {'Body14R'}
                                    >
                                        <CustomRadio 
                                            value     = {Campaign.EarningTypes.INCREMENTAL}
                                            label     = {<div className='Body14R'>Increment of points (recommended)</div>}
                                            // checked={formik.touched.earningType === Campaign.EarningTypes.INCREMENTAL ? true : false}
                                            />
                                        <CustomRadio 
                                            value = {Campaign.EarningTypes.FIXED}
                                            label = {<div className='Body14R'>Fixed amount of points</div>}

                                            // checked={formik.touched.earningType === Campaign.EarningTypes.FIXED ? true : false}
                                            />
                                        <CustomRadio 
                                            value = {Campaign.EarningTypes.RANGE}
                                            label = {<div className='Body14R'>Range Bucket</div>}
                                            // checked={formik.touched.earningType === Campaign.EarningTypes.RANGE ? true : false}
                                        />
                                    </RadioGroup>
                                    <FormHelperText>
                                        {formik.touched.earningType && formik.errors.earningType ? formik.errors.earningType : ''}
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            {/* <div className="w-100 mt_24">
                                <CustomSelect 
                                    options   = {Options.getEarningTypes()}
                                    className = {formik.values.activity === Campaign.Activities.EARNING.SIGNUP ? "w-60 disabled":"w-60"}
                                    name      = "earningType"
                                    value     = {formik.values.activity === Campaign.Activities.EARNING.SIGNUP ? Campaign.EarningTypes.INCREMENTAL : formik.values.earningType}
                                    onChange  = {(e)=>formik.setValues({...formik.values, earningType: e.target.value})}
                                />
                            </div> */}
                        </div>

                        <div>
                            <div className="mt_16 mb_16 bar"></div>
                            <div className="Heading16M color-neutral100">
                                Earning Value
                            </div>  
                            {
                            formik.values.earningType===Campaign.EarningTypes.RANGE?
                            <div className="position-relative">
                                {formik.values.earningValueRange.map((element, idx)=><div className="signelEarningRange w-100">
                                    <div className="position-relative">
                                        {idx > 0 && <div className="cp Body14R color-neutral60 position-absolute" style={{right: 0, top: 0}} onClick={()=>removingEarningValue(element, idx)}>
                                            Remove 
                                        </div>}
                                    </div>
                                    <div className="d-flex" >
                                        <div style={{width: 100}}>
                                            <CustomTextField 
                                                label       = "Min"
                                                icon        = "$"
                                                position    = "start"
                                                name        = {`earningValueRange.[${idx}].minValue`}
                                                type        = "number"
                                                width       = "w-100"
                                                onChange    = {formik.handleChange}
                                                value       = {formik.values.earningValueRange[idx].minValue}
                                            />
                                        </div>
                                        <div className='mr_3 ml_3' style={{marginTop: '-5px', marginLeft: '-6px'}}>
                                            <CustomCheckBox 
                                                className = " align-self-center"
                                                value     = {formik.values.earningValueRange[idx].check}
                                                onChange  = {(e)=>{
                                                    if(formik.values.earningValueRange[idx].check === true || formik.values.earningValueRange[idx].check === 'true'){
                                                        formik.values.earningValueRange[idx].maxValue = ''
                                                        formik.values.earningValueRange[idx].check = false
                                                    }
                                                    else formik.values.earningValueRange[idx].check = true
                                                    
                                                    formik.setValues({...formik.values})
                                                }}
                                            />
                                            <div className="text-center mt_6 color-neutral100">-</div>
                                        </div>
                                        <div className='mr_40' style={{width: 100}}>
                                            <CustomTextField 
                                                label     = "Max"
                                                icon      = "$"
                                                position  = "start"
                                                width     = "100px"
                                                name      = {`earningValueRange.[${idx}].maxValue`}
                                                type      = "number"
                                                className = {idx===0?(formik.values.earningValueRange[idx].check ? "mr_8" : "mr_8 disabled"):(formik.values.earningValueRange[idx].check ? "mr_8" : "mr_8 disabled")}
                                                onChange  = {formik.handleChange}
                                                value     = {formik.values.earningValueRange[idx].maxValue}
                                            />
                                        </div>
                                    </div>
                                    {console.log('formik.values.earningValueRange[idx].points.toString().length ', formik.values.earningValueRange[idx].points.toString().length)}
                                    <div className="d-flex mt_8 wrapRemove">
                                       <div className="Body14R color-neutral60 ">Points awarded:</div>
                                        <input 
                                                type      = "number"
                                                name      = {`earningValueRange.[${idx}].points`}
                                                onChange  = {formik.handleChange}
                                                // onChange  = {(e) => onChangePoints(e,idx)}
                                                value     = {formik.values.earningValueRange[idx].points ? formik.values.earningValueRange[idx].points : 0}
                                                className = "outline-none border-none color-neutral100 ml_5 background-inherit"
                                        />
                                        {/* <div className="ml_4 color-neutral100 Body14R">Points</div> */}
                                    </div>
                                </div>)}
                                <div className="mt_8">
                                    <CustomButton className="w-100"
                                        btntext = "Add Range"
                                        icon    = {<SvgIcons.Add color={ColorSchemeCode.themeColor}/>}
                                        varient = "tertiary"
                                        onClick = {addPointRangesFunc}
                                        size = "l"
                                    />
                                </div>
                            </div>
                            :
                            <div className="mt_16">
                                <CustomTextField
                                    className = "w-100"
                                    label     = {EarningValueLabel[formik.values.earningType]}
                                    name      = "earningValue"
                                    type      = "number"
                                    value     = {formik.values.earningValue}
                                    onChange  = {(e)=>handleChangeCustom(e,'earningValue')}
                                    // inputProps   = {{ onFocus: formik.handleBlur }}
                                    error        = {formik.touched.earningValue && formik.errors.earningValue}
                                    helperText   = {formik.touched.earningValue && formik.errors.earningValue && formik.errors.earningValue}
                                />
                            </div>}
                        </div>

                        {/* <div>
                            <div className="mt_16 mb_16 bar"></div>
                            <div className="Heading18R color-neutral100">
                                Approval Type
                            </div>  

                            <div className="mt_16 w-100">

                            <FormControl error = {formik.touched.approvalType && formik.errors.approvalType}>
                                    <RadioGroup 
                                        name     = "approvalType"
                                        value    = {formik.values.approvalType}
                                        onChange = {formik.handleChange}
                                        onFocus  = {formik.handleBlur}
                                    >
                                        <CustomRadio 
                                            value = {Campaign.ApprovalTypes.IMMEDIATELY}
                                            label = "Immediatley"
                                        />
                                        <CustomRadio 
                                            value={Campaign.ApprovalTypes.MANUALLY}
                                            label="Manually"
                                        />
                                        <CustomRadio 
                                            value={Campaign.ApprovalTypes.AFTER_DURATION}
                                            label="After a fixed duration"
                                        />
                                    </RadioGroup>
                                    <FormHelperText>
                                        {formik.touched.approvalType && formik.errors.approvalType ? formik.errors.approvalType : ''}
                                    </FormHelperText>
                                </FormControl> */}


                                {/* <CustomSelect
                                    options    = {getProgramApprovaltypes()}
                                    className  = "w-100"
                                    name       = "approvalType"
                                    label      = "Select Type:"
                                    value      = {formik.values.approvalType}
                                    onChange   = {(e)=>formik.setValues({...formik.values, approvalType: e.target.value})}
                                    error      = {formik.errors.approvalType}
                                    helperText = {formik.errors.approvalType}
                                /> */}
                                {/* {formik.values.approvalType === Campaign.ApprovalTypes.AFTER_DURATION &&
                                    <div className="mt_24">
                                        <CustomTextField
                                            className   = "w-100"
                                            label       = "Duration in days"
                                            type        = "number"
                                            name        = "approvalDuration"
                                            value       = {formik.values.approvalDuration}
                                            onChange    = {(e)=>handleChangeCustom(e,'approvalDuration')}
                                            inputProps  = {{ onFocus: formik.handleBlur }}
                                            error       = {formik.touched.approvalDuration && formik.errors.approvalDuration}
                                            helperText  = {formik.touched.approvalDuration && formik.errors.approvalDuration && formik.errors.approvalDuration}
                                        />
                                    </div>
                                }
                            </div>
                        </div> */}

                        <div className="bar mt_16 mb_16"></div>
                        <CustomButton 
                            btntext = {"Update"}
                            onClick = {()=>formik.handleSubmit()}
                            icon    = {state.processing && <CircularProgress color={'inherit'} size={15} />}
                        />
                    </div>  

                        
                    // : 
                    //     <div>
                    //         {formik.values.earningValueRange.map((element, idx)=><div className="signelEarningRange w-60">
                    //             <div className="d-flex space-between">
                    //                 <div className="Caption12R color-captionColor">
                    //                     {(idx < 9 && '0') + (idx+1)}
                    //                 </div>
                    //                 {idx > 0 && <div className="cp" onClick={()=>removingEarningValue(element, idx)}>
                    //                     <SvgIcons.DeleteIcon />
                    //                 </div>}
                    //             </div>
                    //             <div className="d-flex space-between mt_24" >
                    //                 <CustomTextField 
                    //                     label    = "Min Value"
                    //                     icon     = "$"
                    //                     position = "start"
                    //                     name        = {`earningValueRange.[${idx}].minValue`}
                    //                     type     = "number"
                    //                     className= "mr_8"
                    //                     onChange = {formik.handleChange}
                    //                     value    = {formik.values.earningValueRange[idx].minValue}
                    //                 />
                    //                 <CustomTextField 
                    //                     label    = "Max Value"
                    //                     icon     = "$"
                    //                     position = "start"
                    //                     name        = {`earningValueRange.[${idx}].maxValue`}
                    //                     type     = "number"
                    //                     className= "mr_8"
                    //                     onChange = {formik.handleChange}
                    //                     value    = {formik.values.earningValueRange[idx].maxValue}
                    //                 />
                    //                 <CustomTextField 
                    //                     label    = "Points"
                    //                     type     = "number"
                    //                     name     = {`earningValueRange.[${idx}].points`}
                    //                     onChange = {formik.handleChange}
                    //                     value    = {formik.values.earningValueRange[idx].points}
                    //                 />
                    //             </div>
                    //             <div className="mt_8">
                    //                 <CustomCheckBox
                    //                     label    = "Validation Passcode"
                    //                     onChange = {formik.handleChange}
                    //                     name     = {`earningValueRange.[${idx}].validPassCode`}
                    //                     value    = {formik.values.earningValueRange[idx].validPassCode}
                    //                 />
                    //             </div>
                    //         </div>)}
                    //         <div className="mt_8">
                    //             <CustomButton 
                    //                 btntext = "Add Value"
                    //                 icon    = {<SvgIcons.Add color={ColorSchemeCode.themeColor}/>}
                    //                 varient = "tertiary"
                    //                 onClick = {addPointRangesFunc}
                    //             />
                    //         </div>
                    //     </div>
                    
                    }
            </div>
        </div>
        
    )
}

const PasswordProtection = ({formik}) => {
    const [passCodeLoader, setPassCodeLoader] = useState(false);

    const brand = useContext(BrandContext);


    const sendPassCodeFunc = async() => {
        setPassCodeLoader(true);
        const payload = { email : brand.email, code : formik.values.passCode }
        const {error, response} = await BrandService.SendPassCode({toaster: true, payload});
        setPassCodeLoader(false)
    }


    return(
        <div>
            <div className="Heading22M color-neutral100">
                Validation Passcode
            </div>

            <div className="validPassCode mt_16">
                <CustomCheckBox     
                    label = "Validate Passcode"
                    value     = {formik.values.validatePasscode}
                    onChange={()=>{
                        formik.values.validatePasscode = !(formik.values.validatePasscode) 
                        formik.setValues({...formik.values})
                        }
                    }
                />
            </div>

            {/* <div className='mt_12'>
                <CustomCheckBox 
                    label    = "Send SMS"
                    value    = {formik.values.sendSms}
                    onChange={()=>{
                        formik.values.sendSms = !(formik.values.sendSms) 
                        formik.setValues({...formik.values})
                    }
                }
                />
            </div> */}
            <FormControl className='mt_12 w-60' error = {formik.touched.passcodeType && formik.errors.passcodeType}>
                <RadioGroup 
                    name     = "passcodeType"
                    value    = {formik.values.passcodeType}
                    onChange = {formik.handleChange}
                    onFocus  = {formik.handleBlur}
                >
                    <CustomRadio 
                        value = {Campaign.PasscodeTypes.FIXED}
                        label = "Send me a validation passcode every day on my email."
                    />
                     <div className="ml_16 mt_8 mb_8">
                        <CustomButton 
                            btntext = "Email Passcode"
                            varient = "secondary"
                            icon      = {passCodeLoader ? <CircularProgress size={20} color={'inherit'}/> : <SvgIcons.EmailIcon/>}
                            disabled= {formik.values.passcodeType != Campaign.PasscodeTypes.FIXED && true}
                            onClick = {sendPassCodeFunc}
                        />
                    </div>

                    <CustomRadio 
                        value = {Campaign.PasscodeTypes.DYNAMIC}
                        label = "Set fix validation passcode"
                    />
                    <div className="w-95 mt_8 ml_16">
                        <CustomTextField 
                            label     = "Validation Passcode"
                            className = { formik.values.passcodeType === Campaign.PasscodeTypes.FIXED && formik.values.passCode  ? "disabled w-100" : "w-100"}
                            value     = {formik.values.passCode}
                            onChange  = {(e)=>formik.setValues({...formik.values, passCode : e.target.value})}
                        />
                    </div>
                </RadioGroup>
                <FormHelperText>
                    {formik.touched.passcodeType && formik.errors.passcodeType ? formik.errors.passcodeType : ''}
                </FormHelperText>
            </FormControl>

        </div>
    )
}
