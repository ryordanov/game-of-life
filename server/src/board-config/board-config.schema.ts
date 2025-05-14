import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'boardconfig' })
export class BoardConfig extends Document {
  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  cols: number;

  @Prop({ required: true })
  size: number;

  @Prop({ required: true })
  delay: number;
}

export const BoardConfigSchema = SchemaFactory.createForClass(BoardConfig);
