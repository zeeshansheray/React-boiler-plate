import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CustomInput from './CustomTextField';
import CustomDropdown from '../components/DropdownSelect';
import CustomButton from '../components/CustomButton';

import SvgIcons from '../icons/svg.icon';
import { ColorSchemeCode } from '../enums/ColorScheme'

const useStyles = makeStyles({
  root:{
    fontSize: '40px'
  },
  table: {
    minWidth: 650,
    backgroundColor: ColorSchemeCode.white,
    boxShadow: 'none',
  },
  tableBody:{
    border: '1px solid red',
  }
});



export default function Tables(props) {
  const classes = useStyles();
  
  const fields = [
    {
      field: 'Active'
    }
    ,
    {
      field: 'Inactive'
    }
  ]

  return (
    <div id="tables">
    <TableContainer component={Paper} className="bg-color-bgTextBox tableBox">
         <div className="d-flex">
                  <div className="col-9 pl_0">
                    <CustomInput
                          className   = "searchField col-8 bg-color-tableSearchBoxColor"
                          placeholder = 'Search Participants'
                          variant     = "standard"
                          icon        = {<SvgIcons.SearchIcon height="24px" width="24px"/>}
                          position    = 'start'
                          border      = '0px'
                          backgroundColor = '#EAEBF0'
                          InputProps  = {{ startAdornment: <SvgIcons.SearchIcon height="24px" width="24px"/> ,disableUnderline: true, style: { fontSize: 14, paddingLeft: '12px'} }}/>
                                      
                  </div>

                  {
                   props.buttontext ? 
                      
                      <div className="customButton text-right col-3 mt_20">
                          <CustomButton 
                              btntext      = {props.buttontext}
                              fontSize     = {'14px'}
                              borderRadius = {"14px"}
                              // height       = {'45px'}
                            />
                      </div> 
                      
                      :

                    <></>
                  }
        </div>
      <Table className={classes.table + ' mt_16'} aria-label="caption table">
        <TableHead className="bg-color-bgTextBox">
          <TableRow>
            {
             props.tableheadings.map((value)=><>
            <TableCell><span className="Body14R fw-5 opacity-10">{value}</span></TableCell>
            </>
            )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rowData.map((row, index) => (
            <TableRow key={index}>
              <TableCell ><span className="Body14R color-c828282">{row.type}</span></TableCell>
              {row.message ?  <TableCell ><span className="Body14R color-c828282">{row.message}</span></TableCell> : <></>}
              {row.eventname ? <TableCell ><span className="Body14R color-c828282">{row.eventname}</span></TableCell> : <></>}
              { props.type == 'multi' ?
                <TableCell>
                <div className="row placeholder">
                  <div className="col actionField "><CustomDropdown className="actionDropdown Body14R color-tableActionDropdownColor" fields={fields} padding={'4px 0px 4px 4px'} fontSize={12}/></div>
                  <div className="col actionField text-center pt_12">
                    <SvgIcons.ViewMoreIcon/>
                  </div>
                  <div className="col actionField pt_5">
                    <SvgIcons.EditIcon/>
                  </div> 
                </div></TableCell> :
                <TableCell>
                <div className="placeholder text-right">
                  <SvgIcons.DeleteIcon/>
                </div></TableCell>
                }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}