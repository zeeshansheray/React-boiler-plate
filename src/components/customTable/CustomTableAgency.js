import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { ColorSchemeCode } from '../../enums/ColorScheme';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor : ColorSchemeCode.whiteColor,
    color           : ColorSchemeCode.textFieldLabelColor,
    fontSize        : '12px',
    padding         : '12px 8px 12px 8px',
    fontFamily      : "Inter"
  },
  body: {
    fontSize   : 12,
    padding    : '12px 8px 12px 8px',
    fontFamily : "Inter",
    color      : ColorSchemeCode.textFieldTextActiveColor
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: ColorSchemeCode.hoverColor,
    },
    height : '40px'
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});

export default function CustomTable({head, body}) {
  const classes = useStyles();

  return (
    <div id="CustomTable">
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                head.map((value,index)=>(
                  <StyledTableCell className={value.className} align={value.align}>{value.value}</StyledTableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {body.map((value, index) => (
              <StyledTableRow key={index}>
                {
                  value.map((v,i)=>(
                    <StyledTableCell className={v.className} align={v.align}>{v.value}</StyledTableCell>
                  ))
                }
              </StyledTableRow>
            ))}
           
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
