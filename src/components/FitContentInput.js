import React, { useState, useContext } from 'react'
import { ColorSchemeCode } from '../enums/ColorScheme'
import { SvgIcons } from '../icons'

import { ClickOutside, utils } from '../utils'
import CustomTextField from './CustomTextField'
import { AgencyContext } from '../context/Agency.context';


function FitContentInput({className, placeholder, border, onFocus, onClick, onChange, value, icon = {}, setEditStatus}) {
    const [edit, setEdit]          = useState(false)
    const [boxShadow,setBoxShadow] = useState();
    const agency                   = useContext(AgencyContext)

    const handleChange = (e) => {
        // utils.setCarretPosition(e.target)
        // onChange(e.target.innerText)
        // console.log('e.target.value', e.target.innerText);
        onChange(e.target.value);
    }

    setEditStatus && setEditStatus(edit)

    const EditStatus = () => {
        setEdit(true)
        onClick()
        // utils.setCarretPosition(document.getElementById('edit-content'))
    }

    React.useEffect(() => {
        const color = utils.hexTohsl(agency.agencyColor)
        setBoxShadow("0px 0px 0px 4px hsl("+color.h+","+color.s+"%,"+color.l+"%,"+0.1+")")
    }, [])

    return (
        <div id="FitContentInput" className="w-100">
            <ClickOutside onClick={()=>setEdit(false)}>
                <div className="d-flex justify-content-center fs-11 w-100" 
                onClick={EditStatus}
                >
                    {/* <div 
                        id                             = {'edit-content'}
                        className                      = {`mt_1 ${className} ${edit && 'bottom-border'}`}
                        suppressContentEditableWarning = {true}
                        contentEditable                = {edit}
                        tabIndex                       = "-1"
                        onInput                        = {handleChange}
                        onFocus                        = {onFocus}
                    >{value}</div> */}
                    <input 
                        // id                             = {'edit-content'}
                         className                      = {`ml_4 mt_1 w-100 fs-18 fitContentInputField ${className}` }
                        // suppressContentEditableWarning = {true}
                        style = {{
                            boxShadow : !border && edit && boxShadow, 
                            outline : !border && edit && agency.agencyColor && '1px solid ' + agency.agencyColor
                        }}
                        // contentEditable                = {edit}
                        // tabIndex                       = "-1"
                        border                         = {!border && !edit && '1px solid ' + ColorSchemeCode.white}
                        onClick                        = {EditStatus}
                        onChange                       = {handleChange}
                        placeholder                    = {placeholder ? placeholder : "Notification Title"}
                        // onFocus                     = {onFocus}
                        value                          = {value}
                    />
                    
                    {/* <div className={icon.class + ' ml_4 pt_8'} >
                        <SvgIcons.EditIcon 
                            height    = {icon.width}
                            width     = {icon.heigth}
                            color     = {icon.color}
                        />
                    </div>  */}
                </div>
            </ClickOutside>
        </div>
    )
}

export default FitContentInput
