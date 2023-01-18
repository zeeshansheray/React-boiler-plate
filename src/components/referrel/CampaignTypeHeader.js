import React from 'react';

import CustomDropdown from '../DropdownSelect';
import CustomButton from '../CustomButton';

import {ColorScheme, enums} from '../../enums'

export default function CampaignTypeHeader(props) {

    return (
        <div id="referralHeader">
            <div className="row">

                    <div className="col-6 text-left">
                        
                        <CustomDropdown className='campaignDropdown' fields={props.campaigns} padding={'10px'}/>
                    
                    </div>
                    

                    <div className="col-6">
                        <div className="row float-right">
                            
                            <CustomButton 
                                borderRadius={12} 
                                // height={45} 
                                className="InstallButton fs-14 mt_10" 
                                color={ColorScheme.ColorSchemeCode.white} 
                                btntext="View How To Install"
                            />
                            
                            <CustomDropdown 
                                className="campaignActions" 
                                fields={props.campaignActions} 
                                padding={'10px'}
                            />
                        
                        </div>               
                    </div>

            </div>
        </div>
    )
}
