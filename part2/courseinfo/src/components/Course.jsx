const Course = ({ course }) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
 
 


    return (
      <div>
        <h2>{course.name}</h2>
        {course.parts.map(part => (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        ))}
        <strong>Total of {total} exercises</strong>
      </div>
    );
  };
  
  export default Course;
  