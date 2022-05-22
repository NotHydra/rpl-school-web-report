import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { StudentModule } from './student.module';
import { StudentAllModule } from './studentAll.module';
import { StudentIdModule } from './studentId.module';
import { AssignmentModule } from './assignment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MongoDBURI),
    StudentModule,
    StudentAllModule,
    StudentIdModule,
    AssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
