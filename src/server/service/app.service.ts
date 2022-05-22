import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

class AppUtililty {
  async getStudentData(id: number | string) {
    let student_response;
    if (id == 'all') {
      student_response = await axios.get('http://localhost:3000/api/student');
    } else if (id != 'all') {
      student_response = await axios.get(
        `http://localhost:3000/api/student/${id}`,
      );
    }

    let student_data = [];
    student_response.data.forEach((dict) => student_data.push(dict));

    return student_data;
  }

  async getAssignmentId(type: string, count: number) {
    const assignment_response = await axios.get(
      `http://localhost:3000/api/assignment/${type}/${count}`,
    );

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

  filterStudentData(unfiltered_student_data, filter_array) {
    const student_data = unfiltered_student_data.filter((student) => {
      const filtered_assignment = student.assignment.filter((assignment) => {
        if (filter_array.includes(assignment.id)) {
          return assignment;
        }
      });

      student.assignment = filtered_assignment;

      return student;
    });

    return student_data;
  }

  filterAssignmentId(unfiltered_assignment_id, filter_array) {
    const assignment_id = unfiltered_assignment_id.filter((id) => {
      if (filter_array.includes(id)) {
        return id;
      }
    });

    return assignment_id;
  }
}

@Injectable()
export class AppService extends AppUtililty {
  //#region student all
  async getStudentAll() {
    let student_data = await this.getStudentData('all');

    return student_data;
  }

  async getStudentAllByAssignmentSubject(name: string) {
    let subject_id = await this.getSubjectId(name);
    let unfiltered_student_data = await this.getStudentData('all');

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      subject_id,
    );

    return student_data;
  }

  async getStudentAllByAssignmentWeek(count: number) {
    let assignment_id = await this.getAssignmentId('week', count);
    let unfiltered_student_data = await this.getStudentData('all');

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      assignment_id,
    );

    return student_data;
  }

  async getStudentAllByAssignmentMonth(count: number) {
    let assignment_id = await this.getAssignmentId('month', count);
    let unfiltered_student_data = await this.getStudentData('all');

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      assignment_id,
    );

    return student_data;
  }

  async getStudentAllByAssignmentWeekAndSubject(count: number, name: string) {
    let subject_id = await this.getSubjectId(name);
    let unfiltered_assignment_id = await this.getAssignmentId('week', count);
    let unfiltered_student_data = await this.getStudentData('all');

    const assignment_id = this.filterAssignmentId(
      unfiltered_assignment_id,
      subject_id,
    );

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      assignment_id,
    );

    return student_data;
  }

  async getStudentAllByAssignmentMonthAndSubject(count: number, name: string) {
    let subject_id = await this.getSubjectId(name);
    let unfiltered_assignment_id = await this.getAssignmentId('month', count);
    let unfiltered_student_data = await this.getStudentData('all');

    const assignment_id = this.filterAssignmentId(
      unfiltered_assignment_id,
      subject_id,
    );

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      assignment_id,
    );

    return student_data;
  }

  //#endregion student all

  //#region student id
  async getStudentId(id: number) {
    let student_data = await this.getStudentData(id);

    return student_data;
  }

  async getStudentIdByAssignmentSubject(id: number, name: string) {
    let subject_id = await this.getSubjectId(name);
    let unfiltered_student_data = await this.getStudentData(id);

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      subject_id,
    );

    return student_data;
  }

  async getStudentIdByAssignmentWeek(id: number, count: number) {
    let assignment_id = await this.getAssignmentId('week', count);
    let unfiltered_student_data = await this.getStudentData(id);

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      assignment_id,
    );

    return student_data;
  }

  async getStudentIdByAssignmentMonth(id: number, count: number) {
    let assignment_id = await this.getAssignmentId('month', count);
    let unfiltered_student_data = await this.getStudentData(id);

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      assignment_id,
    );

    return student_data;
  }

  async getStudentIdByAssignmentWeekAndSubject(
    id: number,
    count: number,
    name: string,
  ) {
    let subject_id = await this.getSubjectId(name);
    let unfiltered_assignment_id = await this.getAssignmentId('week', count);
    let unfiltered_student_data = await this.getStudentData(id);

    const assignment_id = this.filterAssignmentId(
      unfiltered_assignment_id,
      subject_id,
    );

    const student_data = this.filterStudentData(
      unfiltered_student_data,
      assignment_id,
    );

    return student_data;
  }

  //#endregion student id
}
