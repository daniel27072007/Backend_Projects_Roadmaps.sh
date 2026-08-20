#!/usr/bin/env node
import 'dotenv/config'
import { Command } from 'commander'
import { queryCategoryConverter } from './function.js'

const program = new Command()

program
    .name('TMDB CLI Tool')
    .description('An CLI Tool to help you see the movies based in some categorys')
    .version('1.0.0')

program
    .name('movies-list')
    .requiredOption('-t, --type <category>', 'Choose a category to list the movies')
    .action( async (options)=>{
        const category = options.type
        if(category !== 'playing' && category !== 'popular' && category !== 'top' && category !== 'upcoming'){
            return console.error('ERROR: The avalible types are: playing, popular, top and upcoming')
        }
        const categoryQuery = queryCategoryConverter(category)
        const url = `https://api.themoviedb.org/3/movie/${categoryQuery}`
        try{
            const response = await fetch(url,{
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': process.env.TMDB_ACESS_TOKEN,
                    'User-Agent': 'tmdb-app-project'
                }
            }) 
            const data = await response.json()
            if(!response.ok){
                if(response.status === 403){
                    return console.error('Error: You reached the limit of requests by now, try again in a few moments')
                }
                throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
            }
            data.results.forEach((movie, index) => {
                const movieData = {
                    Index: index + 1,
                    Title: movie.title,
                    Popularity: movie.popularity,
                    Rated: Number(movie.vote_average.toFixed(2)),
                    ReleaseAt: movie.release_date,
                }
                console.log(movieData)
            });
        }
        catch (error) {
            console.error('Error fetching data:', error.message)
        }

        
    })

program.parse(process.argv)