import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

class AppUtililty {
  async getStudentData() {
    const student_response = await axios.get(
      'http://localhost:3000/api/student',
    );

    let student_data = [];
    student_response.data.forEach((dict) => student_data.push(dict));

    return student_data;
  }

  async getAssignmentId(type: string, count: number) {
    let assignment_response;

    if (type == 'week' || type == 'month') {
      assignment_response = await axios.get(
        `http://localhost:3000/api/assignment/${type}/${count}`,
      );
    } else if (type == 'all') {
      assignment_response = await axios.get(
        'http://localhost:3000/api/assignment',
      );
    }

    let assignment_id = [];
    assignment_response.data.forEach((dict) => {
      assignment_id.push(dict.id);
    });

    return assignment_id;
  }

  async getSubjectId(name: string) {
    const subject_response = await axios.get(
      `http://localhost:3000/api/assignment/subject/${name}`,
    );

    let subject_id = [];
    subject_response.data.forEach((dict) => {
      subject_id.push(dict.id);
    });

    return subject_id;
  }
}

@Injectable()
export class AppService extends AppUtililty {
  async getStudentAll() {
    let student_data = await this.getStudentData();

    return student_data;
  }

  async getStudentAllByAssignmentSubject(name: string) {
    let subject_id = await this.getSubjectId(name);
    let unfiltered_student_data = await this.getStudentData();

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
    let assignment_id = await this.getAssignmentId('week', count);
    let unfiltered_student_data = await this.getStudentData();

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
    let assignment_id = await this.getAssignmentId('month', count);
    let unfiltered_student_data = await this.getStudentData();

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
    let subject_id = await this.getSubjectId(name);
    let unfiltered_assignment_id = await this.getAssignmentId('week', count);
    let unfiltered_student_data = await this.getStudentData();

    const assignment_id = unfiltered_assignment_id.filter((id) => {
      if (subject_id.includes(id)) {
        return id;
      }
    });

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
    let subject_id = await this.getSubjectId(name);
    let unfiltered_assignment_id = await this.getAssignmentId('month', count);
    let unfiltered_student_data = await this.getStudentData();

    const assignment_id = unfiltered_assignment_id.filter((id) => {
      if (subject_id.includes(id)) {
        return id;
      }
    });

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
