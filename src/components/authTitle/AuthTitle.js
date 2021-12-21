import React from 'react';

export default class AuthTitle extends React.Component {
    render() {
        return (
            <div className="title">
                    <h1>{this.props.children}</h1>
                    <span>Enter your credentials to continue</span>
                </div>
        )
        

    }
}
