import { Injectable } from '@nestjs/common';
import StudentUtililty from '../shared/utility/studentUtility';

@Injectable()
export class studentAllService extends StudentUtililty {
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
}
