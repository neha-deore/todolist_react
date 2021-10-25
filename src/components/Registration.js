import React, { Component } from 'react';
import axios from 'axios'

import {Container,Row,Button,InputGroup,Form,Col} from 'react-bootstrap';
import { Redirect } from 'react-router';
//defining validations
const regForName=RegExp(/^[a-zA-Z]{3,100}$/);
const regForEmail=RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass=RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);

//assigning default values
export class Registration extends Component {
    constructor(props){
        super(props);
        this.state={
            //objects
           dataVal:{ 
                fname:null,
                lname:null,
                uname:null,
                email:null,
                
                password:null,
                confirm:null
            
            },
           errors:{
                fname:'',
                lname:'',
                uname:'',
                email:'',
                password:'',
                confirm:''
              
            },
            formData:[],
            dataform:[]
        }
    }

    //connecting to the server
    componentDidMount(){
        const URL="http://localhost:3001/UserData"
        fetch(URL)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({dataform:data})
        })

    }
    //for check  validations and handling errors
    handler=(event)=>{
            const{name,value}=event.target;
            // this.setState({[name]:value})
            let errors=this.state.errors;
            let fetchVal = this.state.dataVal;
            console.log(fetchVal)
            switch(name){
                case 'fname':
                    errors.fname=regForName.test(value)?'':'Name should be in aplahbets';
                    fetchVal.fname = value;
                    break;

                case 'lname':
                    errors.lname=regForName.test(value)?'':'Last Name should be in aplahbets';
                    fetchVal.lname = value;
                    break;
                
                case 'uname':
                errors.uname=regForName.test(value)?'':'userName should be in aplahbets';
                fetchVal.uname = value;
                break;

                case 'email':
                       errors.email=regForEmail.test(value)? '':'Email is not valid';
                       fetchVal.email = value;
                       break;
             
                case 'password':
                       errors.password=regForPass.test(value)? '':'password should be in aplhanumeric & special chars';
                       fetchVal.password = value;
                        this.state.password=value;
                       break;
                       
                case 'confirm':
                       errors.confirm=value === this.state.password?'': 'password should not matched';
                       fetchVal.confirm = value;

                       break;
              
                }
                this.setState({errors,[name]:value},()=>{
                    console.log(errors)
                })
               
        }
        
        //after submitting form 
        formSubmit=(event)=>{
            event.preventDefault()
            if(this.validate(this.state.error)){
                let info = {fname:this.state.fname,lname:this.state.lname,uname:this.state.uname,email:this.state.email,password:this.state.password}
                const URL="http://localhost:3001/UserData"
                axios.post(URL,info).then((response)=>{})
                // document.getElementById('myform').reset()
                window.location.replace("/")
            }
            else{
                alert('Form Rejected')
            }
        }
        // formSubmit=(event)=>{
        //     event.preventDefault();
        //     let items = this.state.dataVal;
        //     console.log(items)
           
        //    if(this.validate(this.state.errors))
        //     {
        //         alert("Registration Succesfull");
        //         this.setState({
        //             formData : [...this.state.formData,
        //                 {  "fname":items.fname,
        //                 "lname":items.lname,
        //                "uname":items.uname,
        //                 "email":items.email,
        //                 "password":items.password
        //               }]
        //             });   
                  
        //             document.getElementById('fname').value='';  
        //             document.getElementById('lname').value='';   
        //             document.getElementById('uname').value='';        
        //             document.getElementById('email').value='';

        //             document.getElementById('password').value='';
        //             document.getElementById('confirm').value='';
          
        //         }            
        //         else {
        //            alert("Invalid Form");
        //            document.getElementById('fname').value='';
        //            document.getElementById('lname').value='';   
        //            document.getElementById('uname').value='';          
        //            document.getElementById('email').value='';
                
        //            document.getElementById('password').value='';
        //            document.getElementById('confirm').value='';
                
        //         }
        //         let formData={uname:this.state.dataVal.uname,email:this.state.dataVal.email,password:this.state.dataVal.password}
        //     const URL="http://localhost:3001/UserData";
        //     console.log(formData)
        //     }

            
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
        //   validate=(errors)=>{
        //      let valid=true;
        //      Object.values(errors).forEach((val)=> val.length >0 && (valid=false));
        //      return valid;
        //  }
       
         //for showing password
        showPassword=()=>{
            let checknode=document.getElementById("check")
            let pwd= document.getElementById('password')
            let cpass= document.getElementById('confirm')
            if(checknode.checked){
                pwd.type="text";
                cpass.type="text";

            }
            else{
                pwd.type="password";
                cpass.type="password"
            }

        }
        //for getting data
        // getData=(event)=>{
        //     event.preventDefault();
        //     let formData={uname:this.state.dataVal.uname,email:this.state.dataVal.email,password:this.state.dataVal.password}
        //     const URL="http://localhost:3001/UserData";
        //     console.log(formData)
        //     fetch(URL,{
        //         method:"POST",
        //         headers:{
        //             "Content-type":"application/json"
        //          },
        //          body:JSON.stringify(formData)
        //     })
    
        //     .then(res=>res.json())
        
        //     .then(data=>{
        //         alert("Data added");
           
        //     fetch(URL)
        //     .then(res=>res.json())
        //     .then(data=>{
        //         console.log(data)
        //         this.setState({dataform:data})
        //     })
    
        //    })
        //    let info = {ename:this.state.ename,age:this.state.age,city:this.state.city,gender:this.state.gender,salary:this.state.salary}
            // const URL="http://localhost:3001/Employee"
        //     axios.post(URL,formData).then((response)=>{})
        // } 

        //main body
    render() {
        const {errors}=this.state;
       
        return (
            
            <Container className="container1 bg-dark  text-light">
                <h2 className="pt-2 pb-3 text-center text-warning">Registration Form</h2>
                <Row>
                <Col lg={6}>
                    <Form onSubmit={this.formSubmit} className="bord1 ml-5" >
                        
                        <Form.Group className="mb-3" >
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="fname" id="fname" onChange={this.handler} required/>
                            {errors.fname.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.fname}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" name="lname" id="lname" onChange={this.handler} required/>
                            {errors.lname.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.lname}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>User Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter User Name" name="uname" id="uname" onChange={this.handler} required/>
                            {errors.uname.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.uname}</p>}
                        </Form.Group>

                        
                        <Form.Group className="mb-3" >
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" name="email" id="email" onChange={this.handler} required/>
                            {errors.email.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.email}</p>}
                        </Form.Group>

                  
                        <Form.Group className="mb-3" >
                            <Form.Label>Pasword:</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" name="password" id="password" onChange={this.handler} required />
                            {errors.password.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.password}</p>}
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Confirm Password:</Form.Label>
                            <Form.Control type="password" placeholder="Enter ConfirmPassword" name="confirm" id="confirm" onChange={this.handler} required/>
                            {errors.confirm.length>0 && 
                            <p style={{color:'red',fontWeight:"bold"}}>{errors.confirm}</p>}
                        </Form.Group>

                        <InputGroup className="mb-3">
                      
                        <Form.Label className="mr-2" >ShowPassword:</Form.Label>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" id="check" onChange={this.showPassword} />
                        </InputGroup>
                                            
                         <Button variant="success" type="submit" href="/"> Register</Button>
                        

                    </Form>
                    </Col>
                </Row>
            </Container>
     )

  }   
  
    }
export default Registration;
