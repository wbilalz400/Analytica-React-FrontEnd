import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import FormField from '../components/FormField'
import FormButton from '../components/FormButton';
import LightLogo from '../images/light-logo.png';
import loader from "../images/loading-circle-orange.svg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterView.css';
const styles = {
    leftPane : {
        
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        flex:'9',
        width:'57%',
        minWidth: '340px'
    },
    card : {
        marginRight: '25%', 
        marginLeft: '25%',
        background: 'white',
        border: '5px',
        borderColor: 'white',
        height: '95%',
        boxShadow: "10px 10px 16px -5px rgba(0,0,0,0.75)",
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'column'

    },
    Row : {
        height :"100%",
        minHeight: '600px',
        flexFlow: 'row-reverse'
    }
}
 

export default class RegisterView extends React.Component {

    // Aamir was here
    constructor() {
        super();
        this.state = {
            email: '',
            pass: '',
            name: '',
            conPass : '',
            phone: '',
            errEmail: false,
            errPass: false,
            errConPass: false,
            errName: false,
            loading: false,
        }
        this.doRegister = () => {
            var valid = true;
            if (this.state.loading) return;
            this.setState({
                errEmail: false,
                 errPass: false,
                 errConPass: false,
                 errName: false,

                 loading:true});

            if (this.state.email == '')  {
                this.setState({errEmail: true});
                valid = false;
            }
            if (this.state.pass == '') {
                this.setState({errPass: true});
                valid = false;
            }
            if (this.state.name == '') {
                this.setState({errName: true});
                valid = false;
            }
            if (this.state.pass !== this.state.conPass) {
                this.setState({errConPass:true, conPassErr: "Password do not match"});
                valid = false;
            } else if (this.state.conPass == '') {
                this.setState({errConPass:true, conPassErr: "Please confirm password"});
                valid = false;

            }
            if (!valid) {
                this.setState({loading:false});
                return;
            }
            let data = {
                email : this.state.email,
                name : this.state.name,
                password: this.state.pass,
                type: "USER",
            };
            if (this.state.phone != '') {
                data.phone = this.state.phone;
            }
            
            data = JSON.stringify(data);
            console.log("Register Called");
            fetch("http://localhost:3001/register",{method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:data
            })      
            .then(r => r.json())
            .then( d => {
                console.log(d);
                let obj =d
                if (d.status === "OK") {
                    toast.success("Registered Successfully");
                    this.setState({loading:false});
                    localStorage.setItem("token",d.data.token);
                    window.location.href = '/home';
                } else {
                    toast.warn("Some Error Occured");
                this.setState({loading:false});

                }
            }).catch(err =>{
                toast.warn("Some Error Occured");
                this.setState({loading:false});
            });
        }
    }
    
    render() {
        this.fieldChange = (e) => {
            var field = e.target.name;
            switch (e.target.name) {
                case 'name':
                    this.setState({name: e.target.value});
                    break;
                case 'email':
                    this.setState({email: e.target.value});
                    break;
                case 'pass':
                    this.setState({pass: e.target.value});
                    break;
                case 'confirmpass':
                    this.setState({conPass: e.target.value});
                    break;
                case 'name':
                    this.setState({name: e.target.value});
                    break;
                case 'phone':
                    this.setState({phone: e.target.value});
                    break;
            }
        }
        return (
            <div class= 'body registerBody'>
            <Row style = {styles.Row}>
            <Col className="right">
                <img src={LightLogo} width='200px'></img>
            <div style={styles.leftPane}>
                <Container style={styles.card}>
                <p style ={{fontSize: '0.8rem'}}>All fields marked with  <span style={{color:'red'}}>*</span> are required</p>
                    <FormField required="true" color='orange' label="Full Name" err={this.state.errName} name="name" type="text" onChange = {this.fieldChange} errLabel="Please enter valid name" />
                    <FormField  required="true" color='orange' label="Email"  err={this.state.errEmail} name = "email" type="email" onChange = {this.fieldChange} errLabel="Please enter email" />
                    <FormField required="true" color='orange' label="Password" err={this.state.errPass} name="pass" type="password" onChange = {this.fieldChange} errLabel="Please enter password" />
                    <FormField required="true" color='orange' label="Confirm Password" err={this.state.errConPass} name="confirmpass" type="password" onChange = {this.fieldChange} errLabel={this.state.conPassErr} />
                    <FormField  color='orange' label="Phone" err={false} name="phone" type="number" onChange = {this.fieldChange} errLabel="" />

                    <FormButton loader={loader} color="orange" label="Register" onClick={this.doRegister} loading={this.state.loading} />
                </Container>
            </div>
            </Col>
            <Col className="rightCol">
                <div className='rightPane'>
                <h1>Register</h1>
                <h2>Register today to gain access to easy analytics!</h2>
                <p>Already a user? <a href='/login'>Login Here</a></p>
                </div>
            </Col>
            </Row>
            
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              
            />

            </div>
        );
    }
}