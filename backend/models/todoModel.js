import mongoose from 'mongoose'

const toDoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    
);
export const toDo = mongoose.model('toDo', toDoSchema);