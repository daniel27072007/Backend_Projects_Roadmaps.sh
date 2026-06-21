#!/usr/bin/env node
import fs from 'fs';
import { Command } from 'commander';
import { JSONAdd, JSONUpdate, deleteData } from './functions/functions.js'

const program = new Command();

program
    .name('expense-tracker')
    .description('CLI to manage expenses')
    .version('1.0.0');

program
    .command('add')
    .description('add an expense with a description and amount.')
    .requiredOption('-d, --description <expenseName>', 'name of the expense')
    .requiredOption('-a, --amount <expenseAmount>','expense money amount')
    .action((options)=>{
        const expenseName = options.description;
        const expenseAmount = Number(options.amount);
        const id = JSONAdd('./data.json', expenseName, expenseAmount);
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
    .action(()=>{
        let DataString = "[]"
        if(fs.existsSync('./data.json')){
            DataString = fs.readFileSync('./data.json', 'utf-8');
        }
        const DataArray = JSON.parse(DataString);
        console.table(DataArray);
    });



program.parse(process.argv);