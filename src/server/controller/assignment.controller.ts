import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { count } from 'console';
import { Assignment } from '../schema/assignment.schema';
import { AssignmentService } from '../service/assignment.service';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  getAssignmentAll(): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentAll();
  }

  @Get('/:id')
  getAssignmentById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Assignment> {
    return this.assignmentService.getAssignmentById(id);
  }

  @Get('subject/:name')
  getAssignmentBySubjectName(
    @Param('name') name: string,
  ): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentBySubjectName(name);
  }

  @Get('subject/:name/:count')
  getAssignmentBySubjectNameAndCount(
    @Param('name') name: string,
    @Param('count', new ParseIntPipe()) count: number,
  ): Promise<Assignment> {
    return this.assignmentService.getAssignmentBySubjectNameAndCount(
      name,
      count,
    );
  }

  @Get('month/:count')
  getAssignmentByMonth(
    @Param('count', new ParseIntPipe()) count: number,
  ): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentByMonth(count);
  }

  @Get('week/:count')
  getAssignmentByWeek(
    @Param('count', new ParseIntPipe()) count: number,
  ): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentByWeek(count);
  }
}
