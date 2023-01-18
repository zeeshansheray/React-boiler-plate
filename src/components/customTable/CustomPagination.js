import React from 'react'
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIcons } from '../../icons';

const paginationStyles = makeStyles({
    root: {
        color: 'rgba(0,0,0,0.5)'
    },
    spacer: {
        display: 'none'
    },
    selectRoot: {
        marginRight : 'auto',
        fontFamily  : 'Inter',
        fontSize    : '12px',
        fontWeight  : '400'
    },
    caption: {
        fontFamily : 'Inter',
        fontSize   : '12px',
        fontWeight : '400'
    },
    select: {
        paddingRight: '12px'
    },
    selectIcon: {
        width         : '.85em',
        height        : '.85em',
        position      : 'absolute',
        pointerEvents : 'none',
        right         : 0
    }
})


function CustomPagination({count, rowsPerPage, page, onChangePage, onChangeRowsPerPage}) {
    const paginationClasses = paginationStyles()

    const handleLabelDisplayedRows = ({from, to, count, page}) => {
        return `${from} - ${to} of ${count !== -1 ? count + ' items' : 'more than ' + to + ' items'}` 
    }

    return (
        <TablePagination
            rowsPerPageOptions  = {[5, 10, 25]}
            component           = "div"
            count               = {count}
            rowsPerPage         = {rowsPerPage}
            page                = {page}
            onChangePage        = {onChangePage}
            onChangeRowsPerPage = {onChangeRowsPerPage}
            labelDisplayedRows  = {handleLabelDisplayedRows}
            SelectProps         = {{ IconComponent: () => <SvgIcons.DropDownTriangleIcon className={paginationClasses.selectIcon} color={'red'} />}}
            classes             = {paginationClasses}
        />
    )
}

export default CustomPagination
