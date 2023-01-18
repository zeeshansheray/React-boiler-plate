import React, { useEffect, useState } from 'react'
import { SvgIcons } from '../icons';
import { ClickOutside } from '../utils';
import CustomCheckBox from './CustomCheckBox';
import CustomSearch from './CustomSearch'

export default function CustomDropDown({width, className, showCheckBox, classNameB, search, options, addNewProduct, sufix, placeholderImage, label, allFilterShow, setFilterData}) {
  const [selectedLabel, setSelectedLabel]     = useState();
  const [show, setShow]                       = useState({
    dropDown: false,
    loader  : true,
  });
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [allFilter, setAllFilter]             = useState(false);
  const [filterLength, setFilterLength]       = useState(options.length);


  console.log('options ', options)

  useEffect(()=>{
        if(options && options.length > 0){
            let data = [];
            options.forEach((element)=>{
                data.push({...element, checkBox: false})
            })
            setFilteredOptions(data)
        }
  },[options.length>0])

  
  useEffect(()=>{
    let temp = []
    if(filteredOptions&&filteredOptions.length>0){
        for (const value of filteredOptions) {
            if(value.checkBox === true) temp.push(value)
        }
        if(temp.length === filteredOptions.length) {setAllFilter(true);}
        setFilterLength(temp.length)
    }
    
    if(!showCheckBox) {
        setFilterLength(options.length)
    }
  },[filteredOptions])
  
  const handleSearch = (e) => {
    const result = options.filter(item => 
        item.label?.toLowerCase().includes(e.target.value.toLowerCase())
        );
    setFilteredOptions(result);
  }

  return (
    <div>
        <ClickOutside onClick={()=>setShow({...show, dropDown : false})}>
        <div className = {'customDropDownClosed wpx-' + width + ' '+ className} onClick = {()=>setShow({...show, dropDown : !show.dropDown})}>
                <div className='d-flex align-items-center justify-content-center'>
                    <SvgIcons.profileIcon/>
                    <span className = 'ml_8 color-neutral60 Body14R'>{filterLength +' ' +label}</span>
                    <span className = 'ml_8 Body14R color-neutral100'>{selectedLabel && !showCheckBox ? selectedLabel : ''}</span>
                </div>
               
                <div><div className='Body14R color-neutral100 ml_8'>{sufix}</div> <SvgIcons.DropDownTriangleHorizontalIcon/></div>
        </div>
        {show.dropDown && <div className={`customDropDown wpx-${width} ${classNameB?classNameB:className}`}>
            {search && <div className={'searchField w-100'}>
                <CustomSearch 
                    placeholder    = {'Search'}
                    className      = {'w-100 Body14R'}
                    position       = {'start'}
                    height         = "36px"
                    onChange       = {(e)=>handleSearch(e)}
                    disableEndIcon = {true}
                />
            </div>}
            <div className='options'>
                {allFilterShow &&  <div className='option' >
                    <CustomCheckBox 
                                    value={allFilter} onChange={(e)=>{
                                        if(!allFilter) {
                                            console.time("Time this");
                                            let data = filteredOptions;
                                            data.forEach((customer)=>{
                                                customer.checkBox = true
                                            })
                                            console.log('data ', data);
                                            setFilterData([...data]);
                                            setAllFilter(true);
                                            setFilteredOptions([...data]);
                                            setFilterLength(data.length)
                                            console.log('done');
                                            console.timeEnd("Time this");
                                        }
                                        else {
                                            let data = filteredOptions;
                                            data.forEach((customer)=>{
                                                customer.checkBox = false
                                            })
                                            setAllFilter(false);
                                            setFilterData([]);
                                            setFilterLength(0)
                                            setFilteredOptions([...data]);
                                        }
                                    }}
                    />
                    <span className='ml_3 Body14R color-neutral90'>Select All</span>
                </div>
                }
                {
                    filteredOptions && filteredOptions.length > 0 && filteredOptions.map((option, idx)=>(
                        <div className='option' 
                        onClick={()=>{setSelectedLabel(option.label); setFilterData([option.value]); if(!showCheckBox) setShow({...show, dropDown: !show.dropDown})}}
                        >
                            {
                                showCheckBox && <CustomCheckBox 
                                        value={filteredOptions[idx].checkBox ? true : false} 
                                        onChange={()=>{
                                            if(filteredOptions[idx].checkBox){
                                                filteredOptions[idx].checkBox = false
                                            }
                                            else{
                                                filteredOptions[idx].checkBox = true
                                            }
                                            setFilteredOptions([...filteredOptions])
                                            let filterDataArray = filteredOptions.filter((element, idx)=> {if(element.checkBox) return true;})
                                            setFilterData(filterDataArray)
                                            setFilterLength(filterDataArray.length)
                                            setAllFilter(false);
                                        }}
                                />
                            }
                        {option.image ? <div className='wpx-20'>{option.image}</div> : ''}
                        <div className='ml_12 Body14R color-neutral90 capitalize'>{option.label}</div>
                        </div>
                    ))
                }
            </div>

            {
                addNewProduct && <div className='addnewproduct'>
                        <div className='option'>
                            <SvgIcons.Add color='#2960EC'/>
                            <div className='ml_12 Body14R color-primary50' onClick={addNewProduct}>Add New Product</div>
                        </div>
                </div>
            }
        </div>}
        </ClickOutside>
    </div>
  )
}
