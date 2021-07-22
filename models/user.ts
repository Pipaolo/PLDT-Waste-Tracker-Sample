import { Schema, Document, model, models, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface User {
  username: string;
  password: string;
  accessLevel: number;
}

export interface UserDocument extends User, Document {
  comparePassword(
    passwordToCompare: string,
    callback: (err: any, isMatch: boolean) => void
  ): boolean;
}
export interface UserModel extends Model<UserDocument> {}

const UserSchema: Schema = new Schema<UserDocument, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accessLevel: {
      type: Number,
      required: true,
      default: 5, // Defaults to User access level
    },
  },
  {
    timestamps: true,
  }
);

// Handle password Hashing
UserSchema.pre<UserDocument>('save', function (next) {
  // We only need to hash the password if the document
  // has been modified or new

  if (!this.isModified('password')) return next();

  // Start salt generation
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    // Start hashing the password using the generated salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      this.password = hash;

      return next();
    });
  });
});

// This method will be used for password comparison in the mongoDB Database
UserSchema.methods.comparePassword = function (
  this: UserDocument,
  passwordToCompare,
  callback
) {
  bcrypt.compare(passwordToCompare, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

UserSchema.post('save', function (error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.log(error);
    next(new Error('A User already registered with that number.'));
  } else {
    next();
  }
});

export default (models.User as UserModel) ||
  model<UserDocument, UserModel>('User', UserSchema);
