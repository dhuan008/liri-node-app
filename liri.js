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
                if (error) {
                    console.log(error);
                }
                else if (param === undefined) {
                    console.log(`If you haven't watched "Mr. Nobody", then you should: <http://www.imdb.com/title/tt0485947/>\nIt's on Netflix!`);
                }
                else {
                    console.log(`Title of the movie is: ${response.data.Title}`);
                    console.log(`Year the movie came out is: ${response.data.Year}`);
                    console.log(`Rotten Tomatoes Rating of ${response.data.Title} is: ${response.data.Ratings[1].Value}`);
                    console.log(`Country where the movie was produced is: ${response.data.Country}`);
                    console.log(`Language of the movie is: ${response.data.Language}`);
                    console.log(`Plot of the movie is: ${response.data.Plot}`);
                    console.log(`Actors in the movie are: ${response.data.Actors}`);
                }
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
            if (err) {
                console.log(err);
            }
            else {
                const songs = data.tracks.items;
                console.log('============SONG INFO============');
                fs.appendFileSync('log.txt', '============SONG INFO============\n');
                console.log(`Song name: ${songs[0].name}`);
                fs.appendFileSync('log.txt', `song name: ${songs[0].name}\n`);
                console.log(`Preview song: ${songs[0].preview_url}`);
                fs.appendFileSync('log.txt', `preview song: ${songs[0].preview_url}\n`);
                console.log(`Album: ${songs[0].album.name}`);
                fs.appendFileSync('log.txt', `album: ${songs[0].album.name}\n`);
                console.log(`Artist(s): ${songs[0].artists[0].name}`);
                fs.appendFileSync('log.txt', `artist(s): ${songs[0].artists[0].name}\n`);
                console.log('=============================');
                fs.appendFileSync('log.txt', '=============================');
            }
        }
    );
};

// Bands in town
function showConcertInfo(queryConcertUrl) {
    axios.get(queryConcertUrl)
        .then((response) => {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            console.log(moment(response.data[0].datetime).format("MM DD YYYY"));
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
