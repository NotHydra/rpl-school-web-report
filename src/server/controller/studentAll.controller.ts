import { Controller, Get, Param, ParseIntPipe, Render } from '@nestjs/common';
import { studentAllService } from '../service/studentAll.service';

@Controller('/student/all')
export class StudentAllController {
  constructor(private readonly studentAllService: studentAllService) {}

  @Get('/assignment/all/subject/all')
  @Render('index')
  async getStudentAll() {
    return {
      student_data: await this.studentAllService.getStudentAll(),
      assignment_data: await this.studentAllService.getAssignmentAll(),
    };
  }

  @Get('/assignment/all/subject/:name')
  @Render('index')
  async getStudentAllByAssignmentSubject(@Param('name') name: string) {
    return {
      student_data:
        await this.studentAllService.getStudentAllByAssignmentSubject(name),
      assignment_data: await this.studentAllService.getAssignmentAll(),
    };
  }

  @Get('/assignment/week/:count/subject/all')
  @Render('index')
  async getStudentAllByAssignmentWeek(
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return {
      student_data: await this.studentAllService.getStudentAllByAssignmentWeek(
        count,
      ),
      assignment_data: await this.studentAllService.getAssignmentAll(),
    };
  }

  @Get('/assignment/month/:count/subject/all')
  @Render('index')
  async getStudentAllByAssignmentMonth(
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return {
      student_data: await this.studentAllService.getStudentAllByAssignmentMonth(
        count,
      ),
      assignment_data: await this.studentAllService.getAssignmentAll(),
    };
  }

  @Get('/assignment/week/:count/subject/:name')
  @Render('index')
  async getStudentAllByAssignmentWeekAndSubject(
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return {
      student_data:
        await this.studentAllService.getStudentAllByAssignmentWeekAndSubject(
          count,
          name,
        ),
      assignment_data: await this.studentAllService.getAssignmentAll(),
    };
  }

  @Get('/assignment/month/:count/subject/:name')
  @Render('index')
  async getStudentAllByAssignmentMonthAndSubject(
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return {
      student_data:
        await this.studentAllService.getStudentAllByAssignmentMonthAndSubject(
          count,
          name,
        ),
      assignment_data: await this.studentAllService.getAssignmentAll(),
    };
  }
}
