import * as React from 'react';
import { QRCode } from 'react-qrcode-logo';
import { ColorSchemeCode } from '../enums/ColorScheme';

export default function QrCode({qrcode}) {
    return(
        <div>
            <QRCode
                value     = {qrcode.text}
                eyeRadius = {[
                    { // top/left eye
                        outer: [10, 10, 0, 10],
                        inner: [10, 10, 0, 10],
                    },
                    [10, 10, 10, 0], // top/right eye
                    [10, 0, 10, 10], // bottom/left
                ]}
                qrStyle    = "dots"
                logoWidth  = {80}
                logoHeight = {80}
                size       = {qrcode.size ? qrcode.size : 250}
                ecLevel    = "H"
                fgColor    = {ColorSchemeCode.Heading}
                enableCORS = {true}
                logoImage  = {qrcode.logo}
            />
        </div> 
    )
}