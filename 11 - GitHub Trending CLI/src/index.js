#!/usr/bin/env node
import { Command } from 'commander'
import { durationConverter } from './functions.js'

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
    .action( async (options)=>{
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
        const durationQuery = durationConverter(duration)
        const url = `https://api.github.com/search/repositories?q=created:>${durationQuery}&sort=stars&order=desc&per_page=${limit}`
        console.log(durationQuery, limit)
        try {
            console.log(`Fetching top ${limit} repositories since ${durationQuery}...`)
            const response = await fetch(url, {
                headers: { 'User-Agent': 'github-trending-cli' }
            })
            if(!response.ok){
                if(response.status === 403){
                    return console.error('Error: You reached the limit of requests by now, try again in a few moments')
                }
                throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
            }
            const data = await response.json()
            if(!data || data.items.length === 0){
                console.log('No repositories found in this period')
                return
            }
            data.items.forEach((repo, index) => {
                
                const repoInfo = {
                    Index: index + 1,
                    Name: repo.name,
                    Description: repo.description,
                    Stars: repo.stargazers_count,
                    Language: repo.language,
                    CreatedAt: repo.created_at
                }
                console.log(repoInfo)
            });
        } catch (error) {
            console.error('Error fetching data:', error.message)
        }
    })

program.parse(process.argv)