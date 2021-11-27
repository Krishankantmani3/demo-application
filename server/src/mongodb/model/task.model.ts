import { Schema } from "mongoose";
import mongoose from 'mongoose';

export class Task{
    title: string;
    description: string;
    status: number;
    progress: number;
    createdBy: Schema.Types.ObjectId;
    assignedTo: Schema.Types.ObjectId;

    constructor(task: Task){
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.progress = task.progress;
        this.createdBy = task.createdBy;
        this.assignedTo = task.assignedTo;
    }
}

let TaskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: Number}, // assigned or unassigned
    progress: {type: Number}, // pending, working, completed
    createdBy: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    assignedTo: {type: Schema.Types.ObjectId, ref: 'User'}
});

export let Tasks = mongoose.model('Task', TaskSchema);