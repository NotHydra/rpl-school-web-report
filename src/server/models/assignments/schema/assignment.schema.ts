import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export type AssignmentDocument = AssignmentMonth & Document;

export class AssignmentItem {
    @Prop({ type: MongooseSchema.Types.Number, required: true })
    id: number;

    @Prop({ type: MongooseSchema.Types.String, required: true })
    subject: string;

    @Prop({ type: MongooseSchema.Types.Number, required: true })
    count: number;
}

export class AssignmentWeek {
    @Prop({ type: MongooseSchema.Types.Number, required: true })
    id: number;

    @Prop({ type: MongooseSchema.Types.Number, required: true })
    week: number;

    @Prop({ type: MongooseSchema.Types.Array, ref: "AssignmentItem" })
    assignment: AssignmentItem[];
}

@Schema()
export class AssignmentMonth {
    @Prop({ type: MongooseSchema.Types.Number, required: true })
    id: number;

    @Prop({ type: MongooseSchema.Types.Number, required: true })
    month: number;

    @Prop({ type: MongooseSchema.Types.Array, ref: "AssignmentWeek" })
    week: AssignmentWeek[];
}

export const AssignmentSchema = SchemaFactory.createForClass(AssignmentMonth);
