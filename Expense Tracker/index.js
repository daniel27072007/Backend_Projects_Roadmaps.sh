#!/usr/bin/env node
import fs from 'fs';
import { Command } from 'commander';
import { JSONAdd, JSONUpdate, deleteData, JSONBugget } from './functions/functions.js'

const totalInMonth = (month) => {
    let DataString = "[]"
        if(fs.existsSync('./data.json')){
            DataString = fs.readFileSync('./data.json', 'utf-8');
        }
    const DataArray = JSON.parse(DataString);
    let buggetString = "[]"
        if(fs.existsSync('./buggetData.json')){
            buggetString = fs.readFileSync('./buggetData.json', 'utf-8');
        }
    const buggetArray = JSON.parse(buggetString);
    let totalAmount = 0;
    DataArray.forEach((element)=>{
        const monthOnly = new Date(element.createdAt).getUTCMonth() + 1;
        if(monthOnly === month){
            totalAmount += element.amount;
        }
    });
    let maxBugget = 0;
    buggetArray.forEach((element)=>{
        if(Number(element.month) === month){
           maxBugget = Number(element['max-bugget']);
        }
    });
    const buggetInfo = {
        "max": maxBugget,
        "total": totalAmount
    }
    return buggetInfo
}

const program = new Command();

program
    .name('expense-tracker')
    .description('CLI to manage expenses')
    .version('1.0.0');

program
    .command('add')
    .description('add an expense with a description and amount.')
    .option('-c, --category <expenseCategory>','category of the expense')
    .requiredOption('-d, --description <expenseName>', 'name of the expense')
    .requiredOption('-a, --amount <expenseAmount>','expense money amount')
    .action((options)=>{
        const expenseCategory = options.category || 'others';
        const expenseName = options.description;
        const expenseAmount = Number(options.amount);
        const id = JSONAdd('./data.json', expenseName, expenseAmount, expenseCategory);
        console.log(`# Expense added successfully (ID: ${id})`);
    });

program
    .command('update')
    .description('update an expense name, must tell the id.')
    .requiredOption('-i, --id <id>', 'id of the expense')
    .requiredOption('-r, --rename <expenseRename>', 'updated name of the expense')
    .action((options)=>{
        const id = Number(options.id);
        const expenseRename = options.rename;
        JSONUpdate('./data.json', id, expenseRename);
        console.log(`# Expense renamed successfully to ${expenseRename} (ID: ${id})`);
    });

program
    .command('delete')
    .description('delete an expense, must tell the id.')
    .requiredOption('-i, --id <id>', 'id of the expense')
    .action((options)=>{
        const id = Number(options.id);
        if(deleteData('./data.json', id) === true){
            console.log("# Expense deleted with sucess!")
        }
        else{
            console.error(`# [ERROR] - Expense (ID:${id}) not found`)
        }
    });

program
    .command('summary')
    .description('show the total amount of all expenses combined.')
    .option('-m, --month <month>', 'use if you want to see the total in certain month')
    .action((options)=>{
        const month = Number(options.month);
        let oldDataString = "[]"
            if(fs.existsSync('./data.json')){
                oldDataString = fs.readFileSync('./data.json', 'utf-8');
            }
        const oldDataArray = JSON.parse(oldDataString);
        if (oldDataArray.length === 0){
            console.log('# Total expenses: $0.00')
            console.log('# *if you have expenses, and it show you this, it may be a [error]*');
        }
        else{
            let totalAmount = 0;
            if (!options.month){
                oldDataArray.forEach((element)=>{
                    totalAmount += element.amount;
                });
                console.log(`# Total expenses: R$ ${totalAmount.toFixed(2)}`); 
            }
            else if(month > 12 || month < 1 || isNaN(month)){
                console.error('# [ERROR] - you must select a month between 1 and 12');
            }
            else{
                oldDataArray.forEach((element)=>{
                    const monthOnly = new Date(element.createdAt).getUTCMonth() + 1;
                    if(monthOnly === month){
                        totalAmount += element.amount;
                    }
                });
                console.log(`# Total expenses: R$ ${totalAmount.toFixed(2)}`);
            }
            
        }
    });

program
    .command('list')
    .description('show all the current expenses')
    .option('-c, --category <category>','show a list of a particular category')
    .action((options)=>{
        const listFilteredCategory = options.category || false;
        let DataString = "[]"
        if(fs.existsSync('./data.json')){
            DataString = fs.readFileSync('./data.json', 'utf-8');
        }
        const DataArray = JSON.parse(DataString);
        if(listFilteredCategory === false){
            console.table(DataArray);
        }
        else{
            console.table(DataArray.filter(element => element['expense-category'] === listFilteredCategory));
        }
    });

program
    .command('bugget')
    .description('set a bugget for how much you can expend in each month')
    .option('-m, --month <month>','use this to set a specific month bugget')
    .requiredOption('-a, --amount <amount>','max bugget amount')
    .action((options)=>{
        const maxBugget = Number(options.amount).toFixed(2);
        const chosenMonth = Number(options.month) || new Date().getMonth()+1;
        JSONBugget('./buggetData.json', maxBugget, chosenMonth);
        console.log(`# Max bugget for the ${chosenMonth} month is R$ ${maxBugget}`);

    });

program.parse(process.argv);