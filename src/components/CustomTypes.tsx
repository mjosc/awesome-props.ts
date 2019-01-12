// The optional properties on the User interface are designed for sharing
// of the same type between App.tsx and Users.tsx. For example, the User
// object as defined here represents the body of the POST request while
// the User object minus the optional properties represents the incoming
// User objects in the body of the server response.

interface User {
  userId?: number,
  username?: string,
  password?: string,
  role: string,
  firstName: string,
  lastName: string,
  dateOfBirth?: string
}

// The optional properties are specified for the same reason as described
// above. This time however, the type is shared between App.tsx and Courses.tsx.
//
// The teacher is an array not because multiple teachers can be assigned to a
// course but because the server is not concatenating the first and last name.

interface Course {
  courseId?: number,
  courseName: string,
  creditHours: number,
  teacherId?: number
  teacher?: string[]
}

export {
  User,
  Course
}
