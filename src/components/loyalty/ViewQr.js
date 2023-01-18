import React, { useState } from 'react'

import ReactTooltip from 'react-tooltip';

import CustomModal from '../CustomModal';
import QRkjua from '../QR-kjua/qrcode.kjua';

import { SvgIcons } from '../../icons'
import { ColorSchemeCode } from '../../enums/ColorScheme';

function ViewQr({selectedCampaign, brand}) {

    const [show, setShow] = useState({
        qrCode : false,
    })

    const qrcode = {
        back: "#ffffff",
        borderRadius: "0",
        fill: "color(neutral90)",
        fontcolor: "#4F4F4F",
        label: selectedCampaign.campaignCode,
        mSize: "10",
        padding: "0",
        qrType: "iphone",
        rounded: "0",
        size: "350",
        text: 'https://walletly.web.app/&brandId='+selectedCampaign.brandId+'&brandName='+brand.brandName+'&brandLogo='+brand.brandLogo+'&campaignCode='+selectedCampaign.campaignCode
    }    

    return (
        <div id="LinkText">
            <div className="text-wraper">
                <div  onClick={()=>setShow({...show, qrCode : !show.qrCode})} id="qrToolTip" className="cp ml_8" data-for={'tooltipQr'} data-tip={'Qr Code'} ><SvgIcons.QrCodePreviewIcon color={ColorSchemeCode.neutral80} height={14} width={14}/></div>
            </div>
            {/* <ReactTooltip id="tooltipQr" /> */}
            <ReactTooltip backgroundColor={ColorSchemeCode.GeneralBlack} className="opacity-8 p_8 borderRadius-6" id="tooltipQr"/>
            {show.qrCode && <CustomModal minWidth="420px" component={<QrComponent qrcode={qrcode}/>} open={show.qrCode} onClose={()=>setShow({...show, qrCode : false})}/>}
        </div>
    )
}

const QrComponent = ({qrcode}) => {
    return(
        <div className="middle">
            <QRkjua qrcode={qrcode}/>
        </div>
    )
}

export default ViewQr
