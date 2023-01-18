import React from 'react';
import SvgIcons from '../icons/svg.icon'
import DropdownSelect from './DropdownSelect';

export default function TableList() {

    const options = [];


    return (
        <div className="firstRowList">
            <div className="container"> 
                <div className="row">
                    <div className="col">
                        <SvgIcons.QrCodeIcon width="24" height="24"/>
                    </div>

                    <div className="col">
                        hello
                    </div>

                    <div className="col dropdown">
                        <DropdownSelect/>     
                    </div>

                    <div className="col">

                    </div>

                </div>
            </div>
        </div>
    )
}
