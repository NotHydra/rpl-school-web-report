import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/student/all/assignment/all/subject/all')
  getStudentAll() {
    return this.appService.getStudentAll();
  }

  @Get('/student/all/assignment/week/:count/subject/all')
  getStudentAllByAssignmentWeek(
    @Param('count', new ParseIntPipe()) count: number,
  ) {
    return this.appService.getStudentAllByAssignmentWeek(count);
  }
}
