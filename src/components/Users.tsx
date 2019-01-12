import * as React from "react";
import { User } from './CustomTypes';
import * as lodash from "lodash";

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

interface State extends Props{
  id: number,
  index: number
}


// This component implements state for demonstrative purposes only. This can be built out
// in the future but right now simply represents a component whose data will be
// manipulated. Currently, the index and id are hardcoded. This does not have to be the
// case.

// This is purely demonstrative of `componentWillReceiveProps` and subtle differences in
// managing state and props (see Courses.tsx). It certainly has imperfections. For
// example, the index could be initialized using `findIndex` on `this.props` or `this.state`
// depending on which implementation is used. Additionally, the id would need to be updated
// either via `this.props` , a button, or a randomizer.

class Users extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      users: this.props.users,
      id: 42,
      index: -1
    }
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    if (!lodash.isEqual(this.props.users, nextProps.users)) {
      const nextIndex = this.state.users.findIndex(user => user.userId == this.state.id);
      this.setState(state => ({ ...state, index: nextIndex, users: nextProps.users }));
    }
  }

  render() {
    return (
      <table>
        <tbody>
        <tr>
          <th>User ID</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
        {this.state.users.map((user, index) => (
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
