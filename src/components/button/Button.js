import React from 'react';
import "./Button.scss";

export default class Button extends React.Component {
    render() {
        return (
            <div className="form_button">
                <span>{this.props.children}</span>
            </div>
        )
        

    }
}


