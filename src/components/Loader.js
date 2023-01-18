import React, { useContext } from 'react'
import { AgencyContext } from '../context/Agency.context'
import { enums } from '../enums'
import { PngIcons, SvgIcons } from '../icons'

function Loader({width, baseWidth, height, baseHeight, className}) {
    const agency = useContext(AgencyContext)

    setTimeout(()=>{
    },10000)

    return (
        <div className={className ? className : "position-relative loaderOuterPage"} style={{height: baseHeight || '100vh', width: baseWidth || '100%'}}>
            <div className="absoluteMiddle">
                {/* {<img src={PngIcons.newLoader} width={40} height={40} />} */}
                <img src={agency && agency.loader ? agency.loader : PngIcons.newLoader} width={80} height={80} />
            </div>
        </div> 
    )
}

export default Loader
