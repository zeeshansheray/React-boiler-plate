/*
-
- Reference Urls
- link
-
*/

import React from 'react'


import styled from 'styled-components'
import TableList from '../components/TableList';
import { useTable, useSortBy } from 'react-table'



const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid #E0E0E0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #E0E0E0;
      border-right: 1px solid #E0E0E0;

      :last-child {
        border-right: 0;
      }
    }
  }
`


function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column,idx) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th className={(typeof column.Header === 'string')? '' : 'noborder'} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  
                  <p>{column.render('Header')}</p>
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell,idx) => {
                    return (
                      <td className={(idx===0)? 'longWidth' : ''} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  )
}

function CustomTable() {

  const tableHeader = () => [
    {
      Header: 'Name',
      accessor: 'Name',
      
    },
    {
      Header: 'Widget',
      columns: [
        {
          Header: 'Impressions',
          accessor: 'Impressions',
        },
        {
          Header: 'Opts-Ins',
          accessor: 'OptsIns',
        },
      ],
    },
    {
      Header: 'Opt-in message',
      columns: [
        {
          Header: 'Conversions',
          accessor: 'Conversions',
        },
        {
          Header: 'Opened',
          accessor: 'Opened',
        },
        {
          Header: 'Clicked',
          accessor: 'Clicked',
        },
      ],
    },
  ]

  const tableData = () => [
    {
      Name          :   <TableList/>,
      Impressions   :   'hye1',
      OptsIns       :   'hye2',
      Conversions   :   'hye3',
      Opened        :   'hye4',
      Clicked       :   'hye5',
    },
    {
      Name          :   <TableList/>,
      Impressions   :   'ahye1',
      OptsIns       :   'ahye2',
      Conversions   :   'ahye3',
      Opened        :   'ahye4',
      Clicked       :   'ahye5',
    },
  ]

  const columns = React.useMemo( tableHeader, [] )

  const data = React.useMemo( tableData, [] )
  
  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default CustomTable
