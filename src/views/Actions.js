import React , {useState,useEffect} from 'react';
import './Actions.css';
import FormField from '../components/FormField';
import FormButton from '../components/FormButton';
import { addAction,getActions,getDevices,getSensors } from '../api';
import { Modal } from '@material-ui/core';
const data = [
    {
        sensor: 'Moisture Sensor',
        secondValue: 23,
        operator: ">",
        action: "SMS",
        to: '+923318337060',
    },
    {
        sensor: 'Light Sensor',
        secondValue: 55,
        operator: ">",
        action: "Email",
        to: 'wbilalz400@gmail.com',
    },
]
export default props => {
    const [first,setFirst] = useState('');
    const [second,setSecond] = useState('');
    const [operator, setOperator] = useState('');
    const [email, setEmail] = useState('')
    const [modal, setModal] = useState(false);
    const [actions, setActions] = useState(-1);
    const [devices, setDevices] = useState(-1);
    const [device, setDevice] = useState('-1');
    const [method, setMethod] = useState('email');
    if (devices === -1) {
        getDevices()
        .then(res => {
            if (res.data.success === true) {
                let sensors = res.data.devices.map(device => getSensors(device.id));
                Promise.all(sensors)
                .then(sensors => {
                    setDevices(res.data.devices.map((device,index) => {return {...device,sensors: sensors[index].data.sensors}})
                )});
            }
        });
    }
    if (actions === -1) {
        getActions()
        .then(res => {
            if (!!res.data.success) setActions(res.data.actions);
        })
        
    }
    

    const doAddAction = () => {
        if (!first) {
            alert("Please enter sensor name");
            return;
        } 
        if (!second) {
            alert("Please enter value to compare to");
            return;
        } 
        if (!operator) {
            alert("Please select a comparision operator");
            return;
        }
        if (!email) {
            alert("Please enter a email");
            return;
        }
        addAction({sensor: first, condition: operator, value: second, action: method, to: email})
        .then (res => {
            if (!!res.data.success) {
                window.location.reload();
            }
        })


    }


    return <div className="ActionMain">
    <div
        className={`Modal ${modal?'show':''}`}
    >
        <div className="addForm">
        <h3>Add Action</h3>
            <div className="inputContainer">
                <span><small>Compare From</small><br/>
                <small>Select Device</small></span>
                <select onChange={e => setDevice(e.target.value)} >
                    <option value="-1" >Select a Device</option>
                    {devices !== -1 && devices.map((device,index) => <option value={index}>{device.name}</option>)}
                </select>
                
            </div>
            <div className="inputContainer">
            <small>Select Sensor</small>
            <select onChange={e => setFirst(e.target.value)} disabled={device === '-1'}>
                    <option value="-1" >Select a Sensor</option>
                    {device!== '-1' && devices[device].sensors.map(sensor => <option value={sensor._id}>{sensor.name}</option>)}
                </select>
            </div>
            <div className="inputContainer">
                <small>Operator</small>
                <select
                    value={operator}
                    onChange={e => setOperator(e.target.value)}
                >
                    <option value="<">Less than ({"<"})</option>
                    <option value="<=">Less than or equal({"<="})</option>
                    <option value= "==">Equals (=)</option>
                    <option value=">">Greater than ({">"})</option>
                    <option value=">=">Greater than or equal({">="})</option>
                </select>
            </div>
            <div className="inputContainer">
                <small>Compare To</small>
                <FormField
                    placeholder = "Enter Value"
                    color = "orange"
                    type="number"
                    value={second}
                    onChange = {e => setSecond(e.target.value)}

                />
            </div>
            <div className="inputContainer">
            <small>Notify By</small>

                <select  onChange={e => setMethod(e.target.value)}>
                    <option value="email" >Email</option>
                    <option value="sms">SMS</option>
                </select>
            </div>
            <div className="inputContainer">
                <small>Notify To</small>
                <FormField
                    placeholder = {`Enter ${method === 'email'?'Email':'Phone No'}`}
                    color = "orange"
                    type="email"
                    value ={email}
                    onChange = {e => setEmail(e.target.value)}

                />
            </div>

            <FormButton
                label="Add"
                onClick= {doAddAction}
                color="orange"
            />    
            <FormButton 
                label="Close"
                onClick={() => setModal(false)}
                color="orange"
            />
        </div>
        
    </div>
        <h1>
            Actions
        </h1>
        <table cellPadding={0} cellSpacing={0}>
        <tr>
            <th>#</th>
            <th>Sensor</th>
            <th>Operator</th>
            <th>Value</th>
            <th>Action</th>
            <th>Recepient</th>
        </tr>
        {actions !== -1 && actions.map(
            (action,index) => <tr>
                <td>{index+1}</td>
                <td>{action.sensor}</td>
                <td>{action.condition}</td>
                <td>{action.value}</td>
                <td>{action.action}</td>
                <td>{action.to}</td>
            </tr>
        )}
        </table>
        <FormButton
            label="Add "
            onClick = {() => setModal(true)}
            type="primary"
            color="orange"
        />
    </div>
}