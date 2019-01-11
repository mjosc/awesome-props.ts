import * as React from "react";
import { Course } from '../App';

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

class Courses extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
    console.log('will receive props');
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
