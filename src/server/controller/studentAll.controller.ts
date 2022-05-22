import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { studentAllService } from '../service/studentAll.service';

@Controller('/student/all')
export class StudentAllController {
  constructor(private readonly studentAllService: studentAllService) {}

  @Get('/assignment/all/subject/all')
  getStudentAll() {
    return this.studentAllService.getStudentAll();
  }

  @Get('/assignment/all/subject/:name')
  getStudentAllByAssignmentSubject(@Param('name') name: string) {
    return this.studentAllService.getStudentAllByAssignmentSubject(name);
  }

  @Get('/assignment/week/:count/subject/all')
  getStudentAllByAssignmentWeek(
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.studentAllService.getStudentAllByAssignmentWeek(count);
  }

  @Get('/assignment/month/:count/subject/all')
  getStudentAllByAssignmentMonth(
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.studentAllService.getStudentAllByAssignmentMonth(count);
  }

  @Get('/assignment/week/:count/subject/:name')
  getStudentAllByAssignmentWeekAndSubject(
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return this.studentAllService.getStudentAllByAssignmentWeekAndSubject(
      count,
      name,
    );
  }

  @Get('/assignment/month/:count/subject/:name')
  getStudentAllByAssignmentMonthAndSubject(
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return this.studentAllService.getStudentAllByAssignmentMonthAndSubject(
      count,
      name,
    );
  }
}
