import React from 'react';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import CustomTableHead from './CustomTableHead';
import CustomTableDataRow from './CustomTableDataRow';
import CustomPagination from './CustomPagination';


function descendingComparator(a, b, orderBy) {
  
  if (b[orderBy].label < a[orderBy].label) return -1;
  if (b[orderBy].label > a[orderBy].label) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    boxShadow: (props) => props.tableShadow || '0px 4px 24px rgba(0, 0, 0, 0.08)'
  },
  tableRoot: {
    // height: (props) => props.tableHeight,
    maxHeight: (props) => props.tableHeight
  },
  table: {
    minWidth: (props)=>props.tableWidth ? props.tableWidth : 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function CustomTable({
  headerRow, 
  dataRows,
  stickyHeader,
  headerClass,
  checkbox,
  tableHeight,
  tableWidth,
  pagination,
  tableShadow,
  headerBackground
}) {

  const classes = useStyles({tableHeight, tableShadow, tableWidth});

  const [order, setOrder]             = React.useState('asc');
  const [orderBy, setOrderBy]         = React.useState(headerRow[0].id);
  const [selected, setSelected]       = React.useState([]);
  const [page, setPage]               = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataRows.map((n) => n.props.id );
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className={classes.tableRoot}>
          <Table
            className       = {classes.table}
            aria-labelledby = "tableTitle"
            stickyHeader    = {stickyHeader || false}
            aria-label      = "enhanced table"
          >
            <CustomTableHead 
              headCells        = {headerRow}
              classes          = {classes}
              numSelected      = {selected.length}
              order            = {order}
              orderBy          = {orderBy}
              onSelectAllClick = {handleSelectAllClick}
              onRequestSort    = {handleRequestSort}
              rowCount         = {dataRows.length}
              headerClass      = {headerClass}
              checkbox         = {checkbox || false}
              headerBackground = {headerBackground}
            />
            <CustomTableDataRow 
                stableSort    = {stableSort}
                rows          = {dataRows}
                getComparator = {getComparator}
                order         = {order}
                orderBy       = {orderBy}
                page          = {page}
                rowsPerPage   = {rowsPerPage}
                // handleClick   = {handleClick}
                isSelected    = {isSelected}
                pagination    = {pagination}
            />
          </Table>
        </TableContainer>
     
        { pagination && 
          <CustomPagination 
              count               = {dataRows.length}
              rowsPerPage         = {rowsPerPage}
              page                = {page}
              onChangePage        = {handleChangePage}
              onChangeRowsPerPage = {handleChangeRowsPerPage}
          />
        }
      </Paper>
    </div>
  );
}


export default CustomTable 
