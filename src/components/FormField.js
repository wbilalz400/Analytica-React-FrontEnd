import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import './FormField.css';




export default class FormField extends React.Component {
    
    render() {
        this.styles = {
            Col: {
                display: 'flex',
                flexDirection: 'column',
                margin: '1% 12%',
                'flex-wrap': 'none',
                marginBottom: '-2%'
            },
            label: {
                fontSize: '1.2em',
                fontWeight: '600',
            },
            input: {
                marginTop: '-5%',
                border: '0px',
            },
            errLabel : {
                color: 'red',
                fontSize: '0.8em',
                visibility: this.props.err? "visible":"hidden",
            },
        };
        return (
            <Row  style ={this.styles.Col}>
                <label style={this.styles.label}>
                    {this.props.label}
                    { this.props.required? <span style={{color:'red'}}>*</span>: ''}
                </label>
                <input className={'input-field ' + this.props.color}  value={this.props.value} type={this.props.type} name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.onChange} >

                </input>
                <label style={this.styles.errLabel}>
                   {this.props.errLabel}
                </label>
            </Row>
        );
    }
}