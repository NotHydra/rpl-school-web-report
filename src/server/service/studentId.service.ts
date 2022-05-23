import { Injectable } from '@nestjs/common';
import StudentUtililty from '../shared/utility/studentUtility';

@Injectable()
export class studentIdService extends StudentUtililty {
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

  async getStudentIdByAssignmentMonthAndSubject(
    id: number,
    count: number,
    name: string,
  ) {
    let subject_id = await this.getSubjectId(name);
    let unfiltered_assignment_id = await this.getAssignmentId('month', count);
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

  async getAssignmentAll() {
    let assignment_data = await this.getAssignmentData();

    return assignment_data;
  }
}
