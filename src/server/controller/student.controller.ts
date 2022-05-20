import { Controller, Get } from '@nestjs/common';
import { Student } from '../schema/student.schema';
import { StudentService } from '../service/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }
}
