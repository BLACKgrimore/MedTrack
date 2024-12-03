import mongoose from 'mongoose';

const superuserSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    //   unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'superuser',
    },
  },
  {
    timestamps: true, 
  }
);

const Superuser = mongoose.model('Superuser', superuserSchema);

export default Superuser;
