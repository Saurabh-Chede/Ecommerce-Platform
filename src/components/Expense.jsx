import { useEffect, useState } from "react";
import data from "../todos.json";

function Expense() {

    const [students, setStudents] = useState([]);

    useEffect(() => {

        setStudents(data)

    }, [])

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.gender}</td>
                                <td>{student.age}</td>
                                <td>{student.email}</td>
                                <td>{student.city}</td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Expense