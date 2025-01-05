import mongoose from 'mongoose';

export const connectDB = async ()=>{
    try{
         const conn = await mongoose.connect(process.env.MONGO_URL);
         console.log('Database connected');
    }

    catch(error){
        console.error("Error: ${error.message}");
        process.exit(1);
    }
}