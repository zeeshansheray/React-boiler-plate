import React from 'react'

import {enums, PassDesign} from '../../enums'
import {PngIcons, SvgIcons} from '../../icons'
import CustomButton from '../CustomButton'
import CheckOutScreen from './CheckoutScreen'
import { Brand} from '../../enums';


export default function LoyaltySelectionScreen({formik, state, setActivePage, index}) {


    const cardTypes = [
        {
            name  : 'Loyalty Points',
            icon  : <SvgIcons.LoyaltyIcon/>,
            detail: 'Loyalty points work well for merchants with a wide product range and a considerable',
            value : PassDesign.PassTypes.LOYALTY_CARD,
            disabled: false,
        },
        {
            name    : 'Stamp Card',
            icon    : <SvgIcons.StampCardIcon/>,
            detail  : 'When the customer collects a specific number of stamps, they are eligible for a reward.',
            value   : PassDesign.PassTypes.STAMP_CARD,
            disabled: true,
        },
    ]

    return (
        <div id="LoyaltySelectionScreen" className="animationComponent">
             <div className="d-flex bg-color-cF7F7F7 h-100" >
                <div className="leftBox">

                    {formik.values.brandType != Brand.BrandTypes.SHARED_LOYALITY && <CheckOutScreen formik={formik} state={state} setActivePage={setActivePage} index={index} />}
                    
                    {/* <div className="mb_200">
                        <div className="Heading20M color-neutral100">
                            Select Checkout Type that’s right for you
                        </div>
                        <div className="d-flex flex-column">
                            {cardTypes.map((card, idx)=>
                            <div onClick={()=>formik.setValues({...formik.values, checkoutType : card.value })} className={`loyaltyTypeBox mt_24 cp ${card.disabled && 'disabled'} ${card.value == formik.values.checkoutType && 'activeCheckout'}`}>
                                {card.icon}
                                <div className="Heading16M color-neutral100 mt_16">
                                    {card.name}
                                </div>
                                <div className="color-neutral60 Body14R mt_8">
                                    {card.detail}
                                </div>
                                <div className="Link13M color-themeColor mt_8">
                                    Learn More
                                </div>
                            </div>)}
                        </div>
                    </div> */}
                </div>
                    <div className="rightSideBox">
                        <div className="logoPreviewBox position-relative">
                            {formik.values.brandType != Brand.BrandTypes.SHARED_LOYALITY && <div className="Link14M color-neutral100">
                                Checkout Type preview:
                            </div>}
                            {formik.values.brandType != Brand.BrandTypes.SHARED_LOYALITY ? <img src={formik.values.brandRedemptionType == enums.RedemptionType.SELF ? PngIcons.cashierRedemption : formik.values.brandRedemptionType == enums.RedemptionType.CASHIER ? PngIcons.selfRedemption : PngIcons.orderRedemption} style={{position: 'absolute', bottom:'16px', left:'0px'}}  height="auto" width="100%" />

                            :

                            <div className="middle h-100">
                                <SvgIcons.ImageDropIcon />
                                <div className="color-neutral100 Heading16M mt_8">
                                    No Preview Available
                                </div>
                            </div>
                            
                            }

                        </div>
                    </div>
                </div>
        </div>
    )
}
