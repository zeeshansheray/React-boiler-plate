import React from 'react'

import LinkForm from './LinkForm';
import CopyText from '../CopyText';
import ViewQr from './ViewQr';
import { ColorSchemeCode } from '../../enums/ColorScheme';
export default function CampaignFunctions({selectedCampaign, brand}) {
    return (
        <div id="CampaignFunctions" className="w-fit-content">
            <div className="ml_auto bg-color-widgetNavBackgroundColor borderRadius-20  d-flex  px-4 py-2 h-fit-content borderSet"> 
                <div className="Body14R fw-5 opacity-10 color-textfieldColor d-flex">
                    Campaign Code :
                    <span className = "Body14R ml_5 color-c828282 opacity-10">
                        <CopyText content={selectedCampaign.campaignCode} />
                    </span> 
                    <LinkForm selectedCampaign={selectedCampaign}/>
                    <ViewQr selectedCampaign={selectedCampaign} brand={brand}/>
                </div>
            </div>
        </div>
    )
}