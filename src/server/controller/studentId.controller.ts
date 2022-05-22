import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { studentIdService } from '../service/studentId.service';

@Controller('/student/:id')
export class StudentIdController {
  constructor(private readonly studentIdService: studentIdService) {}

  @Get('/assignment/all/subject/all')
  getStudentId(@Param('id', new ParseIntPipe()) id: number) {
    return this.studentIdService.getStudentId(id);
  }

  @Get('/assignment/all/subject/:name')
  getStudentIdByAssignmentSubject(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('name') name: string,
  ) {
    return this.studentIdService.getStudentIdByAssignmentSubject(id, name);
  }

  @Get('/assignment/week/:count/subject/all')
  getStudentIdByAssignmentWeek(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.studentIdService.getStudentIdByAssignmentWeek(id, count);
  }

  @Get('/assignment/month/:count/subject/all')
  getStudentIdByAssignmentMonth(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.studentIdService.getStudentIdByAssignmentMonth(id, count);
  }

  @Get('/assignment/week/:count/subject/:name')
  getStudentIdByAssignmentWeekAndSubject(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return this.studentIdService.getStudentIdByAssignmentWeekAndSubject(
      id,
      count,
      name,
    );
  }

  @Get('/assignment/month/:count/subject/:name')
  getStudentIdByAssignmentMonthAndSubject(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return this.studentIdService.getStudentIdByAssignmentMonthAndSubject(
      id,
      count,
      name,
    );
  }
}
