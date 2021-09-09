import React, { Component, useState, useRef,useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../styles.scss';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import blastApi from '../components/api/blast';
import userapi from '../components/api/userApi';
import authHeader from '../services/auth-header';

const user = JSON.parse(localStorage.getItem('user'));
class Blastn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            queryPath: '',
            receivedDate: "",
            cellType: '',
            basecalling: '',
            lengthOfBlast: "",
            identity: "",
            samplelist: "",
            emailist:[],
            experimentType:"",
            databasePath: "",
            userEmail: '',
            errors:{},
            
        }
    }
    componentDidMount = async () => {
      
      await userapi.getEmailbyName(user.name).then(users => {
          this.setState({
              emailist: users.data.data,
          })
          
      })
  }

    
    handleChange = async e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleValidation = () =>{
        const {queryPath, emailist, experimentType, databasePath, receivedDate, cellType, basecalling, lengthOfBlast, identity, samplelist} = this.state; 
        let errors = {};
        let formIsValid = true;
        if (experimentType == ''){
            formIsValid = false;
            errors["ExperimentType"] = "Experiment type cannot be empty";
           
        } 
        else if (experimentType != 'Covid'){
          if (queryPath == ''){
            formIsValid = false;
            errors["QueryPath"] = "Query path cannot be empty";
           
          }
          if (databasePath == ''){
            formIsValid = false;
            errors["DatabasePath"] = "Database path cannot be empty";
           
          }
          if (receivedDate == ''){
            formIsValid = false;
            errors["ReceivedDate"] = "ReceivedDate cannot be empty";
           
          }
          if (lengthOfBlast == ''){
            formIsValid = false;
            errors["LengthOfBlast"] = "Length of minimum Blast cannot be empty";
           
          }
          if (identity == ''){
            formIsValid = false;
            errors["Identity"] = "Identity cannot be empty";
           
          }
          if (samplelist == ''){
            formIsValid = false;
            errors["Samplelist"] = "Samplelist cannot be empty";
           
          }
        }
        else {
            if (queryPath == ''){
                formIsValid = false;
                errors["QueryPath"] = "Query path cannot be empty";
               
            }
            if (receivedDate == ''){
                formIsValid = false;
                errors["ReceivedDate"] = "ReceivedDate cannot be empty";
               
            }
            if (lengthOfBlast == ''){
                formIsValid = false;
                errors["LengthOfBlast"] = "Length of minimum Blast cannot be empty";
               
            }
            if (identity == ''){
                formIsValid = false;
                errors["Identity"] = "Identity cannot be empty";
               
            }
            if (samplelist == ''){
                formIsValid = false;
                errors["Samplelist"] = "Samplelist cannot be empty";
               
            }
        }
        this.setState({
          ...this.state,
          errors: errors
        });
        return formIsValid;
    
    }

    handleOnSubmit = async (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            const {queryPath, errors, emailist, experimentType, databasePath, receivedDate, cellType, basecalling, lengthOfBlast, identity, samplelist} = this.state;
            
            var list = emailist.map((user) =>
            (
               user.email
            ));
           
            const payload = {queryPath, emailist, list, experimentType, databasePath, receivedDate, cellType, basecalling, lengthOfBlast, identity, samplelist};
            fetch('http://localhost:8082/api/blastn/run' , {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then((result) => result.json())
            .then((info) => { console.log(info); }) 
            window.alert('Blastn workflow has started successfully'); 
            window.location.reload();
        }else{
            alert("Form has errors.")
        }    
    }

    render() {
        const {errors, queryPath, emailist, experimentType, databasePath, receivedDate, cellType, basecalling, lengthOfBlast, identity, samplelist} = this.state;     
        return (
            <>
            <br />
            <Container>    
            <Row>
            <Col md={{ span: 8, offset: 2}}>
            <Jumbotron>
            <h1 style = {{marginBottom: '30px'}}>Please enter your parameters</h1>
            <Form onSubmit={this.handleOnSubmit}>
            <Form.Row>
            <Form.Group as={Col} >
            <Form.Label>Experiment Type</Form.Label>
            <Form.Control
            as="select"
            value={experimentType}
            name = "experimentType"
            onChange={this.handleChange}
            >
            <option>Select</option>
            <option>Covid</option>
            <option>Helicobacter pylori</option>
            </Form.Control>
            <span style={{color: "red"}}>{errors["ExperimentType"]}</span>
            </Form.Group>
            <Form.Group style = {{width: '50%'}}>
            <Form.Label>Received Date</Form.Label>
            <Form.Control
            type="date"
            name = "receivedDate"
            value={receivedDate}
            onChange={this.handleChange}
            />
            <span style={{color: "red"}}>{errors['ReceivedDate']}</span>
            </Form.Group>

            </Form.Row>
            <Form.Group>
            <Form.Label>
            Query Path
            </Form.Label>
            <Form.Control 
            as="textarea" 
            rows="1"
            placeholder = '/home/ubuntu/20210422KINGCR/20210422KINGCR.fasta'
            name = "queryPath"
            value = {queryPath}
            onChange = {this.handleChange} 
            />
            <span style={{color: "red"}}>{errors['QueryPath']}</span>
            </Form.Group>
            { experimentType != 'Covid' && experimentType != ''  && ( 
            <Form.Group>
            <Form.Label>
            Database Path
            </Form.Label>
            <Form.Control 
            as="textarea" 
            rows="1"
            placeholder = '/home/ubuntu/20210422KINGCR/20210422KINGCR.fasta'
            name = "databasePath"
            value = {databasePath}
            onChange = {this.handleChange} 
            />
            <span style={{color: "red"}}>{errors['DatabasePath']}</span>
            </Form.Group>
            )}
            <Form.Row>
            <Form.Group as={Col} controlId="formGridBreed2">
            <Form.Label>Flow Cell Type</Form.Label>
            <Form.Control
            as="select"
            value={cellType}
            name = "cellType"
            onChange={this.handleChange}
            >
            <option>Select</option>
            <option>Flongle</option>
            <option>MinION</option>
            </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridBreed3">
            <Form.Label>Basecalling </Form.Label>
            <Form.Control
            as="select"
            value={basecalling}
            name = "basecalling"
            onChange={this.handleChange}
            >
            <option>Select</option>
            <option>Basecalling is done on MK1C</option>
            <option>Basecalling is needed</option>
            </Form.Control>
            </Form.Group>
            </Form.Row>
            <Form.Group>
            <Form.Label>
            Length of minimum Blast
            </Form.Label>
            <Form.Control 
            as="textarea" 
            rows="1"
            name = "lengthOfBlast"
            value = {lengthOfBlast}
            onChange = {this.handleChange} 
            />
            <span style={{color: "red"}}>{errors['LengthOfBlast']}</span>
            </Form.Group>
            <Form.Group>
            <Form.Label>
            Identity of Blast alignment
            </Form.Label>
            <Form.Control 
            as="textarea" 
            rows="1"
            
            name = "identity"
            value = {identity}
            onChange = {this.handleChange} 
            />
            <span style={{color: "red"}}>{errors['Identity']}</span>
            </Form.Group>
            <Form.Row>
            </Form.Row>
            <Form.Group>
            <Form.Label>
            Samplelist
            </Form.Label>
            <h6>Please follow the same format as below use 'barcode01' instead of 'barcode1' when the code is smaller than 10</h6>
            <Form.Control as="textarea" rows="3" 
            name = "samplelist"
            placeholder = {("barcode10,samplenameX\n").concat("barcode11,samplenameY\n", "barcode12,samplenameZ")}
            value = {samplelist}
            onChange = {this.handleChange} 
            />
            <span style={{color: "red"}}>{errors['Samplelist']}</span>
            </Form.Group>               
            <Button variant="primary" type="submit">
            Run
            </Button>
            </Form>
            </Jumbotron>
            </Col>
            </Row>
            </Container>
            </>            
        )
    }
}

export default Blastn