#!/usr/bin/env node
import fs from 'fs';
import { Command } from "commander";

const scanf = ()=>{
    const buffer = Buffer.alloc(1024);
    const bytesRead = fs.readSync(0,buffer, 0, 1024, null);
    return buffer.toString('utf-8', 0, bytesRead).trim();
}
const sendUserScore = (attempts, timerFinal, dificulty)=>{
    let dificultyString = ""
    switch (dificulty) {
        case 10:
            dificultyString = "Easy"
            break;
        case 5:
            dificultyString = "Medium"
            break;
        case 3:
            dificultyString = "Hard"
            break;
        default:
            break;
    }
    let UserDataString = "[]"
    if(fs.existsSync('./UserScore.json')){
        UserDataString = fs.readFileSync('./UserScore.json', 'utf-8');
    }
    const UserDataArray = JSON.parse(UserDataString);
    const newDataArray = {
        "dificulty": dificultyString,
        "attempts": attempts,
        "time": timerFinal.toFixed(2)
    }
    UserDataArray.push(newDataArray);
    fs.writeFileSync('./UserScore.json', JSON.stringify(UserDataArray, null, 2), 'utf-8');
}
const checkForHighscore = (attempts, timerFinal, dificulty)=>{
    let dificultyString = ""
    switch (dificulty) {
        case 10:
            dificultyString = "Easy"
            break;
        case 5:
            dificultyString = "Medium"
            break;
        case 3:
            dificultyString = "Hard"
            break;
        default:
            break;
    }
    if (!fs.existsSync('./UserScore.json')) {
        return;
    }
    const userDataString = fs.readFileSync('./UserScore.json', 'utf-8');
    const userDataArray = JSON.parse(userDataString);
    let leastAttempts = Infinity
    let fastestTime = Infinity
    let findMatch = false

    userDataArray.forEach(element => {
        if(element.dificulty === dificultyString){
            findMatch = true;
            if(element.attempts < leastAttempts){
                leastAttempts = element.attempts;
            }
            if(Number(element.time) < fastestTime){
                fastestTime = Number(element.time);
            }
        }
    });

    if(findMatch === false){
        console.log(`\nFirst match completed in ${dificultyString} mode! Highscores established!`);
        return;
    }
    if(attempts < leastAttempts){
        console.log(`New Highscore for least attempts in the ${dificultyString} Mode! (Best: ${attempts} vs Old: ${leastAttempts})`);
    }
    if(Number(timerFinal.toFixed(2)) < fastestTime){
        console.log(`New Highscore for the fastest completion in the ${dificultyString} Mode! (Best: ${timerFinal.toFixed(2)}s vs Old: ${fastestTime}s)`);
    }
}

const intro = ()=>{
    console.log('\n-------------------------------------------------------------------------------------------------------');
    console.log("Welcome to the Number Guessing Game!");
    console.log("I'm thinking of a number between 1 and 100.");
    console.log("You have 5 chances to guess the correct number.\n");
    console.log("Please select the difficulty level:");
    console.log("1. Easy (10 chances)");
    console.log("2. Medium (5 chances)");
    console.log("3. Hard (3 chances)");
    console.log('-------------------------------------------------------------------------------------------------------\n');
}
const dificultyChoice = ()=>{
    process.stdout.write('Enter your choice: ')
    const dificultyChoice = parseInt(scanf(),10);
    switch(dificultyChoice){
        case 1:
            console.log("\nGreat! You have selected the Easy difficulty level.");
            console.log("Let's start the game!\n");
            console.log('-------------------------------------------------------------------------------------------------------\n');
            return 10
            break;
        case 2:
            console.log("\nGreat! You have selected the Medium difficulty level.");
            console.log("Let's start the game!\n");
            console.log('-------------------------------------------------------------------------------------------------------\n');
            return 5
            break;
        case 3:
            console.log("\nGreat! You have selected the Hard difficulty level.");
            console.log("Let's start the game!\n");
            console.log('-------------------------------------------------------------------------------------------------------\n');
            return 3
            break;
        default:
            console.error("\nYou didn't chose one of the options, select 1, 2 or 3 to chose a dificulty");
            console.error('-------------------------------------------------------------------------------------------------------\n');
    }
}
const game = (dificulty)=>{
    const chances = dificulty
    const numberChosen = Math.floor(Math.random()*100)+1
    let numberGuessed = 0;
    let attempts = 0;
    const timerStart = performance.now()
    while(attempts < chances){
        process.stdout.write("Enter your guess: ");
        numberGuessed = parseInt(scanf(), 10);
        attempts += 1;
        if(numberChosen > numberGuessed){
            console.log(`Incorrect! The number is greater than ${numberGuessed}.`)
        }
        else if(numberChosen < numberGuessed){
            console.log(`Incorrect! The number is less than ${numberGuessed}.`)
        }
        else{
            break;
        }
        console.log(hints(numberGuessed, numberChosen)+'\n');
    }
    console.log('\n-------------------------------------------------------------------------------------------------------\n');
    if(numberChosen === numberGuessed){
        const timerEnd = performance.now()
        const timerFinal = Number(timerEnd - timerStart)/1000
        console.log(`Congratulations! You guessed the correct number in ${attempts} attempts.`)
        console.log(`It took you ${timerFinal.toFixed(2)} seconds to guess the number!`)
        checkForHighscore(attempts, timerFinal, dificulty);
        sendUserScore(attempts, timerFinal, dificulty);
        console.log('Would you like to play another round?\n');
        process.stdout.write("Enter your choice ( yes / no ): ");
        const choice = scanf();
        return choice
    }
    else{
        const timerEnd = performance.now()
        const timerFinal = Number(timerEnd - timerStart)/1000
        console.log(`You could not guess the number in ${attempts} attempts.`)
        console.log('Would you like to play another round?\n');
        process.stdout.write("Enter your choice ( yes / no ): ");
        const choice = scanf();
        return choice
    }
    console.log('\n-------------------------------------------------------------------------------------------------------\n');
}
const hints = (numberGuessed, numberChosen)=>{
    const isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };
    const isEven = numberChosen%2 === 0; 
    const numberChosenSum = Math.floor(numberChosen/10)+(numberChosen%10)
    const diference = Math.abs(numberChosen-numberGuessed)

    const hintData = [
        isEven ? "The number is Even." : "The number is Odd.",
        isPrime(numberChosen) ? "The number is Prime." : "The number is Not Prime.",
        numberChosen%3 === 0 ? "The number is a multiple of 3." : "The number is Not a multiple of 3.",
        numberChosen%5 === 0 ? "The number is a multiple of 5." : "The number is Not a multiple of 5.",
        `If you add the digits of the number you have ${numberChosenSum}`,
        `The last digit of the number is ${numberChosen%10}`,
        diference<=10 ? 'Your last guess was with 10 or less numbers form the number.' : 'Your last guess was with more than 10 numbers form the number.'
    ]
    const randomIndex = Math.floor(Math.random()*hintData.length)
    return hintData[randomIndex];
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
        const dificultyLevel = dificultyChoice();
        let playagain = 'yes'
        do{
           playagain = game(dificultyLevel);
           console.log('\n')
        }while(playagain === 'yes')
        console.log('exiting...')
        console.log('thanks for playing!\n')
        console.log('-------------------------------------------------------------------------------------------------------');
    });

program
    .command('highscore')
    .description('Use this comand to see previous attempts and the current highscore')
    .option('-d, --dificulty <dificulty>', 'filter to see only about a singular dificulty')
    .requiredOption('-h, --highscore <highscore>', 'Chose to check the fastest time or fewer attemps')
    .action((options)=>{
        if (!fs.existsSync('./UserScore.json')) {
            console.log('\n-------------------------------------------------------------------------------------------------------');
            console.log('No scores registered yet. Play a game first!');
            console.log('-------------------------------------------------------------------------------------------------------\n');
            return;
        }

        // 2. Ler e parsear os dados do JSON
        const userDataString = fs.readFileSync('./UserScore.json', 'utf-8');
        let scores = JSON.parse(userDataString);

        // 3. Aplicar filtro de dificuldade, se fornecido (Ex: -d Easy)
        if (options.dificulty) {
            const searchDifficulty = options.dificulty.toLowerCase();
            scores = scores.filter(score => score.dificulty.toLowerCase() === searchDifficulty);
        }

        // 4. Ordenar o array com base no argumento obrigatório -h
        if (options.highscore === 'attempts') {
            // Ordena por menos tentativas. Desempate por menor tempo.
            scores.sort((a, b) => {
                if (a.attempts !== b.attempts) return a.attempts - b.attempts;
                return parseFloat(a.time) - parseFloat(b.time);
            });
        } else if (options.highscore === 'time') {
            // Ordena por menor tempo. Desempate por menos tentativas.
            scores.sort((a, b) => {
                if (parseFloat(a.time) !== parseFloat(b.time)) return parseFloat(a.time) - parseFloat(b.time);
                return a.attempts - b.attempts;
            });
        } else {
            console.error('\nInvalid value for --highscore. Choose "time" or "attempts".\n');
            return;
        }

        // 5. Mapear e estruturar o layout para exibição no console.table
        const rankingTable = scores.map((score, index) => ({
            "Rank": index + 1,
            "Difficulty": score.dificulty,
            "Attempts": score.attempts,
            "Time": `${score.time}s`
        }));

        // 6. Exibir o resultado formatado
        console.log('\n-------------------------------------------------------------------------------------------------------');
        console.log(`=== LEADERBOARD RANKING (Ordered by: ${options.highscore}) ===`);
        if (options.dificulty) console.log(`Filtered by Difficulty: ${options.dificulty}`);
        console.log('-------------------------------------------------------------------------------------------------------\n');
        
        if (rankingTable.length === 0) {
            console.log('No scores found matching the criteria.');
        } else {
            console.table(rankingTable, ["Rank", "Difficulty", "Attempts", "Time"]);
        }
        console.log('\n-------------------------------------------------------------------------------------------------------\n');
    });

if(process.argv.length <= 2){
    console.error('\n-----------------------------------------------------------------------------------------------------');
    console.error('You must type a command after number-game.');
    console.error('If you dont know any, type -h or --help to know the commands avalible');
    console.error('-----------------------------------------------------------------------------------------------------\n');
    process.exit(1);
}

program.parse(process.argv);