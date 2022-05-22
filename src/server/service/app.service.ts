import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getStudentAll() {
    let student_data = this.httpService
      .get('http://localhost:3000/api/student')
      .pipe(map((response) => response.data));

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

    let student_response_array = [];
    student_response.data.forEach((dict) => student_response_array.push(dict));

    const student_data = student_response_array.filter((student) => {
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
