import * as React from 'react';
import {
  DataGrid,
  // GridToolbar,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import EmptyScreen from './EmptyScreen';
import Loader from './Loader';
import { SvgIcons } from '../icons';
import { ColorSchemeCode } from '../enums/ColorScheme';
import { IconButton } from '@material-ui/core';
import localforage from 'localforage';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarDensitySelector /> */}
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function CustomTableV2(props) {
  
  const [check, setCheck] = React.useState()
  const [loader, setLoader] = React.useState(true);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if(props.deleteAll){        
        // if(check && check.length > 0)       document.getElementById('customDelete').innerHTML = "<img class='imageButton ml_24' height='20px' width='20px' src='/images/Delete.png'>"
        // if(check && check.length > 0)       document.getElementById('customDelete').innerHTML = "<button class='MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall' tabindex='0' type='button' aria-label='' aria-haspopup='menu' aria-labelledby='mui-62159' id='mui-36962'><span class='MuiButton-label'><span class='MuiButton-startIcon MuiButton-iconSizeSmall'><svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M4.49992 13C4.49992 13.5523 4.94763 14 5.49992 14H11.4999C12.0522 14 12.4999 13.5523 12.4999 13V5.66667C12.4999 5.11438 12.0522 4.66667 11.4999 4.66667H5.49992C4.94763 4.66667 4.49992 5.11438 4.49992 5.66667V13ZM13.1666 3.33333C13.1666 2.96514 12.8681 2.66667 12.4999 2.66667H11.2475C10.9822 2.66667 10.7279 2.56131 10.5404 2.37377L10.4595 2.29289C10.2719 2.10536 10.0176 2 9.75237 2H7.24747C6.98225 2 6.7279 2.10536 6.54036 2.29289L6.45948 2.37377C6.27194 2.56131 6.01759 2.66667 5.75237 2.66667H4.49992C4.13173 2.66667 3.83325 2.96514 3.83325 3.33333V3.33333C3.83325 3.70152 4.13173 4 4.49992 4H12.4999C12.8681 4 13.1666 3.70152 13.1666 3.33333V3.33333Z' fill='#202124'/></svg></span></span><span class='MuiTouchRipple-root'></span></button>"
        // if((!check) || check.length === 0){
        //   if(document.getElementById('customDelete')) document.getElementById('customDelete').innerHTML = ""
        // }
  //     }
  //   }, 100);
  // }, [check])
  
    // function handleDelete() {
    //   if(props.handleDelete) props.handleDelete() 
    // }

  setTimeout(() => {
    // if( document.getElementById('CustomTableV2') && document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer') && document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0] && document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].children && document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].children[0] && document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].children[0].textContent === 'Columns'){

    //   if(document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].children[1].title === "Show filters") document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].children[1].remove();
    //   document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].children[0].remove();
    //   // document.getElementById('CustomTableV2').getElementsByClassName('MuiButton-label')[0].innerHTML = "<img class='imageButton' src='/images/Filter.png' height='20px' width='20px' />"
    //   document.getElementById('CustomTableV2').getElementsByClassName('MuiButton-label')[0].innerHTML = "<img class='imageButton' src='/images/Density.png' height='20px' width='20px' />"
    //   document.getElementById('CustomTableV2').getElementsByClassName('MuiButton-label')[1].innerHTML = "<img class='imageButton' src='/images/Export.png' height='20px' width='20px' />"
      // if(props.deleteAll && document.getElementById('CustomTableV2')) document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].insertAdjacentHTML('beforeEnd','<div id="customDelete"></div>');
      // document.getElementById('CustomTableV2').getElementsByClassName('MuiDataGrid-toolbarContainer')[0].insertAdjacentHTML('afterBegin',"<img id='customRefresh' class='imageButton' height='20px' width='20px' src='/images/Refresh.png'>")

      // if(props && props.deleteAll && document.getElementById('CustomTableV2')) document.getElementById("customDelete").addEventListener("click", function myFunction(event){ props.handleDelete() })
      // if(document.getElementById("customRefresh")) document.getElementById("customRefresh").addEventListener("click", function myFunction(event) { props.handleRefresh() });
    // }

    if(document.getElementById("CustomTableV2") && document.getElementById("CustomTableV2").getElementsByClassName('MuiDataGrid-window') && document.getElementById("CustomTableV2").getElementsByClassName('MuiDataGrid-window')[0])
      document.getElementById("CustomTableV2").getElementsByClassName('MuiDataGrid-window')[0].onscroll = (event) => {
        var scrolled = document.getElementById("CustomTableV2").getElementsByClassName('MuiDataGrid-window')[0].scrollTop;
        var position = document.getElementById("CustomTableV2").getElementsByClassName('MuiDataGrid-window')[0].offsetTop;

        if(scrolled > position ){
          document.getElementById("CustomTableV2").getElementsByClassName('MuiDataGrid-columnsContainer')[0].style.boxShadow = '0px 4px 4px rgba(100, 121, 143, 0.12)'
        }
        else{
          document.getElementById("CustomTableV2").getElementsByClassName('MuiDataGrid-columnsContainer')[0].style.boxShadow = ''
        }
    };
  }, 200);


  // function handleRefresh() {
  //    props.handleRefresh() 
  //   }

  return (
  
    <div id="CustomTableV2" className="position-relative" style={{ height: props.height || 500, width: '100%' }}>
      <DataGrid
        components={{
          Toolbar: CustomToolbar,
        }}
        localeText={{
          toolbarDensity      : '',
          toolbarDensityLabel : '',
          toolbarExport       : '',
          toolbarExportLabel  : '',
        }}
        rows       = {props.rows}
        onRowClick = {props.onRowClick}
        className  = "cp"
        width      = {'100%'}
        columns    = {props.columns}
        // GridUpdateAction = 'delete'
        disableSelectionOnClick
        pageSize           = {props.pageSize || 10}
        rowsPerPageOptions = {[props.pageSize || 10]}
        checkboxSelection  = {props.checkbox || false}
        disableColumnMenu
        // components={{
        //   Toolbar    : GridToolbar,
        // }}
        onSelectionModelChange={(ids) => {
          setCheck(ids)
          if(props.deleteAll) props.setSelectedRows(ids)
        }}
      />  
      {/* <div className="position-absolute cp deleteIcon display" style={{top: '19px', left: '100px'}}> */}
        {props.deleteAll && check && check.length > 0 && <IconButton className="position-absolute cp deleteIcon display" style={{top: '8px', right: '35px'}} onClick={props.handleDelete}>
          <SvgIcons.DeleteIcon height="18" width="auto" color={ColorSchemeCode.Paragraph}/>
        </IconButton>}
      {/* </div> */}
      {props.rows && props.rows.length <= 0 && <div className="position-absolute noData">
        <EmptyScreen
            title        = {props.title}
            showBtn      = {false}
            // otherCaption = {`No ${props.title} found according to your current filter`}
          />
      </div>}
    </div>
  );
}