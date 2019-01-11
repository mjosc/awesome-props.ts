import * as React from 'react';
import axios from 'axios';

import './App.css';

interface State {
  token: string,
  users: {}
}

class App extends React.Component<{}, State> {

  domain: string = 'https://localhost:5001';

  constructor(props: {} = {}) {
    super(props);
    this.state = {
      token: '',
      users: {}
    };
  }

  // should this be a state property or a property on the class?
  saveToken = (token: string) => {
    this.setState({ token }, () => console.log(this.state));
  };
  getToken = () => this.state.token;
  // registerUser = (user: User) =>

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

interface User {
  username: string,
  password: string,
  role: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string
}

interface Props {
  domain: string,
  token: string,
  saveToken: (token: string) => void // better way to pass a named param whose value is a function to the component?
}

// Responsible for registering the user and retrieving the returned token.
class Registration extends React.Component<Props, User> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      role: '',
      firstName: '',
      lastName: '',
      dateOfBirth: ''
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    this.setState(state => ({ ...state, [target.id]: target.value }));
  };

  handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    axios.post('https://localhost:5001/api/users/register', this.state)
      .then(res => {
        console.log(res.data);
        this.props.saveToken(res.data.token);
      })
      .catch(err => console.log(err.res.data));
  };

  render() {
    return (
      <div>
        <form>
          {
            Object.keys(this.state).map((value, index) => (
              <React.Fragment key={value} >
                <input
                  id={value}
                  type={value}
                  placeholder={value}
                  value={this.state[value]}
                  onChange={this.handleChange}
                />
              </React.Fragment>
            ))
          }
          <input
            type='submit'
            value={'Submit'}
            onClick={this.handleSubmit}
          />
        </form>
        <button>Register</button>
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
