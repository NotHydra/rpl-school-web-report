import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StudentDocument = Student & Document;

class Assignment {
  @Prop({ type: MongooseSchema.Types.Number, required: true })
  id: number;

  @Prop({ type: MongooseSchema.Types.Number, required: true })
  status: number;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  proof: string;
}

@Schema()
export class Student {
  @Prop({ type: MongooseSchema.Types.Number, required: true })
  id: number;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.Boolean, required: true })
  is_muslim: boolean;

  @Prop({ type: MongooseSchema.Types.Array, required: true, ref: 'Assignment' })
  assignment: Assignment[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
