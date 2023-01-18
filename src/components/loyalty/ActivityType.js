
import SvgIcons from '../../icons/svg.icon'
import { ColorSchemeCode } from '../../enums/ColorScheme'
import { AgencyContext } from '../../context/Agency.context'
import { useContext } from 'react'


export default function ActivityTypeDetail({formik, activityTypes}){

    const selectActivitytype = (activity) => formik.setValues({...formik.values, activity: activity.key})

    const agency = useContext(AgencyContext)

    return( 
        <div className="Activitytypedetails col-12"> 
            <div className='Heading4 color-neutral80'>Select Activity Type : </div>     
            {activityTypes.map((element, idx)=>
                <div className={`col-10 d-flex space-between singleProgram ${element.exist && 'disabled'}`} onClick={()=>selectActivitytype(element)}>
                    <div className="d-flex cd">
                        <div className="imageBox">
                            <img src={element.image} className={element.key !== formik.values.activity && 'grayed-image'} alt=""/>
                        </div>
                        <div className="subtitle1 pt_10 pb_10 ml_8">
                            {element.name}
                        </div>
                    </div>
                    {element.key === formik.values.activity && 
                        <div className="mt_12">
                            <SvgIcons.CircularTickIcon width="24" height="24" backgroundColor={agency.agencyColor}/>
                        </div>
                    }
                </div>  
            )}       
        </div>
    )
}
