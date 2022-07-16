import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type StudentDocument = Student & Document;

export class StudentAssignment {
    @Prop({ type: MongooseSchema.Types.Number, required: true })
    id: number;

    @Prop({ type: MongooseSchema.Types.Number, required: true })
    monthId: number;

    @Prop({ type: MongooseSchema.Types.Number, required: true })
    weekId: number;

    @Prop({ type: MongooseSchema.Types.Number, required: true })
    assignmentId: number;

    @Prop({ type: MongooseSchema.Types.Number, required: true })
    status: number;
}

@Schema()
export class Student {
    @Prop({ type: MongooseSchema.Types.Number, required: true })
    id: number;

    @Prop({ type: MongooseSchema.Types.String, required: true })
    name: string;

    @Prop({ type: MongooseSchema.Types.Boolean, required: true })
    isMuslim: boolean;

    @Prop({ type: MongooseSchema.Types.Array, required: false, ref: "StudentAssignment" })
    assignment: StudentAssignment[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
