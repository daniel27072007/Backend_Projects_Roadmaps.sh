#!/usr/bin/env node
import { Command } from 'commander'

const program = new Command()

program
    .name('github-trending')
    .description('CLI to see the most trendings repositories in a certain period of time')
    .version('1.0.0')

program
    .command('hello')
    .description('says hello world')
    .action(()=>{
        console.log('hello world')
    })

program
    .command('trending-repos')
    .description('show the trendings repositories in a certain period of time chosen')
    .option('-d, --duration <periodOfTime>', 'Period of time chosen')
    .option('-l, --limit <limitOfRepositories>', 'Limit of repositories shown')
    .action((options)=>{
        const duration = options.duration || 'week'
        if(duration !== 'day' && duration !== 'week' && duration !== 'month' && duration !== 'year'){
            return console.error(`duration must be 'day', 'week', 'month', 'year'. ${duration} is invalid`)
        }
        const limitRaw = options.limit ?? '10'
        const limit = parseInt(limitRaw)
        if(limit < 0 || isNaN(limit)){
            return console.error(`limit must be a number higher than 0. ${limit} is a invalid input.`)
        }
        if(limit > 100){
            return console.error(`option 'limit' must be lower than 100. ${limit} is a invalid input.`)
        }
        console.log(duration, limit)
    })

program.parse(process.argv)