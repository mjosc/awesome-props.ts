import * as React from 'react';
import axios from 'axios';
import { User } from '../App';

interface State extends User {
  // No additional properties.
}

interface Props {
  domain: string,
  token: string,
  saveToken(token: string): void // better way to pass a named param whose value is a function to the component?
}

// Responsible for registering the user and retrieving the returned token.
class Registration extends React.Component<Props, State> {
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
      .then(res => this.props.saveToken(res.data.token))
      .catch(err => console.log(err.res.data));
  };

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