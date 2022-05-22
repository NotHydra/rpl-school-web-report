import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AssignmentDocument = Assignment & Document;

@Schema()
export class Assignment {
  @Prop({ type: MongooseSchema.Types.Number, required: true })
  id: number;

  @Prop({ type: MongooseSchema.Types.String, required: true })
  subject: string;

  @Prop({ type: MongooseSchema.Types.Number, required: true })
  count: number;

  @Prop({ type: MongooseSchema.Types.Boolean, required: true })
  is_for_muslim: boolean;

  @Prop({ type: MongooseSchema.Types.Number, required: true })
  month: number;

  @Prop({ type: MongooseSchema.Types.Number, required: true })
  week: number;

  @Prop({ type: MongooseSchema.Types.Date, required: false })
  due_date: Date;

  @Prop({ type: MongooseSchema.Types.String, required: false })
  description: string;

  @Prop({ type: MongooseSchema.Types.String, required: false })
  picture: string;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
