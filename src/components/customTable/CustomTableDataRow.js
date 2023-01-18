import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import { ColorScheme } from '../../enums'

const tableDataStyle = makeStyles({
  root: {
    fontFamily : "Inter",
    fontSize   : '12px',
    fontWeight : '400',
    color      : ColorScheme.ColorSchemeCode.c333333
  }
})

function CustomTableDataRow({
  stableSort, 
  rows, 
  getComparator, 
  order, 
  orderBy, 
  page,
  rowsPerPage,
  isSelected,
  pagination,
  ...props}) {

    const classes = tableDataStyle()
    const sortedRows = pagination ? 
                        stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :
                        stableSort(rows, getComparator(order, orderBy))

    return (
        <TableBody>
             {sortedRows.map((row, index) => {
                const isItemSelected = isSelected(row.props.id);
                const labelId        = `enhanced-table-checkbox-${index}`;
                const isCheckbox     = row.props.checkbox || false

                  return (
                    <TableRow
                      hover
                      // onClick      = {(event) => props.handleClick(event, row.props.id)}
                      onClick      = {row.props.fn}
                      role         = "checkbox"
                      aria-checked = {isItemSelected}
                      tabIndex     = {-1}
                      key          = {index}
                      selected     = {isItemSelected}
                      className    = {row.props.class}
                    >
                      {isCheckbox &&
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked    = {isItemSelected}
                            inputProps = {{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                      }

                      {Object.values(row).map((col, index) => (
                          col.name !== 'rowProps' &&
                          <TableCell 
                            onClick   = {col.fn}
                            className = {`color-c828282 ${col.class}`}
                            align     = {col.numeric ? 'right' : 'left'}
                            key       = {index}
                            classes   = {{root: classes.root}}
                          >
                            <span className='Body14R color-inherit opacity-10'>
                              {!col.link && col.label}
                              {col.link && <a href={col.link} target='_blank'>{col.label}</a>}
                            </span>
                          </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
        </TableBody>
    )
}

export default CustomTableDataRow
