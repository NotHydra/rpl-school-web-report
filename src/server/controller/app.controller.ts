import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //#region student all
  @Get('/student/all/assignment/all/subject/all')
  getStudentAll() {
    return this.appService.getStudentAll();
  }

  @Get('/student/all/assignment/all/subject/:name')
  getStudentAllByAssignmentSubject(@Param('name') name: string) {
    return this.appService.getStudentAllByAssignmentSubject(name);
  }

  @Get('/student/all/assignment/week/:count/subject/all')
  getStudentAllByAssignmentWeek(
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.appService.getStudentAllByAssignmentWeek(count);
  }

  @Get('/student/all/assignment/month/:count/subject/all')
  getStudentAllByAssignmentMonth(
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.appService.getStudentAllByAssignmentMonth(count);
  }

  @Get('/student/all/assignment/week/:count/subject/:name')
  getStudentAllByAssignmentWeekAndSubject(
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return this.appService.getStudentAllByAssignmentWeekAndSubject(count, name);
  }

  @Get('/student/all/assignment/month/:count/subject/:name')
  getStudentAllByAssignmentMonthAndSubject(
    @Param('count', new ParseIntPipe()) count: number,
    @Param('name') name: string,
  ) {
    return this.appService.getStudentAllByAssignmentMonthAndSubject(
      count,
      name,
    );
  }

  //#endregion student all

  //#region student id
  @Get('/student/:id/assignment/all/subject/all')
  getStudentId(@Param('id', new ParseIntPipe()) id: number) {
    return this.appService.getStudentId(id);
  }

  @Get('/student/:id/assignment/all/subject/:name')
  getStudentIdByAssignmentSubject(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('name') name: string,
  ) {
    return this.appService.getStudentIdByAssignmentSubject(id, name);
  }

  @Get('/student/:id/assignment/week/:count/subject/all')
  getStudentIdByAssignmentWeek(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.appService.getStudentIdByAssignmentWeek(id, count);
  }

  //#endregion student id
}
