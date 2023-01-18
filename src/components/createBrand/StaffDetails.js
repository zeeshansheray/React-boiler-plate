import React, {useState, useEffect} from 'react';
import Fade from 'react-reveal/Fade';

// import {SvgIcons} from '../../icons';

export default function StaffDetails(props) {

    const [employees, setEmployees] = useState('');
    const [show, setShow]= useState(false);

    const employeesNumber = [
        {total: '1-5'},
        {total: '6-10'},
        {total: '11-25'},
        {total: '26-50'},
        {total: '51-200'},
        {total: '201-500'},
        {total: '500+'}
    ]

    const selectEmployee = (value,index) => {
        setEmployees(value.total);
        nextScreen();
        
    }

    const nextScreen = () =>{   
        setShow(false);
        setTimeout(()=>{props.setActivePage(props.index)},500)
    }

    useEffect(()=>{

        setShow(true);

    }, [])


    return(

            <div id="staffDetailScreen">

                <Fade bottom duration={500} opposite when={show}>

                    <div className="cards">

                        <div className="row">
                                
                                <span className="Heading22R ml_2">How many <span className="fw-6">Staff </span>do you have:
                            
                                </span>

                        <span/>

                        </div>

                        <div className="row mt_32">
                    
                    {   employeesNumber.map((value,index)=>
                           
                           <div className="fw-5 text-center px-2" key={index}>
                               
                               

                               <button 
                                    className = {value.total === employees ? 'singleEmployeeBox col-12 active' : 'singleEmployeeBox col-12'  } 
                                    onClick={() => selectEmployee(value,index)}>

                                    {value.total}
                                    
                                </button> 

                                  
                            </div>

                    )}
                        </div>


                    </div>

                  </Fade>
                
                </div>

    )
}