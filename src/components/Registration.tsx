import * as React from 'react';
import axios from 'axios';
import { User } from '../App';

// The Registration state matches the User definition exactly. The
// State interface is empty but permits a change of name for readability
// and more uniform code.

interface State extends User {
  // No additional properties.
}

interface Props {
  domain: string,
  token: string,
  saveToken(token: string): void // Callback passed from App
}


// This is a controlled component responsible for registering users and
// updating the web token stored on the App component.

class Registration extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: 'pw',       // Default values to avoid typing so much.
      role: 'student',      // The only uniqueness constraint is on the
      firstName: 'test',    // username.
      lastName: 'test',
      dateOfBirth: '1950-05-12'
    }
  }

  // Use the name of the input field as both the id and key in this.state
  // for efficient passing from the triggered event to the state.

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    this.setState(state => ({ ...state, [target.id]: target.value }));
  };

  // Register the new user and save the JWT returned from the server. The
  // token will be used in subsequent requests for authorized API access.

  handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    axios.post('https://localhost:5001/api/users/register', this.state)
      .then(res => this.props.saveToken(res.data.token))
      .catch(err => console.log(err.res.data));
  };

  // A simple (and non-styled) form for registering new users.

  render() {
    return (
      <div>
        <form>
          {
            Object.keys(this.state).map((value: string) => (
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
      </div>
    );
  }
}

export default Registration;
