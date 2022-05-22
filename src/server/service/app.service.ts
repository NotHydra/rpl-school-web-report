import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async getStudentAll() {
    const student_response = await axios.get(
      'http://localhost:3000/api/student',
    );

    let student_data = [];
    student_response.data.forEach((dict) => student_data.push(dict));

    return student_data;
  }

  async getStudentAllByAssignmentSubject(name: string) {
    const subject_response = await axios.get(
      `http://localhost:3000/api/assignment/subject/${name}`,
    );

    let subject_id = [];
    subject_response.data.forEach((dict) => {
      subject_id.push(dict.id);
    });

    const student_response = await axios.get(
      'http://localhost:3000/api/student',
    );

    let unfiltered_student_data = [];
    student_response.data.forEach((dict) => unfiltered_student_data.push(dict));

    const student_data = unfiltered_student_data.filter((student) => {
      const filtered_assignment = student.assignment.filter((assignment) => {
        if (subject_id.includes(assignment.id)) {
          return assignment;
        }
      });

      student.assignment = filtered_assignment;

      return student;
    });

    return student_data;
  }

  async getStudentAllByAssignmentWeek(count: number) {
    const assignment_response = await axios.get(
      `http://localhost:3000/api/assignment/week/${count}`,
    );

    let assignment_id = [];
    assignment_response.data.forEach((dict) => {
      assignment_id.push(dict.id);
    });

    const student_response = await axios.get(
      'http://localhost:3000/api/student',
    );

    let unfiltered_student_data = [];
    student_response.data.forEach((dict) => unfiltered_student_data.push(dict));

    const student_data = unfiltered_student_data.filter((student) => {
      const filtered_assignment = student.assignment.filter((assignment) => {
        if (assignment_id.includes(assignment.id)) {
          return assignment;
        }
      });

      student.assignment = filtered_assignment;

      return student;
    });

    return student_data;
  }

  async getStudentAllByAssignmentMonth(count: number) {
    const assignment_response = await axios.get(
      `http://localhost:3000/api/assignment/month/${count}`,
    );

    let assignment_id = [];
    assignment_response.data.forEach((dict) => {
      assignment_id.push(dict.id);
    });

    const student_response = await axios.get(
      'http://localhost:3000/api/student',
    );

    let unfiltered_student_data = [];
    student_response.data.forEach((dict) => unfiltered_student_data.push(dict));

    const student_data = unfiltered_student_data.filter((student) => {
      const filtered_assignment = student.assignment.filter((assignment) => {
        if (assignment_id.includes(assignment.id)) {
          return assignment;
        }
      });

      student.assignment = filtered_assignment;

      return student;
    });

    return student_data;
  }

  async getStudentAllByAssignmentWeekAndSubject(count: number, name: string) {
    const subject_response = await axios.get(
      `http://localhost:3000/api/assignment/subject/${name}`,
    );

    let subject_id = [];
    subject_response.data.forEach((dict) => {
      subject_id.push(dict.id);
    });

    const assignment_response = await axios.get(
      `http://localhost:3000/api/assignment/week/${count}`,
    );

    let unfiltered_assignment_id = [];
    assignment_response.data.forEach((dict) => {
      unfiltered_assignment_id.push(dict.id);
    });

    const assignment_id = unfiltered_assignment_id.filter((id) => {
      if (subject_id.includes(id)) {
        return id;
      }
    });

    const student_response = await axios.get(
      'http://localhost:3000/api/student',
    );

    let unfiltered_student_data = [];
    student_response.data.forEach((dict) => unfiltered_student_data.push(dict));

    const student_data = unfiltered_student_data.filter((student) => {
      const filtered_assignment = student.assignment.filter((assignment) => {
        if (assignment_id.includes(assignment.id)) {
          return assignment;
        }
      });

      student.assignment = filtered_assignment;

      return student;
    });

    return student_data;
  }

  async getStudentAllByAssignmentMonthAndSubject(count: number, name: string) {
    const subject_response = await axios.get(
      `http://localhost:3000/api/assignment/subject/${name}`,
    );

    let subject_id = [];
    subject_response.data.forEach((dict) => {
      subject_id.push(dict.id);
    });

    const assignment_response = await axios.get(
      `http://localhost:3000/api/assignment/month/${count}`,
    );

    let unfiltered_assignment_id = [];
    assignment_response.data.forEach((dict) => {
      unfiltered_assignment_id.push(dict.id);
    });

    const assignment_id = unfiltered_assignment_id.filter((id) => {
      if (subject_id.includes(id)) {
        return id;
      }
    });

    const student_response = await axios.get(
      'http://localhost:3000/api/student',
    );

    let unfiltered_student_data = [];
    student_response.data.forEach((dict) => unfiltered_student_data.push(dict));

    const student_data = unfiltered_student_data.filter((student) => {
      const filtered_assignment = student.assignment.filter((assignment) => {
        if (assignment_id.includes(assignment.id)) {
          return assignment;
        }
      });

      student.assignment = filtered_assignment;

      return student;
    });

    return student_data;
  }
}
