import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { studentIdService } from '../service/studentId.service';

@Controller('/student/:id')
export class StudentIdController {
  constructor(private readonly studentIdService: studentIdService) {}

  @Get('/assignment/all/subject/all')
  @Render('index')
  async getStudentId(@Param('id', new ParseIntPipe()) id: number) {
    return {
      student_data: await this.studentIdService.getStudentId(id),
      assignment_data: await this.studentIdService.getAssignmentAll(),
    };
  }

  @Get('/assignment/all/subject/:name')
  @Render('index')
  async getStudentIdByAssignmentSubject(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('name') name: string,
  ) {
    return {
      student_data: await this.studentIdService.getStudentIdByAssignmentSubject(
        id,
        name,
      ),
      assignment_data: await this.studentIdService.getAssignmentAll(),
    };
  }

  @Get('/assignment/week/:count/subject/all')
  @Render('index')
  async getStudentIdByAssignmentWeek(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return {
      student_data: await this.studentIdService.getStudentIdByAssignmentWeek(
        id,
        count,
      ),
      assignment_data: await this.studentIdService.getAssignmentAll(),
    };
  }

  @Get('/assignment/month/:count/subject/all')
  @Render('index')
  async getStudentIdByAssignmentMonth(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return {
      student_data: await this.studentIdService.getStudentIdByAssignmentMonth(
        id,
        count,
      ),
      assignment_data: await this.studentIdService.getAssignmentAll(),
    };
  }

  @Get('/assignment/week/:count/subject/:name')
  @Render('index')
  async getStudentIdByAssignmentWeekAndSubject(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return {
      student_data:
        await this.studentIdService.getStudentIdByAssignmentWeekAndSubject(
          id,
          count,
          name,
        ),
      assignment_data: await this.studentIdService.getAssignmentAll(),
    };
  }

  @Get('/assignment/month/:count/subject/:name')
  @Render('index')
  async getStudentIdByAssignmentMonthAndSubject(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return {
      student_data:
        await this.studentIdService.getStudentIdByAssignmentMonthAndSubject(
          id,
          count,
          name,
        ),
      assignment_data: await this.studentIdService.getAssignmentAll(),
    };
  }
}
