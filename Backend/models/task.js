import { Schema } from "mongoose";

const taskSchema = new Schema ({
    title: {type: String, required: true},
    data: {type: Date, default: new Date()},
    priority: {
        type:String,
        default: "normal",
        enum: ["high","medium","normal","low"]
    },
    stage: {
        type:String,
        default:"todo",
        enum: ["todo","in progress", "completed"]

    },
    activities:{
        type:String,
        default:"assigned",
        enum:[
            "assigned",
            "started",
            "bug"
        ]
    }

})