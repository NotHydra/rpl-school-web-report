import { Module } from '@nestjs/common';
import { StudentAllController } from '../controller/studentAll.controller';
import { studentAllService } from '../service/studentAll.service';

@Module({
  controllers: [StudentAllController],
  providers: [studentAllService],
})
export class StudentAllModule {}
