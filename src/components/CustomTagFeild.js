import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { InputLabel, TextField } from '@material-ui/core';

function CustomTagFeild(props) {
    
    const fixedOptions = [];
    const [value, setValue] = React.useState();

    return (
        <div>
            <Autocomplete
                multiple
                id="fixed-tags-demo"
                value={value}
                onChange={(event, newValue) => {
                    setValue([
                    ...fixedOptions,
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                    ]);
                    props.setValidDays([
                    ...fixedOptions,
                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                    ]);

                }}
                options={props.options}
                getOptionLabel={(option) => option}
                renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                    <Chip
                        label={option}
                        {...getTagProps({ index })}
                        disabled={fixedOptions.indexOf(option) !== -1}
                    />
                    ))
                }
                style={{ width: '100%' }}
                renderInput={(params) => (
                    <>
                        {/* <InputLabel className="MuiFormLabel-root MuiInputLabel-root makeStyles-root-58 makeStyles-root-1040 MuiInputLabel-animated MuiInputLabel-shrink" shrink htmlFor = "bootstrap-input">{props.label}</InputLabel> */}
                        <TextField {...params} variant='outlined' placeholder={props.placeholder}  className="fw-4 fs-15 borderRadius-10 " />
                    </>
                    )}
            />
        </div>
    )
}

export default CustomTagFeild
