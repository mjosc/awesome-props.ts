import * as React from 'react';
import Registration from './components/Registration';
import './App.css';

import { configureAuthHeader } from "./helpers/authorization";
import axios from "axios";

interface User {
  username: string,
  password: string,
  role: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string
}

interface State {
  token: string,
  users: {}
}

interface Props {
  // Not implemented.
}

class App extends React.Component<Props, State> {

  domain: string = 'https://localhost:5001';

  constructor(props: Props) {
    super(props);
    this.state = {
      token: '',
      users: {}
    };
  }

  // should this be a state property or a property on the class?
  // Each time a token is received the user list needs to be updated.
  saveToken = (token: string) => {
    this.setState({ token }, () => this.getUserList());
  };

  getToken = () => this.state.token;
  // registerUser = (user: User) =>

  getUserList = () => {
    axios.get('https://localhost:5001/api/users', configureAuthHeader(this.state.token))
      .then(res => console.log(res.data))
      .catch(err => console.log(err.res.data));
  };

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>awesome-props.ts</h1>
          <p>A simple exploration of TypeScript + React + JWT</p>
        </div>
        <div className='App-console'>
          <div className='App-console--left'>

            <Registration
              domain={this.domain}
              token={this.state.token}
              saveToken={this.saveToken}
            />

          </div>
          <div className='App-console--right'>
            <Modify/>
          </div>
        </div>
        <div className='App-messages'>
          messages
        </div>
        <div className='App-results'>
          <div className='App-results--left'>
            users
          </div>
          <div className='App-results--right'>
            courses
          </div>
        </div>

      </div>
    );
  }
}

class Modify extends React.Component {
  render() {
    return (
      <div>add/remove</div>
    )
  }
}

export default App;
export { User };
