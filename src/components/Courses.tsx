import * as React from "react";
import { Course } from '../App';
import * as lodash from 'lodash';

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

interface State extends Props {
  // No additional properties.
}

// A simple component responsible for rendering a list of all courses. Of interest
// is the use of componentWillReceiveProps. Compare this class to Users.
//
// Because the props are used within the constructor to set the state, the course
// list would not be re-rendered with the updated list. In fact, it would remain
// empty.
//
// Of course, this is not strictly necessary here. It may make more sense to avoid
// Courses.state altogether (see Users, for example). However, the demonstrative
// value is apparent.

class Courses extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      courses: this.props.courses
    }
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {

    // Depending on the use case, the following could be made much more efficient.
    // For example, we could just compare the id of each object in the arrays if
    // we know there is no way the other properties on a Course object will change
    // independently of the id. For the purposes of demonstrating this lifecycle
    // method, the following is sufficient.

    if (!lodash.isEqual(this.props.courses, nextProps.courses)) {
      // This will not trigger a re-render additional to that which is already
      // pending.
      this.setState({ courses: nextProps.courses });
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
        {this.state.courses.map((course, index) => (
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
