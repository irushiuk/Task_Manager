import bcrypts from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema (
    {
    name :{type:String,required: true},
    email: { type:String, requied:true, unique:true},
    password:{type:String,required: true},
    isAdmin :{type:Boolean,required: true, default:false},
    tasks :{type:[String],required: true},
    isActive: {type:Boolean, requied:true, default:true},
    },

    {timestamps:true}


);

userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.method.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
    
}

const User = mongoose.model("User", userSchema)

export default User;
