import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
// import { DateRange } from 'react-date-range';

import React from 'react';

export default function CustomDateRange({onChange}) {

  const [state, setState] = React.useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  
  const handleChange = (item) => {
    setState([item.selection])
    onChange(item);
  }

  
  return(
    <div id="dateFilter">
     <DateRangePicker
        onChange={(item)=>handleChange(item)}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="vertical"
        scroll={{ enabled: true }}
        maxDate = {new Date()}
      />
      {/* <DateRange
        editableDateInputs={true}
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
      /> */}
    </div>
    )
}