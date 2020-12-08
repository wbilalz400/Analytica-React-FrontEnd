import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import FormField from '../components/FormField'
import FormButton from '../components/FormButton';
import LightLogo from '../images/light-logo.png';
import loader from "../images/loading-circle-blue.svg";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginView.css';
const styles = {
    leftPane : {
        
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        display: 'flex',
        flex:'9',
        width:'45%',
        minWidth: '340px'
    },
    card : {
        marginRight: '25%', 
        marginLeft: '25%',
        background: 'white',
        border: '5px',
        borderColor: 'white',
        height: '60%',
        boxShadow: "10px 10px 16px -5px rgba(0,0,0,0.75)",
        display: 'flex',
        justifyContent: 'center',
        flexDirection:'column'

    },
    Row : {
        height :"100%",
        minHeight: '600px',
    }
}
 

export default class LoginView extends React.Component {

    // Aamir was here
    constructor() {
        super();
        this.state = {
            email: '',
            pass: '',
            errEmail: false,
            errPass: false,
            loading: false,
        }
        this.doLogin = () => {
            var valid = true;
            if (this.state.loading) return;
            this.setState({errEmail: false, errPass: false,loading:true});
            if (this.state.email == '')  {
                this.setState({errEmail: true});
                valid = false;
            }
            if (this.state.pass == '') {
                this.setState({errPass: true});
                valid = false;
            }
            if (!valid) {
                this.setState({loading:false});
                return;
            }
           
            console.log("Login Called");
            fetch("http://localhost:3001/login",{method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify({email:this.state.email,
            password:this.state.pass})})
            .then(r => r.json())
            .then( d => {
                console.log(d);
                let obj =d
                if (d.status === "OK") {
                    toast.success("Logged In Successfully");
                    this.setState({loading:false});
                    localStorage.setItem("token",d.jwtToken);
                    window.location.href="/home";   
                } else {
                    toast.error("Invalid Credentials");
                    this.setState({loading:false});
                }
            }).catch    (e => {
                toast.error("An unknown error occured");
                this.setState({loading:false});
            })
        }
    }
    
    render() {
        this.fieldChange = (e) => {
            var field = e.target.name;
            if (e.target.name == 'email') {
                
                this.setState({email: e.target.value});
        
            } else {
                this.setState({pass: e.target.value});

            }
        }
        return (
            <div class= 'body'>
            <Row style = {styles.Row}>
            <Col className="left">
                <img src={LightLogo} width='200px'></img>
            <div style={styles.leftPane}>
                <Container style={styles.card}>
                    <FormField label="Email"  color="blue" err={this.state.errEmail} name = "email" type="email" onChange = {this.fieldChange} errLabel="Please enter email" placeholder="abc@xyz.com"/>
                    <FormField label="Password"  color="blue" err={this.state.errPass} name="pass" type="password" onChange = {this.fieldChange} errLabel="Please enter password" />
                    <FormButton loader={loader} color="blue" label="Login" onClick={this.doLogin} loading={this.state.loading} />
                </Container>
            </div>
            </Col>
            <Col className="rightCol">
                <div className='rightPane'>
                <h1>Login</h1>
                <h2>Enter your email and password to login and access you analytics!</h2>
                <p>Not a user? <a href='/register'>Register today</a></p>
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