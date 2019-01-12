import * as React from "react";
import { Course } from './CustomTypes';

// The Course returned from the server lacks the optional properties defined
// within App.tsx. More specifically, the effective Course interface of this
// class is { id: number, courseName: string, creditHours: number, teacher:
// string[] }. The optional properties allow the same User array to be set on
// App.state as well as on Courses.Props.
//
// interface Course {
//   courseId: number,
//   courseName: string,
//   creditHours: number,
//   teacher: string[]
// }

interface Props {
  courses: Course[]
}

interface State {
  id: number,
  index: number
}

// This component implements state for demonstrative purposes only. This can be built out
// in the future but right now simply represents a component who stores data relating to
// that of props but using that data as read-only. Currently, the index and id are hardcoded.
// This does not have to be the case.

// This is purely demonstrative of `componentWillReceiveProps` and subtle differences in
// managing state and props (see Users.tsx). It certainly has imperfections. For
// example, the index could be initialized using `findIndex` on `this.props` or `this.state`
// depending on which implementation is used. Additionally, the id would need to be updated
// either via `this.props` , a button, or a randomizer.

class Courses extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      id: 1,
      index: -1
    }
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {

    // Depending on the use case, the following could be made much more efficient.
    // For example, we could just compare the id of each object in the arrays if
    // we know there is no way the other properties on a Course object will change
    // independently of the id. For the purposes of demonstrating this lifecycle
    // method, the following is sufficient.

    const nextIndex = this.props.courses.findIndex(course => course.courseId == this.state.id);
    if (!(nextIndex == this.state.index)) {
      this.setState({ index: nextIndex });
    }

  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Credit Hours</th>
            <th>Teacher</th>
          </tr>
        {this.props.courses.map((course, index) => (
          <tr key={`${course}-${index}`}>
            <td>{course.courseId}</td>
            <td>{course.courseName}</td>
            <td>{course.creditHours}</td>
            <td>{`${course.teacher?[0] : ''} ${course.teacher?[1] : ''}`}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

export default Courses;
