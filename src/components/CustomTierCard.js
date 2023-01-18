import React, { useContext } from 'react'
import { AgencyContext } from '../context/Agency.context';
import { ColorSchemeCode } from '../enums/ColorScheme';
import CustomButton from './CustomButton';

export default function CustomTierCard(props) {

    const handleClickPush = (membership) => {
        let array = [];
        array.push(membership);
        props.setMembershipName(array);
        props.setOpenMembership(true);
    }

    const agency = useContext(AgencyContext)

    return (
       <div id="tierCard">
             {
                props.details.map((item, index)=>
                <div className="card">
                    <div className="col-12 text-center">
                         <img src={item.icon} width={'68px'} height={'100px'} alt="" />     
                    </div>
                    <div className="col-12 text-center color-textfieldColor fw-6 mt_24">
                            {item.name}
                    </div>
                    {item.content.map((value)=>
                        <div className="col-12 d-flex space-between mt_16">
                            <div className="color-c828282 text-left">
                                {value.pointname}
                            </div>
                            <div className="text-right color-textfieldColor fs-16 fw-4">
                                {value.points}
                            </div>
                        </div>
                    )}
                    
                    {   props.text ?
                        <>
                        <div className="bar mt_10"></div>
                        <div className="text-center mt_5 pl_20 pr_20">
                               {props.text}
                        </div>
                        </>
                        :
                        <div className="customButton col-12 text-center mt_24">
                            <CustomButton
                              width           = "30px"
                            //   height          = "16px"
                              btntext         = "Edit"
                              color           = {agency.agencyColor}
                              backgroundColor = {ColorSchemeCode.white}
                              hover           = {ColorSchemeCode.white}
                              border          = {0}
                              fontSize        = {'16px'}
                              onFocus         = {false}
                              onClick         = {()=>handleClickPush(item)}
                            />
                        </div>
                    }
             </div>
            )}
       </div>
    )
}
