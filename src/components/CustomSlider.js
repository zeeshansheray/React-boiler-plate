import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

export default function CustomSlider({label, value, setValue, onChange}) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    console.log('new value ', newValue)
    // setValues(newValue);
  };


  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {label}
      </Typography>
      <Slider
        value             = {value}
        onChange          = {onChange}
        valueLabelDisplay = "auto"
        aria-labelledby   = "range-slider"
        getAriaValueText  = {valuetext}
      />
    </div>
  );
}
