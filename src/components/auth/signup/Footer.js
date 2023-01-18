import { CircularProgress } from '@material-ui/core';
import React, {useState} from 'react'
import { Brand } from '../../../enums';
import { BrandService } from '../../../services';
import { showToaster } from '../../../utils/utils';
import CustomButton from '../../CustomButton'

export default function Footer({state, formik, handleSubmit, setState, setActivePage, index }) {

    const [brandNameError, setBrandNameError]         = useState('')
    const [loader, setLoader]                         = useState(false);
    const [show, setShow]                             = useState(false)
    const [brandDetailError, setBrandDetailError]     = useState(true);
    const [brandLocationError, setBrandLocationError] = useState(true);

    
    console.log('index is ', index);

    const handleNext = async() => {
        console.log('I m clicked')
        // if(index == 1){
        //     setBrandNameError('')
        //     setLoader(true)
        //     const query = { brandName: formik.values.brandName , delete: false}

        //     const { error, response } = await BrandService.Get({query})
        //     setLoader(false)
        //     if(response){
        //         console.log('response ', response);
        //         showToaster({
        //             position : 'top-right',
        //             title    : 'Brand Name Already Exist',
        //             message  : 'Brand Name Already Exist',
        //             severity : 'error'
        //         })
        //         return setBrandNameError('Name already exist')
        //     }
        //     else{
        //         setActivePage(index,'next')
        //         console.log('else is working ');
        //     }
        //     setShow(false)
        // }
        // else{

            if(index == 1 && !brandNameError && brandLocationError) {
                setState({...state, locationShow : true})
            }

            else if(!brandLocationError && !brandNameError){
                setActivePage(index,'next')
            }
        // }
    }

    React.useEffect(() => {
        console.log('formik.values ', formik.values);
        if(formik.values.brandName == "" || formik.values.phone == "" || formik.errors.brandName || formik.errors.businessService || formik.errors.description || formik.errors.brandLogoFile ) setBrandDetailError(true)
        else {
            setBrandDetailError(false);
        }

        if(formik.errors.location) setBrandLocationError(true)
        else setBrandLocationError(false)
        
 

    }, [formik.values, formik.errors])

    const prevScreen = () =>{
        setTimeout(()=>{setActivePage(index,'prev')},500)
    }


    return (
        <div id="onBoardFooter">
                 <div className="d-flex bottomBarBox justify-flex-end">
                    {/* <div className="progressBar" >
                        <div className="bar" style={{width: state.width+'%', height:'100%'}}></div>
                    </div> */}
                    <div className="d-flex">
                        {index > 0 && 
                        <CustomButton
                            btntext   = {'Back'}
                            varient   = {"tertiary"}
                            className = "mr_16"
                            onClick   = {prevScreen}
                            height    = {'44px'}
                        />}

                        <CustomButton 
                            btntext  = {(index !=1 || formik.values.location == "") ?  "Next" : 'Submit'}
                            onClick  = {(index !=1 || formik.values.location == "") ? handleNext : handleSubmit}
                            disabled = {(index == 1 && brandDetailError) ? true : index == 1 && !formik.errors.location && !state.locationShow ? false : index == 1 && formik.errors.location && state.locationShow ? true : false }
                            icon     = {state.loader && index==1 && <CircularProgress size={16} color={'inherit'}/>}
                            height   = {'44px'}
                            
                        />
                    
                    </div> 
                    
                    
                </div>
        </div>
    )
}
