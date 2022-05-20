import { Controller, Get } from '@nestjs/common';
import { Assignment } from '../schema/assignment.schema';
import { AssignmentService } from '../service/assignment.service';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  getAssignmentAll(): Promise<Assignment[]> {
    return this.assignmentService.getAssignmentAll();
  }
}
