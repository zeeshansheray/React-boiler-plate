import React from 'react';

import SvgIcons from '../icons/svg.icon';

export default function Cards(props) {
    return (
        <div id="cards">
        <div className='row cardsRow'>
        {
            props.cards.map((element, idx)=>(
                <div className='col-4  mt_16' >
                    <div className='col-12 card' style={{backgroundColor : `${element.bgColor}`}}>
                        {props.component}
                        <div className='row ImgRow'>
                            <div className="actionIcon">
                                <SvgIcons.ViewMoreIcon color="#ffffff"/>
                            </div>
                            <img src={element.img.type} width='100%' height='193px' alt=''/>
                        </div>
                        <div className="row mt_17">
                                <div className="caption2 col fs-12">
                                    Last activity: 1 day ago
                                </div>
                        </div>
                        <div className='row'>
                            <div className={props.colorClass ? props.colorClass + ' col-md-9 Heading22R' : 'col-md-9 Heading22R'}>
                                {element.name}
                            </div>
                            {(props.switch) ? 
                            <div className={props.colorClass ? props.colorClass + ' col-md-3 Heading22R text-right' : 'col-md-3 Heading22R text-right'}>
                                {props.switch}
                            </div>      
                            : "" }
                        </div>
                        <div className='row'>
                            <div className={props.subtextColor ? props.subtextColor + ' col Body14R mt_16' : ' col Body14R mt_16'}>
                                {element.subHead}
                            </div>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>   
    </div>
    
    )
}
