import React , {Component} from 'react'
import axios from 'axios'
import {Container,Row,Button,InputGroup,Form,Col, FormControl} from 'react-bootstrap';
import { Redirect } from 'react-router';
//defining validations
const regForName=RegExp(/^[a-zA-Z]{3,100}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
class Registration1 extends Component {
    constructor(props){
        super(props)
        this.state={fname:"",
        lname:"",
        uname:"",
        email:"",
        password:"",
        confirm:"",
            error:{fname:"",lname:"",uname:"",email:"",password:"",confirm:""}
        }
    }
 //for check  validations and handling errors
    handler=(event)=>{
        const {name,value}=event.target
        let error = this.state.error
        switch(name){
            case 'fname':
                error.fname=regForName.test(value)?'':'Name should be in aplahbets';
                break;

            case 'lname':
                error.lname=regForName.test(value)?'':'Last Name should be in aplahbets';
                break;

            case 'uname':
                error.uname=regForName.test(value)?'':'userName should be in aplahbets';
                break;

            case 'email':
                error.email=regForEmail.test(value)? '':'Email is not valid';
                 break;

            case 'password':
                error.password=regForPass.test(value)? '':'password should be in aplhanumeric & special chars';
                
                 break;

            case 'confirm':
                error.confirm= this.state.password===value ?'': 'password should not matched';
                
                break;
       
            default:
        }
        this.setState({error:error,[name]:value})
    }

       //after submitting form 
    formSubmit=(event)=>{
        event.preventDefault()
        if(this.validate(this.state.error)){
            let info = {"fname":this.state.fname,"lname":this.state.lname,"uname":this.state.uname,"email":this.state.email,"password":this.state.password}
            console.log(info)
            const URL="http://localhost:3001/UserData"
            if(this.state.email!=="" && this.state.password!=="" && this.state.fname!=="" 
            && this.state.lname!=="" && this.state.uname!==""){
            axios.post(URL,info).then((response)=>{alert('Registered successfully')})
            window.location.replace("/")
            }
        }
        else{
            alert('Form Rejected')
        }
    }

    //for validating errors
    validate=(error)=>{
        let valid = true
        for(let value of Object.values(error)){
            if(value.length>0){
                valid = false
            }
        }
        return valid
    }

    //registration form
    render(){
        return(
            <Container  className="container1 bg-dark  text-light">
                <h2 className="pt-2 pb-3  text-center text-warning">Registration Form</h2>
                <Row>
                <Col  lg={8}>
                <form id="myform"   className="bord1 p-4 ml-5">
              
                <Form.Group className="mb-3 ">
                   <Form.Label> First Name:</Form.Label>
                    <Form.Control type="text" className="form-control" name="fname" onChange={this.handler} aria-describedby="fnameHelp"/>
                    <Container id="fnameHelp" className="form-text text-danger">{this.state.error.fname}</Container>
               </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label> Last Name</Form.Label>
                    <Form.Control type="text" className="form-control" name="lname" onChange={this.handler} aria-describedby="lnameHelp"/>
                    <Container id="lnameHelp" className="form-text text-danger">{this.state.error.lname}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                   <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" className="form-control" name="uname" onChange={this.handler} aria-describedby="unameHelp"/>
                    <Container id="unameHelp" className="form-text text-danger">{this.state.error.uname}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                    <Form.Control type="text" className="form-control" name="email" onChange={this.handler} aria-describedby="emailHelp"/>
                    <Container id="cityHelp" className="form-text text-danger">{this.state.error.email}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="form-control" name="password" onChange={this.handler} aria-describedby="passwordHelp"/>
                    <Container id="passwordHelp" className="form-text text-danger">{this.state.error.password}</Container>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type="password" className="form-control" name="confirm" onChange={this.handler} aria-describedby="passwordHelp"/>
                    <Container id="passwordHelp" className="form-text text-danger">{this.state.error.confirm}</Container>
                </Form.Group>

                <button onClick={this.formSubmit} className="btn btn-primary">Submit</button>
                </form>
                </Col>
                </Row>
                
            </Container>
        )
    }
}

export default Registration1