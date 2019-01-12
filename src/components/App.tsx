import * as React from 'react';
import { User, Course } from './CustomTypes';
import Registration from './Registration';
import Users from './Users';
import Courses from './Courses';
import './App.css';

import {configureAuthHeader} from "../helpers/authorization";
import axios from "axios";

interface State {
  token: string,
  users: User[],
  courses: Course[]
}

interface Props {
  // Not implemented.
}

// The App component keeps track of the application's "global" state. Sure,
// the current JWT could be stored on the localStorage object and accessed
// via helper method in any component, however, the current implementation
// provides a bit more practice with React's data flow.

class App extends React.Component<Props, State> {

  domain: string = 'https://localhost:5001';
  intervalIds = { users: -1, courses: -1 };

  constructor(props: Props) {
    super(props);

    // The web token is actually the token pertaining to the most recent
    // registered user. To add the ability to access the API/database from
    // any currently authenticated user, simply map all registered user ids
    // to their tokens.
    //
    // This is obviously not the best way to handle authentication but it
    // at least provides practice with receiving the token from the server
    // and returning it in the authentication header with each subsequent
    // request.

    this.state = {
      token: '', // JWT
      users: [],
      courses: []
    };

  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    console.log('will receive props from app');
  }

  // window.setInterval is required to avoid ambiguous typings; setInterval
  // returns a NodeJS.Timer object.
  //
  // The following interval methods result in a 401 unauthorized until the
  // first user is registered or after the most recent token has expired.
  // These errors are simply logged to the console.

  componentDidMount(): void {

    this.intervalIds.users = window.setInterval(
      () => this.getUserList(),
      5000,
    );

    // Use setTimeout to interweave the two intervals.

    setTimeout(() => {
      this.intervalIds.courses = window.setInterval(
        () => this.getCourseList(),
        5000
      )
    }, 2500);
  }


  componentWillUnmount(): void {
    window.clearInterval(this.intervalIds.users);
    window.clearInterval(this.intervalIds.courses);
  }

  // Each time a new token is received, a new user has been registered; update
  // the user list accordingly.
  //
  // saveToken is passed to Register in order to access the server's response
  // to the POST request.

  saveToken = (token: string) => {
    this.setState({token}, () => this.getUserList());
  };

  // API calls. These methods set state on the user and course lists.

  getUserList = () => {
    axios.get(`${this.domain}/api/users`, configureAuthHeader(this.state.token))
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err.response.data));
  };

  getCourseList = () => {
    axios.get(`${this.domain}/api/courses`, configureAuthHeader(this.state.token))
      .then(res => this.setState({ courses: res.data }))
      .catch(err => console.log(err.response.data));
  };

  // A rather busy render method. This is a side-effect of the single page
  // design (not in the SPA-context of which React is usually considered).
  // A more robust implementation would involve separate pages for sign-up,
  // login, etc. The focus of this app is practice with TypeScript + React
  // and using React.componentWillReceiveProps.

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

            TODO: Add/Remove courses

          </div>
        </div>
        <div className='App-messages'>

          TODO: Messages

        </div>
        <div className='App-results'>
          <div className='App-results--left'>

            <Users users={this.state.users} />

          </div>
          <div className='App-results--right'>

            <Courses courses={this.state.courses} />

          </div>
        </div>

      </div>
    );
  }
}

export default App;
export {User, Course};
