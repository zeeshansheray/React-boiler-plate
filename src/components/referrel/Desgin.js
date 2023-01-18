import React, {useState, useEffect} from 'react'

export default function Desgin(props) {

    const [section, setSection] = useState('');

    useEffect(()=>{
        sectionCompletedCheck();
        setSection(props.section);
    },[props.section])

    const sectionCompletedCheck = () =>{
        if(section == 1){
            props.setPage(3);
        }
    }

    return (
        <div id="design">
            <div className="container">
                
                <div className="row">
                            {/* Unlayer form goes here!  */}
                </div>

            </div>
            
        </div>
    )
}
