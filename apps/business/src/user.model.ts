import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    type: String,
    unique: true,
    required: true,
    index: true,
    validate: {
      validator: function (value: string) {
        const r =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return r.test(value);
      },
      message: 'validation.emailFormat',
    },
  })
  mail!: string;

  @Prop({ type: String, required: true })
  password!: string;
}

const userModel = SchemaFactory.createForClass(User);
userModel.plugin(mongoosePaginate);

export const UserModel = userModel;
