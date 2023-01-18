import React from 'react';

import PngIcons from '../icons/png.icon';
import SvgIcons from '../icons/svg.icon';
import { utils } from '../utils';
import CustomButton from './CustomButton';

export default function Notfound() {
    return (
        <div className="Notfound">
            <div className="col-12 text-center mt_30">
                 <img src={PngIcons.NotfoundImg} alt="" width="350" height="330"/>
            </div>
            <div className="col-12 headline2 text-center">
                 Brand Not Found
            </div>
            <div className="col-12 text-center headline4 fw-4 mt_8">
                 The page has been removed or its address has been changed. 
            </div>
            <div className="backtoLoginBtn mt_32 col-12 text-center fw-5">
                    <CustomButton
                      btntext  = "Back to Login"
                      width    = "228px"
                    //   height   = "48px"
                      fontSize = {"14px"}
                      icon     = { <SvgIcons.BackIcon color="white"/>}
                      onClick  = {utils.Logout}
                    />
            </div>
        </div>
    )
}
