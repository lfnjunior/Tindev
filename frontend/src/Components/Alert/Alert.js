import React, {Component}from 'react';
import './Alert.css';

export default class Alert extends Component{
    render() {
        return (
            <div className="alert alert-danger myAlert-bottom " id="Alert">
                    <span >{this.props.message}</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}