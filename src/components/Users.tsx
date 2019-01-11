import * as React from "react";
import { User } from '../App';

// interface User {
//   id: number,
//   firstName: string,
//   lastName: string,
//   role: string
// }

interface Props {
  // users: { [index: number]: User }
  users: User[]
}

class Users extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <table>
        <tbody>
        {this.props.users.map((user, index) => (
          <tr key={`${user}-${index}`}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.role}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

export default Users;
