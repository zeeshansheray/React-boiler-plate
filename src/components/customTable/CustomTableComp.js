import React from 'react';
import CustomTable from './CustomTable'

function handleColFunc(){
  console.log('function for col call');
}

function createData(avatar, name, id) {
  return { 
    props: {
      name      : 'rowProps',
      class     : '',
      id        : id,
      checkbox  : true
    },
    avatar: {
      label : avatar,
      class : '',
      fn    : handleColFunc
    }, 
    name: {
      label   : name,
      class   : '',
      numeric : false
    } 
  };
}

const rows = [
  createData('URL', 'Zia', 'asgjdsbaj'),
  createData('link', 'Arsalan', 'asdkjab765')
];

const headCells = [
  { id: 'avatar', label: 'logo' },
  { id: 'name', numeric: false, disablePadding: false, label: 'brand' },
];


export default function EnhancedTable() {
  return (
    <div>
      <CustomTable
        headerRow={headCells}
        dataRows={rows}
        headerClass={''}
        checkbox={true}
        tableHeight={'120px'}
        stickyHeader={true}
      />
    </div>
    
  );
}
