import * as React from "react";
import { User } from '../App';

// The User returned from the server lacks the optional properties defined
// within App.tsx. More specifically, the effective User interface of this
// class is { id: number, firstName string, lastName: string, role: string }.
// The optional properties allow the same User array to be set on App.state
// as well as on Users.Props.
//
// interface User {
//   userId: number,
//   firstName: string,
//   lastName: string,
//   role: string
// }

interface Props {
  users: User[]
}

// A simple, state-less component responsible for rendering a list of all
// users. Compare this implementation to Courses.tsx where
// componentWillReceiveProps is used.

class Users extends React.Component<Props, {}> {

  render() {
    return (
      <table>
        <tbody>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {this.props.users.map((user, index) => (
          <tr key={`${user}-${index}`}>
            <td>{user.userId}</td>
            <td>{`${user.firstName} ${user.lastName}`}</td>
            <td>{user.role}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

export default Users;
