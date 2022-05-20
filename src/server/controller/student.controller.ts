import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Student } from '../schema/student.schema';
import { StudentService } from '../service/student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudentAll(): Promise<Student[]> {
    return this.studentService.getStudentAll();
  }

  @Get('/:id')
  getStudentById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Student> {
    return this.studentService.getStudentById(id);
  }
}
