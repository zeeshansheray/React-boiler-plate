import React,{useState, useEffect, useContext} from 'react'

import CircularProgress from '@material-ui/core/CircularProgress';

import { Options, utils } from '../../../utils';

import CustomButton from '../../../components/CustomButton';
import CustomTextField from '../../CustomTextField';
import CustomSelect from '../../CustomSelect';
import CustomCheckBox from '../../CustomCheckBox';
import { FormControl, FormGroup, FormHelperText } from '@material-ui/core';
import { ColorSchemeCode } from '../../../enums/ColorScheme';
import { AgencyContext } from '../../../context/Agency.context';

export default function StepTwoSignup({state, setState, formik}) {

    const agency = useContext(AgencyContext)


    const [otherJob, setOtherJob]                     = useState(false);
    const [walletlyReferences, setWalletlyReferences] = useState({
        'Mentioned in an industry or topic FB group'           : false,
        'Instagram, Linkdln, Twitter, other social'            : false,
        'Mentioned on a forum (Reddit, Quora, etc)'            : false,
        'Google Search'                                        : false,
        'At a conference'                                      : false,
        'On a different bausiness chatbot'                     : false,
        'A friend or collegue'                                 : false,
        'A marketing or industry expert (blog,video, podcast)' : false,
        'An advertisement'                                     : false,
        'My marketing agency or consultant'                    : false,
        'Other'                                                : false
    })

    const jobTypes = [
        'In-House Marketer In A Company',
        'Solopreneur',
        'Marketing Agency',
        'Business Owner',
        'Independant Marketing Consultant',
        'Other'
    ]

    const CompanyPeople = [
        '1-5',
        '6-10',
        '11-25',
        '26-50',
        '51-500',
        '201-500',
        '500+'
    ]

    const userExperience = [
        'Beginner: I am just saying',
        'Basic: Email Campaigns & Automate Funnels',
        'Advance: Zapier, Intergromat or API Integrations'
    ]

    const handleJobDescription = (value) => {
        if(value !== 'Other'){
            setOtherJob(false)
            formik.setValues({...formik.values, jobDescription: value})
        } else setOtherJob(true)
    }

    const handleWalletlyReferences = ([key, value]) => setWalletlyReferences({...walletlyReferences, [key]: !value})

    const setFormikWalletlyReferences = () => {
        const references = Object.keys(walletlyReferences).filter(key => walletlyReferences[key] )
        formik.setValues({...formik.values, walletlyReferences: references})
    }
    
    // eslint-disable-next-line
    useEffect(setFormikWalletlyReferences, [walletlyReferences])

    return (
        <div className="row" id="stepOne">
            <div className="stepCount">Step 2 of 2</div>
            <div className="contents mt_10 text-center">
                <div className="text-left col-12">
                
                    <div className="subtitle1 fs-16">
                        What is your phone number?
                    </div>
                    <div className="mt_10 row">
                        <div className="col-4 pr_0">
                            <CustomSelect 
                                className  = "w-100"
                                options    = {Options.getContryCodes()}
                                name       = "dialingCode"
                                label      = {'Dialing Code'} 
                                value      = {formik.values.dialingCode}
                                onChange   = {(e) => {formik.setValues({...formik.values, dialingCode : e.target.value})}}
                                error      = {formik.touched.dialingCode && formik.errors.dialingCode}
                                helperText = {formik.errors.dialingCode && formik.errors.dialingCode}
                            />
                        </div>
                        <div className="col-8">
                            <CustomTextField 
                                className   = "col-12"
                                type        = "tel"
                                placeholder = "Phone Number"
                                name        = "phone"
                                borer       = {"1px solid " + ColorSchemeCode.borderColor }
                                value       = {formik.values.phone}
                                onChange    = {formik.handleChange}
                                inputProps  = {{ onFocus: formik.handleBlur }}
                                error       = {formik.touched.phone && formik.errors.phone}
                                helperText  = {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
                            />
                        </div>
                    </div>
                    
                    <div className="subtitle1 fs-16 mt_48">
                        What best describes your job?
                    </div>
                    <div className="mt_10">
                        {jobTypes.map((value,index)=>
                            <div className="fw-4 text-center" key={index}>
                                <button
                                    type      = "button"
                                    className = {value === formik.values.jobDescription ? 'singleJobType col-12 active' : 'singleJobType col-12'}
                                    onClick   = {() => handleJobDescription(value)}
                                >
                                    {value}
                                </button> 
                            </div>
                        )}
                        {
                            otherJob && 
                            <CustomTextField 
                                className   = "col-12 mt_0"
                                placeholder = "Enter Job Type"
                                name        = "jobDescription"
                                value       = {formik.values.jobDescription}
                                onChange    = {formik.handleChange}
                                inputProps  = {{ onFocus: formik.handleBlur }}
                                error       = {formik.touched.jobDescription && formik.errors.jobDescription}
                                helperText  = {formik.touched.jobDescription && formik.errors.jobDescription ? formik.errors.jobDescription : ''}
                            />
                        }
                    </div>
                        
                    <div className="subtitle1 fs-16 mt_48">
                        How many people work at your company
                    </div>
                    <div className="singleCompnayBox mt_10">
                        {CompanyPeople.map((value,index)=>
                            <div className="fw-4 text-center" key={index}>
                                <button 
                                    type      = "button"
                                    className = {value === formik.values.companyStrength ? 'singleCompanyPeople col-12 active' : 'singleCompanyPeople col-12'}
                                    onClick   = {() => formik.setValues({...formik.values, companyStrength: value})}
                                >
                                    {value}
                                </button> 
                            </div>
                        )}
                    </div>
                        
                    <div className="subtitle1 fs-16 mt_48">
                        What best describes your experience with setting up marketing campaigns?
                    </div>
                    <div className="mt_10">
                        {userExperience.map((value,index)=>
                            <div className="experienceBox fw-4 text-center" key={index}>
                                <button 
                                    type      = "button"
                                    className = {value === formik.values.experience ? 'singleExperience col-12 active' : 'singleExperience col-12'}
                                    onClick   = {() => formik.setValues({...formik.values, experience: value})}
                                >
                                    {value}
                                </button> 
                            </div>
                        )}
                    </div>

                    <div className="subtitle1 fs-16 mt_48">
                      {  'How did you hear about ' + (agency.agencyName ? utils.capitalizeAll(agency.agencyName) : 'walletly') }
                    </div>
                    <FormControl error={formik.touched.walletlyReferences && formik.errors.walletlyReferences}>
                        <FormGroup>
                            {Object.entries(walletlyReferences).map(([key, value]) => (
                                <CustomCheckBox 
                                    value={value}
                                    label={key}
                                    onChange={() => handleWalletlyReferences([key, value])}
                                />
                            ))}
                        </FormGroup>
                        <FormHelperText>{formik.touched.walletlyReferences && formik.errors.walletlyReferences ? formik.errors.walletlyReferences : ''}</FormHelperText>
                    </FormControl>
                
                    <div className="col-12">
                        <CustomButton 
                            className = "fs-14 fw-4 mt_32 mb_20 col-12"
                            btntext   = "Build Loyalty"
                            type      = "submit"
                            disabled  = {state.loader || !formik.isValid}
                            icon      = {state.loader && <CircularProgress size={20} color={'inherit'}/>}
                        />
                    </div>
                    {state.apiError && <div className={'error'}>{state.apiError}</div>}
                     {/* */}
                </div>

            </div>
        </div>
    )
}