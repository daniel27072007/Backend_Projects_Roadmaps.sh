#!/usr/bin/env node
import fs from 'fs';
import { JSONAdd, JSONRead, JSONRemove, JSONUpdateName, JSONUpdateState} from './functions.js';

const help = ()=>{
    console.log("\n[add] - add a new task");
    console.log("[update] - rename a task on the list");
    console.log("[delete] - removes a task of the list");
    console.log("[mark-in-progress] - marks the task as in progress");
    console.log("[mark-done] - marks the task as done");
    console.log("[list] - list all tasks\n");
}
const add = ()=>{
    const taskName = process.argv[3];
        let state = process.argv[4];
        switch (state) {
            case "done":
                break;
            case "todo":
                break;
            case "in-progress":
                break;
            default:
                state = "todo"
                break;
        }
        const idGerado = JSONAdd('./tasks.json', taskName, state);
        console.log(`Task added successfully (ID: ${idGerado})`);
}
const update = ()=>{
    const taskID = Number(process.argv[3]);
    const newName = process.argv[4];
    JSONUpdateName('./tasks.json', taskID, newName);
}
const remove = ()=>{
    const taskID = Number(process.argv[3]);
    JSONRemove('./tasks.json', taskID);
}
const markInProgress = ()=>{
    const taskID = Number(process.argv[3]);
    const state = "in-progress";
    JSONUpdateState('./tasks.json', taskID, state);
}
const markDone = ()=>{
    const taskID = Number(process.argv[3]);
    const state = "done";
    JSONUpdateState('./tasks.json', taskID, state);
}
const list = ()=>{
    const jsonArrayData = JSONRead('./tasks.json');
    const listFilter = process.argv[3]
    switch (listFilter) {
        case "done":
            console.log(jsonArrayData.filter(task => task.status === "done"));
            break;

        case "in-progress":
            console.log(jsonArrayData.filter(task => task.status === "in-progress"));
            break;

        case "todo":
            console.log(jsonArrayData.filter(task => task.status === "todo"));
            break;
    
        default:
            console.log(jsonArrayData);
            break;
    }
}

const choice = process.argv[2];
switch (choice) {
    case "add":
        add();
        break;

    case "help":
        help();
        break;

    case "update":
        update();    
        break;
    
    case "delete":
        remove();    
        break;    

    case "mark-in-progress":
        markInProgress();
        break;

    case "mark-done":
        markDone();
        break;

    case "list":
        list();
        break;

    default:
        console.log("\nYou didnt gave any commands. If you dont know any type help\n");
        break;
}