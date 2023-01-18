import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';

import ReactTooltip from 'react-tooltip';
import { BrandContext } from '../../context/Brand.context';
import { ColorSchemeCode } from '../../enums/ColorScheme';

import { SvgIcons } from '../../icons'

function LinkForm({selectedCampaign}) {

    const [tooltipText, setTooltipText] = useState('Form')
    const history = useHistory();
    const brand = useContext(BrandContext)
    const goToLandingForm = () => {
        // history.push({
        //     pathname : window.location.origin+'/page/default/'+selectedCampaign._id,
        //     state    : brand 
        // })
        window.open(`${window.location.origin}/page/default/${selectedCampaign._id}/${brand._id}`)
    }

    return (
        <div id="QrPreview">
            <div className="text-wraper">
                <div onClick={goToLandingForm} id="formToolTip" className="cp ml_8" data-for={'tooltipForm'} data-tip={tooltipText} ><SvgIcons.Link color={ColorSchemeCode.neutral80} height={15} width={15} /></div>
            </div>
            {/* <ReactTooltip id="tooltipForm" getContent={()=>tooltipText} /> */}
            <ReactTooltip backgroundColor={ColorSchemeCode.GeneralBlack} className="opacity-8 p_8 borderRadius-6" id="tooltipForm" getContent={()=>tooltipText}/>
        </div>
    )
}

export default LinkForm
