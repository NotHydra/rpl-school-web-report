import { Module } from '@nestjs/common';
import { StudentAllController } from '../controller/studentAll.controller';
import { studentAllService } from '../service/studentAll.service';
import { AssignmentModule } from './assignment.module';

@Module({
  imports: [AssignmentModule],
  controllers: [StudentAllController],
  providers: [studentAllService],
})
export class StudentAllModule {}
