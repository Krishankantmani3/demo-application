import { Schema } from "mongoose";
import mongoose from 'mongoose';

export class Task{
    title: string;
    description: string;
    status: string;
    progress: string;
    createdBy: Schema.Types.ObjectId;
    assignedBy: Schema.Types.ObjectId;
    assignedTo: Schema.Types.ObjectId;

    constructor(task: Task){
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.progress = task.progress;
        this.createdBy = task.createdBy;
        this.assignedBy = task.assignedBy;
        this.assignedTo = task.assignedTo;
    }
}


let TaskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String}, // assigned or unassigned
    progress: {type: String}, // pending, working, completed
    createdBy: {type: Schema.Types.ObjectId, required: true, ref: 'Users'},
    assignedBy: {type: Schema.Types.ObjectId, ref: 'Users'},
    assignedTo: {type: Schema.Types.ObjectId, ref: 'Users'}
});


export let Tasks = mongoose.model('Task', TaskSchema);