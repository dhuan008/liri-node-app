require('dotenv').config();

const keys = require('./keys');
const Spotify = require('node-spotify-api');
const fs = require('fs');
const axios = require('axios');
const moment = require('moment');

const spotify = new Spotify(keys.spotify);
let option = process.argv[2];
let param = process.argv[3];

const showMovieInfo = queryUrl => {
    axios.get(queryUrl)
        .then(
            function (response, error) {
                error ? console.log(error)
                    : param === undefined ? console.log(`If you haven't watched "Mr. Nobody", then you should: <http://www.imdb.com/title/tt0485947/>\nIt's on Netflix!`)
                        : (
                            console.log('============MOVIE INFO============'),
                            console.log(`Title of the movie is: ${response.data.Title}`),
                            console.log(`Year the movie came out is: ${response.data.Year}`),
                            console.log(`Rotten Tomatoes Rating of ${response.data.Title} is: ${response.data.Ratings[1].Value}`),
                            console.log(`Country where the movie was produced is: ${response.data.Country}`),
                            console.log(`Language of the movie is: ${response.data.Language}`),
                            console.log(`Plot of the movie is: ${response.data.Plot}`),
                            console.log(`Actors in the movie are: ${response.data.Actors}`),
                            console.log('=================================='),
                            fs.appendFileSync('log.txt', '============MOVIE INFO============\n'),
                            fs.appendFileSync('log.txt', `Title of the movie is: ${response.data.Title}\n`),
                            fs.appendFileSync('log.txt', `Year the movie came out is: ${response.data.Year}\n`),
                            fs.appendFileSync('log.txt', `Rotten Tomatoes Rating of ${response.data.Title} is: ${response.data.Ratings[1].Value}\n`),
                            fs.appendFileSync('log.txt', `Country where the movie was produced is: ${response.data.Country}\n`),
                            fs.appendFileSync('log.txt', `Language of the movie is: ${response.data.Language}\n`),
                            fs.appendFileSync('log.txt', `Plot of the movie is: ${response.data.Plot}\n`),
                            fs.appendFileSync('log.txt', `Actors in the movie are: ${response.data.Actors}\n`),
                            fs.appendFileSync('log.txt', '==================================\n\n')
                        );
            }
        )
}

// Spotify
const showSongInfo = param => {
    // If param is undefined set it equal to 'The Sign'
    param = param || 'The Sign';

    spotify.search(
        {
            type: "track",
            query: param,
            limit: '1'
        },
        function (err, data) {
            err ? console.log(err) : (
                songs = data.tracks.items,
                console.log('============SONG INFO============'),
                console.log(`Song name: ${songs[0].name}`),
                console.log(`Preview song: ${songs[0].preview_url}`),
                console.log(`Album: ${songs[0].album.name}`),
                console.log(`Artist(s): ${songs[0].artists[0].name}`),
                console.log('================================='),
                fs.appendFileSync('log.txt', '============SONG INFO============\n'),
                fs.appendFileSync('log.txt', `song name: ${songs[0].name}\n`),
                fs.appendFileSync('log.txt', `preview song: ${songs[0].preview_url}\n`),
                fs.appendFileSync('log.txt', `album: ${songs[0].album.name}\n`),
                fs.appendFileSync('log.txt', `artist(s): ${songs[0].artists[0].name}\n`),
                fs.appendFileSync('log.txt', '=================================\n\n')
            );
        }
    );
};

// Bands in town
function showConcertInfo(queryConcertUrl) {
    axios.get(queryConcertUrl)
        .then(
            (response, error) => {
                error ? console.log("Concert not found")
                    : (
                        console.log('============CONCERT INFO============'),
                        console.log(`Name of the venue: ${response.data[0].venue.name}`),
                        console.log(`Venue location: ${response.data[0].venue.city}`),
                        console.log(`Date of the event: ${moment(response.data[0].datetime).format("MM/DD/YYYY")}`),
                        console.log('===================================='),
                        fs.appendFileSync('log.txt', '============CONCERT INFO============\n'),
                        fs.appendFileSync('log.txt', `Name of the venue: ${response.data[0].venue.name}\n`),
                        fs.appendFileSync('log.txt', `Venue location: ${response.data[0].venue.city}\n`),
                        fs.appendFileSync('log.txt', `Date of the event: ${moment(response.data[0].datetime).format("MM/DD/YYYY")}\n`),
                        fs.appendFileSync('log.txt', '====================================\n\n')
                    );
            });
}

// Read from text file
function readTxtFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        error ? console.log(error) : (
            // Split data from file
            data = data.split(","),
            option = data[0],
            param = data[1],

            // Call query on provided params
            switchStatements(option, param)
        )
    });
}

// Selects which query to run
function switchStatements(option, param) {
    switch (option) {
        case 'movie-this':
            const queryUrl = `http://www.omdbapi.com/?t=${param}&y=&plot=short&apikey=trilogy`;
            showMovieInfo(queryUrl)
            break;
        case 'spotify-this-song':
            showSongInfo(param);
            break;
        case 'concert-this':
            const queryConcertUrl = `https://rest.bandsintown.com/artists/${param}/events?app_id=codingbootcamp`;
            showConcertInfo(queryConcertUrl);
            break;
        case 'do-what-it-says':
            readTxtFile();
            break;
        default:
            console.log('Invalid Option');
    }
}

// Function call
switchStatements(option, param);
