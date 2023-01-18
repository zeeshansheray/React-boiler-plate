import { useEffect } from "react";

export default function QRkjua({qrcode}){

    useEffect(()=>{
        const defaultOptions = {
            render     : 'canvas',
            crisp      : 'true',
            ecLevel    : 'H',
            minVersion : ('1'),
            text       : '',
            rounded    : '100',
            quiet      : '1',
            mode       : ('label'),
            mSize      : 20,
            mPosX      : 50,
            mPosY      : 50,
            label      : 'label',
            fontname   : 'Ubuntu Mono',
            fontcolor  : '#4F4F4F',
        }

        const container = document.getElementById('container')
        container.children[0] && container.removeChild(container.children[0])

        container.appendChild(window.kjua({...defaultOptions, ...qrcode}))
    }, [qrcode])


    return (
        <div id="qrcode" className="outerBox" style={{borderRadius : qrcode.borderRadius, padding : qrcode.padding , backgroundColor : qrcode.back}}>
            <div id="container"></div>
        </div>
    )
}