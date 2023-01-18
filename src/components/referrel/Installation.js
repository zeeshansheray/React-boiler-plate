import React, {useState, useEffect} from 'react'

export default function Installation(props) {
    const [section, setSection] = useState('');

    useEffect(()=>{
        sectionCompletedCheck();
        setSection(props.section);
    },[props.section])

    const sectionCompletedCheck = () =>{
        // if(section === 1){
        //     props.setPage(2);
        // }
    }

    const contents = [
        {
            title: 'Sign Up',
            detail: 'When a new visitor submits their email address on your website, this will instantly trigger a referral. Choose this option if your definition of a referral is a new user, subscriber, or lead.'
        },
        {
            title: 'Sign Up + Custom Event',
            detail: 'When a new visitor submits their email address on your website, a referral will be triggered only after they complete a Custom Event (such as a purchase). Choose this option if your definition of a referral is a lead or user who converts into a paying customer.'
        },
    ]

    return (
        <div id="installationReferral">
            <div clasName="row">
                   
                    <div className="col-9">

                        <div className="Heading22R">
                            What does a referred person need to do in order to count as a referral?
                        </div>

                        <div className="body1 mt_16">
                            Based on what you select here, your installation instructions will change. Learn more
                        </div>

                    
                        { 
                        contents.map((value, index)=>
                            <div className="card mt_24" key={index}>
                                
                                <div className="Heading22R">
                                        {value.title}
                                </div>

                                <div className="Body14R mt_8">
                                        {value.detail}
                                </div>

                             </div>
                        )}

                    </div>
            </div>
            
        </div>
    )
}
