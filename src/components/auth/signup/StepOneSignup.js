import React from 'react'

import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControl, FormHelperText } from '@material-ui/core';

import CustomButton from '../../CustomButton';
import CustomRadio from '../../CustomRadio';

import { User } from '../../../enums';

export default function StepOneSignup({state, setState, formik}) {

    return (
        <div className="row" id="stepOne">
            <div className="stepCount">Step 1 of 2</div>
            <div className="contents mt_10 text-center">
                <div className="text-left">

                    <div className="subtitle1 fs-18 col-12">
                        Will this account be used for actual business?
                    </div>
                    <div className="questionBox mt_8 col-12">
                        <FormControl error = {formik.touched.usedFor && formik.errors.usedFor}>
                            <RadioGroup 
                                name     = "usedFor"
                                value    = {formik.values.usedFor}
                                onChange = {formik.handleChange}
                                onFocus  = {formik.handleBlur}
                            >
                                <CustomRadio 
                                    value = {User.UsedFor.USINESS}
                                    label = "Yes, this account will be used for an actual business."
                                />
                                <CustomRadio 
                                    value={User.UsedFor.TESTING}
                                    label="No, this is a technical /testing /demo account."
                                />
                            </RadioGroup>
                            <FormHelperText>
                                {formik.touched.usedFor && formik.errors.usedFor ? formik.errors.usedFor : ''}
                            </FormHelperText>
                        </FormControl>
                    </div>
                
                    <div className="subtitle1 fs-18 mt_24 col-12">
                        Are you creating this account for a client?
                    </div>
                    <div className="questionBox mt_8 col-12">
                        <FormControl error = {formik.touched.createdFor && formik.errors.createdFor}>
                            <RadioGroup 
                                name     = "createdFor"
                                value    = {formik.values.createdFor}
                                onChange = {formik.handleChange}
                                onFocus  = {formik.handleBlur}
                            >
                                <CustomRadio 
                                    value={User.CreatedFor.CLIENT}
                                    label="Yes, this account will be used for client."
                                />
                                <CustomRadio 
                                    value={User.CreatedFor.PERSONAL}
                                    label="No, this is a technical/testing/demo account."
                                />
                            </RadioGroup>
                            <FormHelperText>
                                {formik.touched.createdFor && formik.errors.createdFor ? formik.errors.createdFor : ''}
                            </FormHelperText>
                        </FormControl>
                    </div>

                    <div className="col-12">
                    <CustomButton 
                        className="fs-14 fw-5 mt_32 col-12 mb_20" 
                        disabled  = {!formik.values.usedFor || formik.errors.usedFor || !formik.values.createdFor || formik.errors.createdFor}
                        onClick={()=>setState({...state, page: 2})} 
                        btntext="next"
                    />
                    </div>

                </div>
            </div>
        </div>
    )
}