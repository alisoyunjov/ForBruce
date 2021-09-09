import React, { useState, useRef,useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../styles.scss';
import { Alert } from 'react-alert';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import blastApi from '../components/api/blast';
import authHeader from '../services/auth-header';
const API_URL = 'http://localhost:8082/api';
const user = JSON.parse(localStorage.getItem('user'));
const Blastn = (props) => {
const [state, setState] = useState({
    queryPath: '',
    receivedDate: "",
    cellType: '',
    basecalling: '',
    lengthOfBlast: "",
    identity: "",
    samplelist: ""
});
const [errorMsg, setErrorMsg] = useState('');
const handleChange = (event) => {
    setState({
        ...state,
        [event.target.name]: event.target.value
    });
};
const showSuccess = async () =>{
    
}
const handleOnSubmit = async (event) => {
    event.preventDefault();
    
    const {queryPath, receivedDate, cellType, basecalling, lengthOfBlast, identity, samplelist} = state;
    const payload = {queryPath, receivedDate, cellType, basecalling, lengthOfBlast, identity, samplelist};   
    await blastApi.startWorkFlow(payload).then(res => {
        console.log(res.data)
    });

    props.history.push('/blastn');       
};
return (
<>
<br />
<Container>    
<Row>
<Col md={{ span: 8, offset: 2}}>
<Jumbotron>
<h1>Please enter your parameters</h1>
<Form onSubmit={handleOnSubmit}>
{errorMsg && <p className="errorMsg">{errorMsg}</p>}
<Form.Group>
<Form.Label>Received Date</Form.Label>
<Form.Control
type="date"
name = "receivedDate"
value={state.receivedDate}
onChange={handleChange}
/>
</Form.Group>
<Form.Group>
<Form.Label>
Query Path
</Form.Label>
<Form.Control 
as="textarea" 
rows="1"
placeholder = '/home/ubuntu/20210422KINGCR/20210422KINGCR.fasta'
name = "queryPath"
value = {state.queryPath}
onChange = {handleChange} 
/>
</Form.Group>
<Form.Row>
<Form.Group as={Col} controlId="formGridBreed">
<Form.Label>Flow Cell Type</Form.Label>
<Form.Control
as="select"
value={state.cellType}
name = "cellType"
onChange={handleChange}
>
<option>Select</option>
<option>Flongle</option>
<option>MinION</option>
</Form.Control>
</Form.Group>
<Form.Group as={Col} controlId="formGridBreed">
<Form.Label>Basecalling </Form.Label>
<Form.Control
as="select"
value={state.basecalling}
name = "basecalling"
onChange={handleChange}
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
value = {state.lengthOfBlast}
onChange = {handleChange} 
/>
</Form.Group>
<Form.Group>
<Form.Label>
Identity of Blast alignment
</Form.Label>
<Form.Control 
as="textarea" 
rows="1"

name = "identity"
value = {state.identity}
onChange = {handleChange} 
/>
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
value = {state.samplelist}
onChange = {handleChange} 
/>
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
);
};
export default Blastn;


