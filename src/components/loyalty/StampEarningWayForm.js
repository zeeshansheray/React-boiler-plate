import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';

import { FormControl, FormHelperText } from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';

import * as localForage from 'localforage'

import CustomButton from '../CustomButton'
import LoyaltyAccordion from '../LoyaltyAccordion'
import CustomRadio from '../CustomRadio';
import CustomSelect from '../CustomSelect';
import CustomTextField from '../CustomTextField';
import FullWidthCustomAccordion from '../FullWidthCustomAccordion';
import ActivityTypeDetail from './ActivityType'
import SaveCloseButtons from '../Save&CloseButton'
import CommunicationDetail from './CommunicationDetail'

import SvgIcons from '../../icons/svg.icon'
import PngIcons from '../../icons/png.icon'

import { ColorSchemeCode } from '../../enums/ColorScheme'

import { ClickOutside } from '../../utils'
import { compareJSON, uploadImage } from '../../utils/utils';


import { getOperands, getProgramApprovaltypes, getRuleSelectType } from '../../utils/Options';
import { useFormik } from 'formik';
import { Campaign } from '../../enums';
import { EarningWayVld } from '../../validation';
import { EarningWayService } from '../../services';

const ActionDetail = ({formik}) => {

    const EarningValueLabel = {
        [Campaign.EarningTypes.FIXED]       : 'Stamps on every redeemption',
        [Campaign.EarningTypes.INCREMENTAL] : 'Stamps earned for every $ 1 spent'
    }

    const fileChange = (e) => {
        e.preventDefault();
        const file = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        formik.setValues({...formik.values, iconFile: file[0]})
    }

    return(
        <div className="Activitytypedetails col-12 d-flex space-between">
            <div className="col-8">
                <div className='Heading4 color-neutral80'>Earning Type</div>  
                <FormControl className="mt_24">
                    <RadioGroup 
                        name     = "earningType"
                        value    = {formik.values.earningType}
                        onChange = {formik.handleChange}
                        onFocus  = {formik.handleBlur}
                    >
                        {formik.values.activity === Campaign.Activities.EARNING.SPENDING &&
                            <CustomRadio 
                                value     = {Campaign.EarningTypes.INCREMENTAL}
                                label     = "Increment of stamps (recommended)"
                                className = "mt_16"
                            />
                        }
                        <CustomRadio 
                            value = {Campaign.EarningTypes.FIXED}
                            label = "Fixed amount of stamps"
                        />
                    </RadioGroup>
                    <FormHelperText>
                        {formik.touched.earningType && formik.errors.earningType && formik.errors.earningType}
                    </FormHelperText>
                </FormControl>

                <div className='Heading4 color-neutral80 mt_32'>Earning value</div>  
                <div className="mt_24">
                    <CustomTextField
                        className   = "w-50"
                        label       = {EarningValueLabel[formik.values.earningType]}
                        placeholder = "1 Stamp"
                        name        = "earningValue"
                        type        = "number"
                        value       = {formik.values.earningValue}
                        onChange    = {formik.handleChange}
                        inputProps  = {{ onFocus: formik.handleBlur }}
                        error       = {formik.touched.earningValue && formik.errors.earningValue}
                        helperText  = {formik.touched.earningValue && formik.errors.earningValue && formik.errors.earningValue}
                    />
                </div>
                <div className='Heading4 color-neutral80 mt_32'>Approval type</div>  
                <div className="mt_24">
                    <CustomSelect
                        options    = {getProgramApprovaltypes()}
                        className  = "w-50"
                        name       = "approvalType"
                        label      = "Select Type:"
                        value      = {formik.values.approvalType}
                        onChange   = {formik.handleChange}
                        error      = {formik.errors.approvalType}
                        helperText = {formik.errors.approvalType}
                    />
                    {formik.values.approvalType === Campaign.ApprovalTypes.AFTER_DURATION &&
                        <div className="mt_24">
                            <CustomTextField
                                className   = "w-50"
                                label       = "Duration"
                                type        = "number"
                                placeholder = "10 Days"
                                name        = "approvalDuration"
                                value       = {formik.values.approvalDuration}
                                onChange    = {formik.handleChange}
                                inputProps  = {{ onFocus: formik.handleBlur }}
                                error       = {formik.touched.approvalDuration && formik.errors.approvalDuration}
                                helperText  = {formik.touched.approvalDuration && formik.errors.approvalDuration && formik.errors.approvalDuration}
                            />
                        </div>
                    }
                </div>

                <div className="mt_32 Body14R color-tableActionDropdownColor">
                    Limit the number of times each customer can earn Stamps for this action.
                </div>
                <Link className="color-themeColor fs-14">
                    Upgrade now.
                </Link>
            </div>
            <div className="col-3">
                <div className='Heading4 color-neutral80'>Summary</div>  
                <div className="mt_24 Body14R d-flex">
                    <span>•</span>
                    {formik.values.activity === Campaign.Activities.EARNING.SPENDING &&
                        <span className="ml_4">Customers earn {formik.values.earningValue || 0} Stamps for every
                            {formik.values.earningType === Campaign.EarningTypes.INCREMENTAL && ' $ 1 spent'}
                            {formik.values.earningType === Campaign.EarningTypes.FIXED && ' redemption'}
                        </span>
                    } 
                    {formik.values.activity !== Campaign.Activities.EARNING.SPENDING &&
                        <span className="ml_4">{formik.values.earningValue || 0} Stamps for completing action</span>
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

export default function StampEarningWayForm({location, ...props}){

    const history = useHistory()

    const [state, setState] = useState({
        earningWays          : [],
        selectedActivityType : {},
        selectedEarningWay   : {},
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
        earningName   : '',
        activity      : '',
        earningType   : '',
        earningValue  : '',
        approvalType  : '',
        active        : true,
        businessRules : [],
        communication : communication,
        iconFile      : '',
        icon          : ''
    }

    const handleSubmit = async () => {
        setState({...state, processing: true})
        let payload, icon

        const commonPayload = {...formik.values}
        delete commonPayload.iconFile

        if(formik.values.iconFile && !formik.errors.iconFile){
            const user = await localForage.getItem('user')
            const desiredPath = `${user._id}/${formik.values.brandName}`

            icon = await uploadImage({file: formik.values.iconFile, desiredPath})
            if(icon && icon.error) return setState({...state, processing: false, apiError: icon.error.message})
        }

        if(state.selectedEarningWay) // update earning way
        payload = {
            ...commonPayload,
            _id : state.selectedEarningWay._id,
        }
        else // create earning way
        payload = {
            ...commonPayload,
            campaignId : state.campaign._id,
            brandId    : state.campaign.brandId
        }
        
        if(icon && icon.response) payload.icon = icon.response.data

        const { error, response } = !state.selectedEarningWay ? 
                                    await EarningWayService.Create({toaster: true, payload}) : 
                                    await EarningWayService.Update({toaster: true, payload})
        if(error) return setState({...state, processing: false, apiError: error.message})
        
        const index = state.earningWays.findIndex(earningWay=>earningWay._id === response.data._id) 
        state.earningWays[index] = response.data

        const location = window.location.pathname.split('/')
        location.pop()
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


        selectedEarningWay &&
            formik.setValues({
                ...formik.values,
                earningName      : selectedEarningWay.earningName,
                active           : selectedEarningWay.active,
                activity         : selectedEarningWay.activity,
                earningType      : selectedEarningWay.earningType,
                earningValue     : selectedEarningWay.earningValue,
                approvalType     : selectedEarningWay.approvalType,
                approvalDuration : selectedEarningWay.approvalDuration,
                businessRules    : selectedEarningWay.businessRules,
                communication    : selectedEarningWay.communication,
                icon             : selectedEarningWay.icon,
                iconFile         : ''
            })
        
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
                formik.values.earningValue && {name: formik.values.earningValue + ' Stamps'}
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
        <div id="EarningWayForm" className="col-12">
            <form onSubmit={formik.handleSubmit}>
                <SaveCloseButtons formik={formik} state={state} name={'earningName'} />
                <LoyaltyAccordion
                    title      = {'Activity Type'}
                    formik     = {formik}
                    details    = {<ActivityTypeDetail formik={formik} activityTypes={ActivityTypes} />}
                    sideValues = {getSideValues('Activity Type')}
                />
                <LoyaltyAccordion
                    title      = {'Actions'}
                    formik     = {formik}
                    details    = {<ActionDetail formik={formik} />}
                    sideValues = {getSideValues('Actions')}
                />
                <LoyaltyAccordion
                    title      = {'Business Rules'}
                    formik     = {formik}
                    details    = {<BusinessRulesDetail formik={formik} />}
                    sideValues = {getSideValues('Business Rules')}
                />
                <LoyaltyAccordion
                    title      = {'Communication'}
                    formik     = {formik}
                    details    = {<CommunicationDetail formik={formik} />}
                    sideValues = {getSideValues('Communication')}
                />
            </form>
        </div>
    )
}
