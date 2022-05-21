import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/student/all/assignment/all/subject/all')
  getStudentAll() {
    return this.appService.getStudentAll();
  }
}
