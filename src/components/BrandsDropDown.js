import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import localforage, * as localForage from 'localforage'

import CustomButton from './CustomButton';

import SvgIcons from '../icons/svg.icon'
import {ColorSchemeCode} from '../enums/ColorScheme'; 
import { BrandContext } from '../context/Brand.context';
import { utils } from '../utils';
import { BrandService, UserService } from '../services';
import { UserContext } from '../context/User.context';
import { User } from '../enums';
import { AgencyContext } from '../context/Agency.context';
import Loader from './Loader';


export default function BrandsDropDown({showBrands}) {

    const brand               = useContext(BrandContext)
    const user                = useContext(UserContext)
    const agency              = useContext(AgencyContext)
    const [brands, setBrands] = useState([])
    const [loader, setLoader] = useState(false)

    const onLoad = async () => {
        setLoader(true)
        let brands;
        brands = await localforage.getItem('brandsdropdown');
        if(!brands)
        {
            brands = [];
            const permissions = await localForage.getItem('permissions')
            const getBrand = await BrandService.Get({query: {delete: false}})
            for (const permission of permissions) {
                if(agency.whiteLabel){
                    let currentbrand;
                    for (const element of getBrand.response.data) {
                        if(element._id === permission.businessId) currentbrand = element
                    }
                    if(currentbrand && currentbrand.agency && currentbrand.agency.id === agency._id)
                    brands.push({
                        brandName : permission.brandName,
                        brandLogo : permission.logo,
                        brandId   : permission.businessId
                    })
                }
                else{
                    let currentbrand;
                    for (const element of getBrand.response.data) {
                        if(element._id === permission.businessId) currentbrand = element
                    }
                    if(!currentbrand.agency) 
                    brands.push({
                        brandName : permission.brandName,
                        brandLogo : permission.logo,
                        brandId   : permission.businessId
                    })
                }
            }
            localforage.setItem('brandsdropdown', brands);
            setBrands(brands)
            setLoader(false)
        }
        else 
        {
            setBrands(brands)
            setLoader(false)
        }
    }

    useEffect(onLoad, [])

    const handleBrandChange = async (e, brandId) => {
        // // empty current brand
        // brand.updateBrand({brandLogo: ''})
        showBrands();


        localForage.removeItem('allLoyalityCampaigns')
        localForage.removeItem('campaign')
        localForage.removeItem('customers')
        localForage.removeItem('totalcustomers')
        localForage.removeItem('audiencePasses')
        localForage.removeItem('audienceTransactions')
        localForage.removeItem('customersAudience')
        localForage.removeItem('notifications')
        localForage.removeItem('growthTools')
        localForage.removeItem('reports')
        localForage.removeItem('selectedLoyalityCampaign')
        localForage.removeItem('selectedLoyalityEarningWays')
        localForage.removeItem('subBrands')
        localForage.removeItem('tiers')
        localForage.removeItem('deals')
        localForage.removeItem('deal')
        localForage.removeItem('email')
        localForage.removeItem('brand')
        localForage.removeItem('flow')
        localForage.removeItem('inventory')
        localForage.removeItem('totalPoints')
        localForage.removeItem('totalRevenue')
        localForage.removeItem('totalPasses')
        

        
        
        // update user locally
        const permissions = await localForage.getItem('permissions')
        user.updateUser({activeBrand: brandId}, permissions)
        
        const query = {_id: brandId, delete: false}
        const {error, response} = await BrandService.Get({query})
        brand.updateBrand(response.data[0])
        
        
        // update user database
        const payload = {_id: user._id, activeBrand: brandId}
        await UserService.Update({payload})
        
        window.location.reload();
    }

    return (
        <div id="brandDropdown" >
            <div id="dropdownItem" className="row dropdownItem-lg">
                
                    <div><img src={brand.brandLogo} width='28px' height='28px' alt="" className="borderRadius-40 border-sm" /></div>
                    <div className='ml_8 Link14M color-neutral100'>{brand.brandName}</div>
                
            </div>
            <div className="row">
            {user.activePermission.roles.includes(User.Roles.ADMIN) &&<div className="col-md-12 pl_0 pr_0 cp hoverstate" onClick={()=>window.open('/brand', '_blank')} style={{boxShadow: '0px 1px 0px #DFE1E6'}}>
                <div className='d-flex pl_24 pr_24 pt_12 pb_12 align-items-center'>
                    <div><SvgIcons.IconPlus /></div>
                    <div className='ml_8 Body14R color-neutral100'>{"Add New Brand"}</div>
                </div>
                {/* <div className="bar position-unset"></div> */}
            </div>}
                {
                    loader ? <Loader baseHeight="20vh" width={180} height={180}/> : 
                    <div className="allBrands col-md-12 pl_0 pr_0">
                        <div className="pb_8 mt_12">
                            <Link className="text-dec-none">
                                <span className={"Caption12M color-neutral60 mt_10 mb_10 ml_24"} >YOUR BRANDS</span>
                            </Link>
                        </div>
                        {brands && brands.length > 0 && brands.map((value, idx)=>(
                            <>
                                {brand._id != value.brandId && <Link className="text-dec-none hoverstate" to={'/'+value.brandId}  onClick={(e)=>handleBrandChange(e, value.brandId)}>
                                    <div key={idx} className="singleBrand d-flex cp pt_12 pb_12 pl_24 pr_24">
                                        {   value.brandLogo ?
                                            <img src={value.brandLogo} width={20} height={20} className="borderRadius-40 align-self" style={{boxShadow: '0px 0px 0px 1px #DFE1E6'}} alt=""></img> :
                                            utils.getAvatar({firstName: value.brandName, width: '20px', heigth: '20px'})
                                        }
                                        <div className="Body14R color-neutral100 ml_8">
                                            {utils.capitalizeAll(value.brandName)}
                                        </div>
                                    </div>
                                </Link>}
                            </>
                        ))}
                        </div>  
                }
            </div>
        </div>
    )
}
