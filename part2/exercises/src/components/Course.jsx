import React from 'react';

const Course = (props) => {

    const { course } = props;
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0); // check later?

    return (
        <div>
            <h1>{course.name}</h1>
            {course.parts.map(part => 
                <p key={part.id}>{part.name} {part.exercises}</p>)}
            <strong><p>Total of exercises {total}</p></strong>
        </div>
    )
}

export default Course;
