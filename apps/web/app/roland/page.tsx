"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Student {
  id: number;
  studentName: string;
  rollNo: string;
  branch: string;
  subjects: string[];
  sgpa: number;
}

const RolandList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => { 
      try {
        const response = await axios.get('http://localhost:3000/api/data');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student Results</h1>
      {students.length > 0 ? (
        students.map(student => (
          <div key={student.id}>
            <h2>{student.studentName} ({student.rollNo})</h2>
            <p>Course: {student.branch}</p>
            <p>Subjects: {student.subjects.join(', ')}</p>
            <p>SGPA: {student.sgpa}</p>
          </div>
        ))
      ) : (
        <p>No student data available.</p>
      )}
    </div>
  );
};

export default RolandList;
