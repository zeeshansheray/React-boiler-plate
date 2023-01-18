import React, { useContext } from 'react';
import { alpha, styled, withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { ColorSchemeCode } from '../enums/ColorScheme';
import { AgencyContext } from '../context/Agency.context';
import { blue } from '@material-ui/core/colors';

// const CustomizedSwitch = styled(Switch)(({ theme }) => ({
//   '& .MuiSwitch-switchBase.Mui-checked': {
//     color: ColorSchemeCode.themeColor,
//     '&:hover': {
//       backgroundColor: alpha(blue[600], theme.palette.action.hoverOpacity),
//     },
//   },
//   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//     backgroundColor: ColorSchemeCode.themeColor,
//   },
// }));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#2960EC' : '#2960EC',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    backgroundColor: 'white',
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));


export default function CustomSwitch({className, onChange, onClick, checked, name}) {

  const agency = useContext(AgencyContext)
  return (
      <div className={className}>
        <AntSwitch agency={agency} checked={checked} onChange={onChange} onClick={onClick} name={name} inputProps={{ 'aria-label': 'ant design' }} />
          {/* <CustomizedSwitch agency={agency} checked={checked} onChange={onChange} onClick={onClick} name={name} /> */}
      </div>
  );
}
