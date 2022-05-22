import { Module } from '@nestjs/common';
import { StudentIdController } from '../controller/studentId.controller';
import { studentIdService } from '../service/studentId.service';

@Module({
  controllers: [StudentIdController],
  providers: [studentIdService],
})
export class StudentIdModule {}
