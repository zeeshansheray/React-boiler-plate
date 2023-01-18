import React,{useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';

import PartialSideBar from './PartialSideBar'
import SidebarSub from './SidebarSub';
import SvgIcons from '../../icons/svg.icon';
import GrowthToolChild from './sidebarSubChilds/GrowthToolChild';
import LoyaltyChild from './sidebarSubChilds/LoyaltyChild';
import ProgramChild from './sidebarSubChilds/ProgramChild';
import DashboardChild from './sidebarSubChilds/DashboardChild';
import WalletScanChild from './sidebarSubChilds/WalletScanChild';
import NudgesChild from './sidebarSubChilds/NudgesChild';
import RedemptionChild from './sidebarSubChilds/RedemptionChild';
import ReferralChild from './sidebarSubChilds/ReferralChild';
import SettingChild from './sidebarSubChilds/SettingSubChild';
import ProfileSettingChild from './sidebarSubChilds/ProfileSettingChild';
import CommunicationChild from './sidebarSubChilds/CommunicationChild';
import CampaignsChild from './sidebarSubChilds/CampaignsChild';
import { LayoutContext } from '../../context/Layout.context';
import { Brand, User } from '../../enums';
import { UserContext } from '../../context/User.context';
import { BrandContext } from '../../context/Brand.context';
import { AgencyContext } from '../../context/Agency.context';
import { RedemptionType } from '../../enums/enums';

export default function SidebarNav({mobileCheck, setMobileCheck}) {

    const history           = useHistory();
    const layout            = useContext(LayoutContext)
    const activePermission  = useContext(UserContext).activePermission
    const brand             = useContext(BrandContext);
    const agency            = useContext(AgencyContext);

    const [itemsSub, setItemsSub] = useState([])

    const items = [
        {
            link      : '/dashboard',
            logo      : SvgIcons.NavDashboardIcon,
            activelogo: SvgIcons.FillNavDashboardIcon,
            className : 'items middle pt_8',
            name      : 'Dashboard',
            subMenu   : false,
            unique    : 'home',
            access    : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)),
            children  : <DashboardChild mobileCheck= {mobileCheck} setMobileCheck={setMobileCheck}/>
        },
        {
            link       : '/audience',
            logo       : SvgIcons.NavAudienceIcon,
            activelogo : SvgIcons.NavAudienceFillIcon,
            className  : 'items middle pb_8',
            border     : true,
            name      : 'Audience',
            unique    : 'audience',
            subMenu   : false,
            access    : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)),
        },
        {
            link      : '/loyalty',
            logo      : SvgIcons.NavLoyatlyIcon,
            activelogo: SvgIcons.FillNavLoyalityIcon,
            className : ((brand.brandType === Brand.BrandTypes.NORMAL && !brand.subscription) || (brand.brandType === Brand.BrandTypes.NORMAL && brand.subscription && brand.subscription.status !== 'active')) ? 'items middle disabled pt_8' : 'items middle pt_8' ,
            name      : 'Loyalty Suite',
            subMenu   : true,
            unique    : 'loyalty',
            access    : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)) && (brand.brandType !== Brand.BrandTypes.SUB_BRAND),
            children  : <LoyaltyChild />
        },
        // {
        //     link      : brand.brandType === Brand.BrandTypes.NORMAL && '/deal',
        //     logo      : brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.DealIcon,
        //     activelogo: brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.FillNavDealIcon,
        //     className : ((brand.brandType === Brand.BrandTypes.NORMAL && !brand.subscription) || (brand.brandType === Brand.BrandTypes.NORMAL && brand.subscription && brand.subscription.status !== 'active')) ? 'items middle disabled' : 'items middle' ,
        //     name      : brand.brandType === Brand.BrandTypes.NORMAL && 'Deal',
        //     subMenu   : brand.brandType === Brand.BrandTypes.NORMAL && false,
        //     unique    : 'deal',
        //     access    : brand.brandType === Brand.BrandTypes.NORMAL && activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)) && (brand.brandType !== Brand.BrandTypes.SUB_BRAND),
        //     // children  : <LoyaltyChild />
        // },
        // {
            //     link      : brand.brandType === Brand.BrandTypes.NORMAL && '/giveaway',
        //     logo      : brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.GiveawayIcon,
        //     activelogo: brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.FillGiveawayIcon,
        //     className : brand.brandType === Brand.BrandTypes.NORMAL && 'items mt_8 middle' ,
        //     name      : brand.brandType === Brand.BrandTypes.NORMAL && 'Giveaway',
        //     subMenu   : brand.brandType === Brand.BrandTypes.NORMAL && false,
        //     access    : brand.brandType === Brand.BrandTypes.NORMAL && activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)) && (brand.brandType !== Brand.BrandTypes.SUB_BRAND),
        // },
        {
            link      : brand.brandType === Brand.BrandTypes.NORMAL && '/growthtools',
            logo      : brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.NavGrowthIcon,
            activelogo: brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.FillNavGrowthIcon,
            // className : brand.brandType === Brand.BrandTypes.NORMAL && 'items middle topMarg mt_8',
            className : ((brand.brandType === Brand.BrandTypes.NORMAL && !brand.subscription) || (brand.brandType === Brand.BrandTypes.NORMAL && brand.subscription && brand.subscription.status !== 'active')) ? 'items middle disabled pb_8 ' : 'items middle pb_8',
            border    : true,
            subMenu   : brand.brandType === Brand.BrandTypes.NORMAL && false,
            name      : brand.brandType === Brand.BrandTypes.NORMAL && 'Channels',
            unique    : 'growthtools',
            access    : brand.brandType === Brand.BrandTypes.NORMAL && activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)),
            children  : brand.brandType === Brand.BrandTypes.NORMAL && <GrowthToolChild mobileCheck= {mobileCheck} setMobileCheck={setMobileCheck}/>
        },

        // {
        //     link      : brand.brandType === Brand.BrandTypes.NORMAL && '/automation',
        //     logo      : brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.AutomationIcon,
        //     activelogo: brand.brandType === Brand.BrandTypes.NORMAL && SvgIcons.FilledAutomationIcon,
        //     className : ((brand.brandType === Brand.BrandTypes.NORMAL && !brand.subscription) || (brand.brandType === Brand.BrandTypes.NORMAL && brand.subscription && brand.subscription.status !== 'active')) ? 'items middle disabled' : 'items middle' ,
        //     // className : brand.brandType === Brand.BrandTypes.NORMAL && 'items mt_8 middle' ,
        //     name      : brand.brandType === Brand.BrandTypes.NORMAL && 'Automation',
        //     subMenu   : brand.brandType === Brand.BrandTypes.NORMAL && false,
        //     unique    : 'automation',
        //     access    : brand.brandType === Brand.BrandTypes.NORMAL && activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)),
        //     // children  : <LoyaltyChild />
        // },
        {
            link       : '/communication',
            logo       : SvgIcons.NavCommuncationIcon,
            activelogo : SvgIcons.FillNavCommunicationIcon,
            className  : ((brand.brandType === Brand.BrandTypes.NORMAL && !brand.subscription) || (brand.brandType === Brand.BrandTypes.NORMAL && brand.subscription && brand.subscription.status !== 'active') ) ? 'items middle disabled pt_8 pb_8' : 'items middle pt_8 pb_8',
            subMenu    : true,
            border     : true,
            name       : 'Communication',
            unique     : 'communication',
            access     : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)),
            children   : <CommunicationChild mobileCheck= {mobileCheck} setMobileCheck={setMobileCheck}/>
        },
        // {
        //     link      : '/walletscan',
        //     logo      : SvgIcons.WalletScanIcon,
        //     activelogo: SvgIcons.FillNavWalletScanIcon,
        //     // className : 'items middle topMarg mt_8' ,
        //     className : ((brand.brandType === Brand.BrandTypes.NORMAL && !brand.subscription) || (brand.brandType === Brand.BrandTypes.NORMAL && brand.subscription && brand.subscription.status !== 'active')) ? 'items middle disabled pt_8 pb_8' : 'items middle pt_8 pb_8' ,
        //     border    : true,
        //     subMenu   : true,
        //     name      : 'Wallet-Scan',
        //     unique    : 'walletscan',
        //     access    : activePermission.roles.some(role=>[User.Roles.ADMIN, User.Roles.MARKETER].includes(role)),
        //     // access    : activePermission.roles.some(role=>[User.Roles.ADMIN, User.Roles.MARKETER].includes(role) && ((brand.brandRedemptionType && brand.brandRedemptionType === RedemptionType.CASHIER) || (brand.brandType === Brand.BrandTypes.SHARED_LOYALITY) || (brand.brandType === Brand.BrandTypes.SUB_BRAND))),
        //     children  : <WalletScanChild />
        // },
        {
            link      : '/setting',
            logo      : SvgIcons.NavNewSettingIcon,
            activelogo: SvgIcons.FillNavSettingIcon,
            className : 'items middle pt_8',
            subMenu   : true,
            name      : 'Settings',
            unique    : 'setting',
            access    : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)),
            children  : <SettingChild mobileCheck= {mobileCheck} setMobileCheck={setMobileCheck}/>
        },
    ]

    // if(brand.brandType === Brand.BrandTypes.NORMAL){
    //     items.push(
    //         {
    //             link      : '/growthtools',
    //             logo      : SvgIcons.NavGrowthIcon,
    //             className : 'items middle topMarg mt_16',
    //             subMenu   : true,
    //             name      : 'Growth',
    //             access    : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)),
    //             children  : <GrowthToolChild mobileCheck= {mobileCheck} setMobileCheck={setMobileCheck}/>
    //         },
    //         {
    //             link      : '/inventory',
    //             logo      : SvgIcons.InventoryIcon,
    //             className : 'items mt_16 middle' ,
    //             name      : 'Inventory',
    //             subMenu   : true,
    //             access    : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)) && (brand.brandType !== Brand.BrandTypes.SUB_BRAND),
    //             // children  : <LoyaltyChild />
    //         },
    //         {
    //             link      : '/deal',
    //             logo      : SvgIcons.DealIcon,
    //             className : 'items mt_16 middle' ,
    //             name      : 'Deal',
    //             subMenu   : true,
    //             access    : activePermission.roles.some(role=>[User.Roles.ADMIN].includes(role)) && (brand.brandType !== Brand.BrandTypes.SUB_BRAND),
    //             // children  : <LoyaltyChild />
    //         },
    //     )

    // }

    const onLoad = () => {
        items.map((element,idx)=>((history.location.pathname.includes(element.link)) && setItemsSub(element.children)))
    }

    useEffect(onLoad, [])

    const handleClick = () => {
        setMobileCheck(!mobileCheck);
        layout.setLayout({expandedBar: false})
    }

    return (
        <div id="sidebar" >
            
                <PartialSideBar 
                    items       = {items}
                    setItemsSub = {setItemsSub}
                />
            
            {/* {  
                (window.screen.availWidth < 767) ?
                    <div className={(mobileCheck) ? '' : ''}> 
                        <SidebarSub 
                            items          = {(history.location.pathname.includes('profile')) ? <ProfileSettingChild/> : itemsSub}
                        />
                    </div>
                :
                    <div className={(layout.elements.expandedBar ? 'sideBarMain' : 'hideSubNav')}> 
                        <SidebarSub 
                            items          = {(history.location.pathname.includes('profile')) ? <ProfileSettingChild/> : itemsSub}
                        />
                    </div>
            } */}
        </div>
    )
}
