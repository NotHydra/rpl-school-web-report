import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
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
}
