import React, { useContext } from 'react'
import { AgencyContext } from '../../context/Agency.context';

import { enums } from '../../enums';
import { PngIcons } from '../../icons';

export default function CheckOutScreen({state, setState, formik}) {

    const agency = useContext(AgencyContext)
    const redemptionTypes = [
        {
            name      : 'In Person',
            image     : PngIcons.selfRedemption,
            detail    : 'In Person, best suited for business, like to have better control in issuing  points. Use Web Application to issue points, this required business to scan every customer upon check out.',
            value     : enums.RedemptionType.CASHIER,
            className : agency&&agency.agencyUse&&agency.agencyUse==='partner' && 'disabled'
        },
        {
            name      : 'Remote Points',
            image     : PngIcons.cashierRedemption,
            detail    : 'Remote Points, best suited for business like to have less effort in managing points and looking for automated way. Customer can earn points by them self, no applications are required, minimal time required to go up and running.',
            value     : enums.RedemptionType.SELF,
            className : agency&&agency.agencyUse&&agency.agencyUse==='partner' && 'disabled'
        },
        {
            name  : 'Ordering System',
            image : PngIcons.orderRedemption,
            detail: 'Ordering system integration allows to extremely seamless experience for business owners.',
            value : enums.RedemptionType.ORDER,
        }
    ]

    return (
        <div className="row ml_0 mr_0" id="checkoutScreen">
            <div>
                <div>
                    <div className="Heading20M color-neutral100 text-left w-100">
                        Select Checkout Type that’s right for you
                    </div>
                    {/* <div className="Link14M text-left mt_4 d-flex">
                        <div className="color-redColorButton">Please note:</div>
                        <span className="color-neutral60">&nbsp; You cannot change checkout type once you have setup your account.</span>
                    </div> */}
                </div>
                <div className="d-flex flex-column space-between w-100 mb_56">
                        {
                            redemptionTypes.map((checkout, idx)=>
                                <div className={`mt_24 checkoutType ${checkout.className} ${checkout.value == formik.values.brandRedemptionType && 'activeCheckout '}`} key={idx} onClick={()=>formik.setValues({...formik.values, brandRedemptionType : checkout.value })}>
                                    {/* <img className="redemptionImage" src={checkout.image} alt="" /> */}
                                    <div className="">
                                        <div className="Link14M text-left color-neutral100">
                                            {checkout.name}
                                        </div>
                                        <div className="Body14R text-left color-neutral60 mt_8">
                                            {checkout.detail}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                </div>
            </div>
        </div>
    )
}
