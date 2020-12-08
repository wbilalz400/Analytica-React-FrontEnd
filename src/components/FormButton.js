import React from 'react';
import "./FormButton.css";
export default class FormButton extends React.Component {
    render() {
        return (
            <div className={"btn-custom " + this.props.color } onClick={this.props.onClick}>
                <img className = {this.props.loading?"loading":""} src={this.props.loader}></img><span>{this.props.label}</span>
            </div>
        );
    }
}