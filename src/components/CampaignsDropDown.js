import React, { useEffect, useState} from 'react'


import SvgIcons from '../icons/svg.icon'
import {ColorSchemeCode} from '../enums/ColorScheme'

export default function CampaignsDropDown({campaignList, title, onSelect, className, style}) {

    const [filteredCampaigns, setFielteredCampaigns] = useState({
        loyalty : '',
        stamp   : '',
        coupon  : '',
        ticket  : ''
    })

    const [campaigns, setCampaigns] = useState({
        loyalty : [],
        stamp   : [],
        coupon  : [],
        ticket  : []
    })

    const searchField = (e) => {
        const filteredLoyalty = campaigns.loyalty.filter(campaign => campaign.campaignName.toLowerCase().includes(e.target.value.toLowerCase()))
        const filteredStamp = campaigns.stamp.filter(campaign => campaign.campaignName.toLowerCase().includes(e.target.value.toLowerCase()))
        const filteredCoupon = campaigns.coupon.filter(campaign => campaign.campaignName.toLowerCase().includes(e.target.value.toLowerCase()))
        const filteredTicket = campaigns.ticket.filter(campaign => campaign.campaignName.toLowerCase().includes(e.target.value.toLowerCase()))
        setFielteredCampaigns({
            loyalty : [...filteredLoyalty],
            stamp   : [...filteredStamp],
            coupon  : [...filteredCoupon],
            ticket  : [...filteredTicket]
        })
    }



    const onLoad = () => {
        if(!campaignList) return
        const loyalties = campaignList.filter(campaign=>{if(campaign.campaignType === 5) return campaign})
        const stamps    = campaignList.filter(campaign=>{if(campaign.campaignType === 6) return campaign})
        const coupons   = campaignList.filter(campaign=>{if(campaign.campaignType < 5) return campaign})
        const tickets   = campaignList.filter(campaign=>{if(campaign.campaignType > 7) return campaign})

        setCampaigns({
            loyalty : [...loyalties],
            stamp   : [...stamps],
            coupon  : [...coupons],
            ticket  : [...tickets]
        })

    }

    useEffect(onLoad, [])

    return (
        <div id="Designdropdown">
            <div className={`category-dropdown position-absolute ${className}`} style={style}>
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
                    <ListItems 
                        title    = {'Loyalty'}
                        list     = {filteredCampaigns.loyalty || campaigns.loyalty}
                        onSelect = {onSelect}
                    />

                    <ListItems 
                        title    = {'Stamp'}
                        list     = {filteredCampaigns.stamp || campaigns.stamp}
                        onSelect = {onSelect}
                    />

                    <ListItems 
                        title    = {'Coupon'}
                        list     = {filteredCampaigns.coupon || campaigns.coupon}
                        onSelect = {onSelect}
                    />

                    <ListItems 
                        title    = {'Ticket'}
                        list     = {filteredCampaigns.ticket || campaigns.ticket}
                        onSelect = {onSelect}
                    />

                </div>
            </div>
        </div>
    )
}

function ListItems({title, list, onSelect}){
    return (
        <>
            <div className="category-search text-left fs-14">{title}</div>
            {list.map((campaign, idx) => (
                <div key={idx} className={`category-list`}>
                    <div onClick={()=>onSelect(campaign)} className="d-flex flex-column text-left categoryName cp">
                        <div className="color-neutral80 text-capitalize">{campaign.campaignName}</div> 
                        <div className="fs-10 color-caption">{campaign.description}</div>
                    </div>
                </div>
            ))}
        </>
    )
}
