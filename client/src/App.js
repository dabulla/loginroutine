import React, { Component } from 'react';
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      remember: false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleSubmit = event => {
    event.preventDefault();
    try {
      // TODO: client side hash password
      axios.post('/users', {email: this.state.email, password: this.state.password})
      .then(function(response) {
        console.log(response);
        alert("Logged in " + JSON.stringify(response));
        //Perform action based on response
    })
      .catch(function(error){
        console.log(error);
        //Perform action based on error
      });
    } catch (e) {
      alert(e.message);
    }
  }
  render() {
    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>E-Mail: </Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </Form.Group>
        <Form.Group controlId="remember">
          <Form.Check label="Remember me" 
            value={this.state.remember}
            onChange={this.handleChange}
            />
        </Form.Group>
        <Button type="submit">Submit</Button>
        <p>Register</p>
        <p>Forgot password</p>
      </Form>
    </div>
    );
  }
}

export default App;
