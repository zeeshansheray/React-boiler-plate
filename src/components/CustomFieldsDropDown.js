import React, {useContext, useEffect, useState} from 'react'

import localForage from 'localforage'

import SvgIcons from '../icons/svg.icon'
import {ColorSchemeCode} from '../enums/ColorScheme'
import { Fields } from '../enums'
import { BrandContext } from '../context/Brand.context'
import { CustomFieldService } from '../services'
import { CampaignContext } from '../context/Campaign.context'


export default function CustomFieldsDropDown({title, selectValue, className, style}) {

    const [filteredFields, setFielteredFields] = useState()
    const [fields, setFields]                  = useState(Fields.FieldVariables)
    const [customFields, setCustomFields]      = useState([])
    const [campaign, setCampaign]              = useState()
    
    const brand    = useContext(BrandContext)


    const searchField = (e) => {
        const filter = Fields.FieldVariables.filter(category => category.label.toLowerCase().includes(e.target.value.toLowerCase()))
        filter && setFielteredFields([...filter])
    }


    const handleSelectedValue = async (category) => {
        const selectedCategory = {...category}

        if(category.reference === 'brand') selectedCategory.value = brand[category.key]

        if(category.reference === 'admin') {
            const user = await localForage.getItem('user')
            selectedCategory.value = user[category.key]
        }

        selectValue && selectValue(selectedCategory)

    }

    const getCustomField = async () => {
        const query = {brandId: brand._id}
        const campaign = await localForage.getItem('campaign');
        console.log('campaign', campaign);
        setCampaign(campaign[0])
        const { error, response } = await CustomFieldService.GetQueriedCustomFields({query})
        if(error ) return
        const fieldList = response && response.data.map(field => {
            return {
                key         : field.key,
                label       : field.label,
                value       : field.value,
                reference   : field.reference,
                description : field.description,
                fieldId     : field._id
            }
        })
        setCustomFields([...fieldList])
        setFields({ ...fields, CUSTOM:[...fieldList]})
    }

    const onLoad = () => customFields.length === 0 && getCustomField()

    useEffect(onLoad, [])

    return (
        <div id="Designdropdown">
            {console.log('campaign', campaign)}
            <div className={`category-dropdown ${className}`} style={style}>
                <div className="d-flex justify-content-between cp pl_17 pt_12 pr_9 pb_12">
                    <div className="color-neutral80 fs-14">{title}</div>
                </div>
                <div className="d-flex category-search">
                    <div><SvgIcons.SearchIcon color={ColorSchemeCode.c828282}/></div>
                    <input 
                        placeholder="Search"
                        onChange={searchField}    
                    />
                </div>

                <div className="fixed-block">
                    <div className="category-search text-left fs-14">
                        Admin
                    </div>
                    {(filteredFields || fields).ADMIN.map((category, idx) => (
                        <div key={idx} className={`category-list`}>
                            <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                <div className="fs-10 color-caption">{category.description}</div>
                            </div>
                        </div>
                    ))}

                    <div className="category-search text-left fs-14">
                        Brand
                    </div>
                    {(filteredFields || fields).BRAND.map((category, idx) => (
                        <div key={idx} className={`category-list`}>
                            <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                <div className="fs-10 color-caption">{category.description}</div>
                            </div>
                        </div>
                    ))}
                    
                    <div className="category-search text-left fs-14">
                        Subscriber
                    </div>
                    {(filteredFields || fields).SUBSCRIBER[0].USER.map((category, idx) => (
                        <div key={idx} className={`category-list`}>
                            <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                <div className="fs-10 color-caption">{category.description}</div>
                            </div>
                        </div>
                    ))}
                    <div className="category-search text-left fs-14">
                        Pass
                    </div>
                    {
                        (campaign && (campaign.campaignType < 5 || campaign.campaignType === 10)) &&
                        (filteredFields || fields).SUBSCRIBER[0].PASSES.COUPON.map((category, idx) => (
                            <div key={idx} className={`category-list`}>
                                <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                    <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                    <div className="fs-10 color-caption">{category.description}</div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        (campaign && (campaign.campaignType === 8 || campaign.campaignType === 9 )) &&
                        (filteredFields || fields).SUBSCRIBER[0].PASSES.TICKET.map((category, idx) => (
                            <div key={idx} className={`category-list`}>
                                <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                    <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                    <div className="fs-10 color-caption">{category.description}</div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        (campaign && campaign.campaignType === 5 ) &&
                        (filteredFields || fields).SUBSCRIBER[0].PASSES.LOYALTY_CARD.map((category, idx) => (
                            <div key={idx} className={`category-list`}>
                                <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                    <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                    <div className="fs-10 color-caption">{category.description}</div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        (campaign && campaign.campaignType === 6 ) &&
                        (filteredFields || fields).SUBSCRIBER[0].PASSES.STAMP_CARD.map((category, idx) => (
                            <div key={idx} className={`category-list`}>
                                <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                    <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                    <div className="fs-10 color-caption">{category.description}</div>
                                </div>
                            </div>
                        ))
                    }
                    {
                        (campaign && campaign.campaignType === 7 ) &&
                        (filteredFields || fields).SUBSCRIBER[0].PASSES.MEMBERSHIP_CARD.map((category, idx) => (
                            <div key={idx} className={`category-list`}>
                                <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                    <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                    <div className="fs-10 color-caption">{category.description}</div>
                                </div>
                            </div>
                        ))
                    }

                    <div className="category-search text-left fs-14">
                        CustomFields
                    </div>
                    {(filteredFields || fields).CUSTOM.map((category, idx) => category.reference === Fields.FieldReference.CUSTOM && (
                        <div key={idx} className={`category-list`}>
                            <div className="d-flex flex-column text-left categoryName cp" onClick={()=>handleSelectedValue(category)}>
                                <div className="color-textfieldColor text-capitalize">{category.label}</div> 
                                <div className="fs-10 color-caption">{category.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
