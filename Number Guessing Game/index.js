#!/usr/bin/env node
import { Command } from "commander";

const scanf = ()=>{
    
}

const intro = ()=>{
    console.log('\n-------------------------------------------------------------------------------------------------------');
    console.log('Wellcome to the Number Guessing Game!');
    console.log('I will pick a random number you will need to guess it in the least atempts as possible');
    console.log('Are you ready?')
    console.log('[-y] Yes/Play [-n] No/Exit')
    console.log('-------------------------------------------------------------------------------------------------------\n');
}

const program = new Command();

program
    .name('Number Guessing Game')
    .version('1.0.0')
    .description('Play and try to guess the random number!')

program
    .command('play')
    .description('Type play to start the game!')
    .action(()=>{
        intro();
    });

if(process.argv.length <= 2){
    console.error('\n-----------------------------------------------------------------------------------------------------');
    console.error('You must type a command after number-game.');
    console.error('If you dont know any, type -h or --help to know the commands avalible');
    console.error('-----------------------------------------------------------------------------------------------------\n');
    process.exit(1);
}

program.parse(process.argv);