import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { ColorScheme } from '../../enums'

const tableHeadStyles = makeStyles({
  root: {
    fontSize        : '14px',
    fontFamily      : "Inter",
    fontWeight      : 500,
    color           : ColorScheme.ColorSchemeCode.neutral80,
    backgroundColor : (props) => props.headerBackground || ColorScheme.ColorSchemeCode.bgTextBox
  },
  stickyHeader: {
    backgroundColor: ColorScheme.ColorSchemeCode.white
  }
})

function CustomTableHead({
  classes,
  headCells,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  checkbox, 
  headerBackground,
  ...props 
}){
    const headerClasses = tableHeadStyles({headerBackground})

    const createSortHandler = (property) => (event) => onRequestSort(event, property);
  
    return (
        <TableHead>
            <TableRow>
              { checkbox && 
                <TableCell padding="checkbox" classes={headerClasses} className={'border-0'} >
                  <Checkbox
                    indeterminate = {numSelected > 0 && numSelected < rowCount}
                    checked       = {rowCount > 0 && numSelected === rowCount}
                    onChange      = {onSelectAllClick}
                    inputProps    = {{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
              }
            
              {headCells.map((headCell) => (
                <TableCell
                  key           = {headCell.id}
                  align         = {headCell.numeric ? 'right' : 'left'}
                  padding       = {headCell.disablePadding ? 'none' : 'default'}
                  sortDirection = {orderBy === headCell.id ? order : false}
                  className     = {'border-0'}
                  classes       = {headerClasses}
                >
                  <TableSortLabel
                    active    = {orderBy === headCell.id}
                    direction = {orderBy === headCell.id ? order : 'asc'}
                    onClick   = {createSortHandler(headCell.id)}
                    className = {props.headerClass + ' white-space-no-wrap ' + headCell.class}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
        </TableHead>
    );
}

export default CustomTableHead
