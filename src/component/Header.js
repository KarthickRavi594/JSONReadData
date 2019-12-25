import React from 'react'
import {Row} from 'simple-flexbox'

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        return(
            <div className="header">
                <Row>
                    <div className="HeadingName">Terminal Name</div>
                    <div className="HeadingName">Trade Category</div>
                    <div className="HeadingName">Category Manager</div>
                    <div className="HeadingName">Brand Name</div>
                    <div className="HeadingName">Category Code</div>
                    <div className="HeadingName">Account/Company Name</div>
                </Row>
            </div>
        )
    }
}

export default Header;