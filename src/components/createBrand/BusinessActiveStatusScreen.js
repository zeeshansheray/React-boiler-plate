import React from 'react';
import Fade from 'react-reveal/Fade';

// import {SvgIcons} from '../../icons';

export default class BusinessActiveStatusScreen extends React.Component {

    constructor(props){
        super(props);
        this.state={
            businessStatus: '',
            className:'',
            show: false,
        }

        this.nextScreen=this.nextScreen.bind(this);

    }


    nextScreen = () =>{
        if(this.state.businessStatus === 'Offline'){
            this.setState({show: false})
            setTimeout(()=>{this.props.setActivePage(this.props.index ,this.state.businessStatus)},500)
            
        }
        else{
            this.setState({show: false})
            setTimeout(()=>{this.props.setActivePage(this.props.index)},500)
        }
    }

    componentDidMount(){
        this.setState({
            show: true,
        })
    }

    

    render(){

        const business = [
            {status: 'Online'},
            {status: 'Offline'},
            {status: 'Both'},
        ]
        

    return(

            <div id="businessStatusScreen">

                <Fade bottom duration={500} opposite when={this.state.show}>

                    <div className="cards">

                    <div className="row">
                                
                                <span className="Heading22R mt_2">Do you run your business
                                 <span className="fw-6"> Online </span>,
                                 <span className="fw-6"> Offline </span> or
                                 <span className="fw-6"> Both? </span>
                            
                                </span>

                        <span/>


                        </div>

                        <div className="row mt_32">
                    
                    {   business.map((value,index)=>
                           
                           <div className="fw-5 text-center px-2" key={index}>
                               
                               
                               <button className=  {value.status === this.state.businessStatus ? 'singleBusinessStatus col-12 active' : 'singleBusinessStatus col-12'  } onClick={async() => {await this.setState({businessStatus: value.status}); this.nextScreen();}} >
                                    {value.status}
                                </button> 

                                  
                            </div>

                    )}
                        </div>


                    </div>

                </Fade>
                
            </div>

    )
}
}