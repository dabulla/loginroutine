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
      remember: false,
      loggedin: false,
      mailvalid: false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleLogoff = event => {
    event.preventDefault();
    try {
      let that = this;
      axios.post('/users', {logoff: true})
      .then(function(response) {
        that.setState({loggedin: response.data.loggedin});
        that.forceUpdate();
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
  handleSubmit = event => {
    event.preventDefault();
    try {
      // TODO: client side hash password
      let that = this;
      axios.post('/users', {email: this.state.email, password: this.state.password})
      .then(function(response) {
        console.log(response);
        that.setState({loggedin: response.data.loggedin, mailvalid: response.data.mailvalid});
        if(!that.state.loggedin) {
          alert("Konnte nicht eingeloggt werden!\nTestuser: info@danielbulla.de\nPasswort:test123")
        }
    })
      .catch(function(error){
        console.log(error);
      });
    } catch (e) {
      alert(e.message);
    }
  }
  handleRegister = event => {
    event.preventDefault();
    try {
      // TODO: client side hash password
      let that = this;
      axios.put('/users', {email: this.state.email, password: this.state.password})
      .then(function(response) {
        console.log(response);
        that.setState({loggedin: response.data.loggedin, mailvalid: response.data.mailvalid});
    })
      .catch(function(error){
        console.log(error);
      });
    } catch (e) {
      alert(e.message);
    }
  }
  /*componentDidMount() {
    //HACK: gets session object to read "loggedin" property :(
    let that = this;
    axios.get('/users')
    .then(function(response) {
      that.setState({loggedin: response.data.loggedin, mailvalid: response.data.mailvalid});
    });
  }*/
  render() {
    if(this.state.loggedin)
    {
      return <div>
                <p>This can only be viewed for logged in users.</p>
                <Form onSubmit={this.handleLogoff}>
                  <Button type="submit">Abmelden</Button>
                </Form>
             </div>;
    } else {
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
          <button onClick={this.handleRegister.bind(this)}>Register</button>
          <p>Forgot password</p>
        </Form>
      </div>
      );
    }
  }
}

export default App;
