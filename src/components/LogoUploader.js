import { ColorSchemeCode } from "../enums/ColorScheme";
import CustomButton from "./CustomButton";
import SvgIcons from '../icons/svg.icon';

export default function LogoUploader({label, size, btnName, htmlFor, hint, src, error, className, btntext, onChange, ...props}) {
    return(
        <div className={`${className} col-6 col-md-12`}>
            <div className="color-neutral100 Heading16M">{props.displayLabel || label}</div>
            <div className="Body14R color-neutral60">{props.caption}</div>
            <div className="mt_16 d-flex">
                {
                    src && !error ?
                    <div className="imageUploadBox middle">
                        {label == 'Deal Cover' ?
                        <div className="dealOutlineBox">
                            <img 
                                src       = {src}
                                className = {'dealCover'} 
                                alt       = "dealCover"
                                height    = {100}
                                width     = {100}
                            />
                            <div className="mt_8 belowBar w-40"></div>
                            <div className="mt_2 belowBar w-100"></div>
                        </div>
                        :
                        label != 'Brand Cover' ? 
                            <img 
                                src       = {src}
                                style     = {{borderRadius : '50%'}} 
                                width     = {108}
                                height    = {108}
                                alt       = "logo"
                            />
                        :
                        
                        <img 
                            src       = {src}
                            className = {'imageCover'} 
                            alt       = "cover"
                        />
                    }
                    </div> :
                    <div className="imageUploadBox middle">
                        {(label == 'Deal Cover' || label == "Item Image")  ? 
                                <div className="dealOutlineBox">
                                <div className="dealCover bg-color-ButtonSecondaryBG"></div>
                                <div className="mt_8 belowBar w-40"></div>
                                <div className="mt_2 belowBar w-100"></div>
                            </div>
                            :
                            label == 'Brand Cover' ? 

                            <div className="bg-color-ButtonSecondaryBG" style={{width: '100%', height: '100%'}}></div>
                            :
                            
                            <div className="bg-color-ButtonSecondaryBG border" style={{width: '108px', height: '108px', borderRadius : '50%'}}></div>
                        }
                    </div>
                }
                <div className="ml_16">
                    <div className="Link13R color-neutral80">
                        {hint ? hint : 'Upload a 32 x 32 pixel ICO, PNG, GIF, or JPG to display in browser tabs.'}
                    </div>
                    <CustomButton 
                        btntext      = {<label  htmlFor={htmlFor || "logoUpload"} className="mb_0 fw-5 fs-14 cp">{btnName||"Change"}</label>}
                        className    = "mt_8"
                        size         = {size&&size}
                        varient      = "tertiary"
                        borderRadius = {"8px"}
                    /> 
                    {error && <div className="mx-auto error">{error}</div>}
                    <input
                        id       = {htmlFor || "logoUpload"}
                        style    = {{display:'none'}}
                        type     = "file"
                        onChange = {onChange}
                    />
                </div>
            </div> 
        </div>
    )
}