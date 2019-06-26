require('dotenv').config();

var keys = require('./keys');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');

var option = process.argv[2];
var param = process.argv[3];

function showMovieInfo(queryUrl) {
    axios.get(queryUrl)
        .then(
            function (response, error) {
                if (error) {
                    console.log(error);

                }
                if (param === undefined) {
                    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
                    console.log("It's on Netflix!");
                }
                else {

                    console.log("Title of the movie is: " + response.data.Title);
                    console.log("Year the movie came out is: " + response.data.Year);
                    console.log("Rotten Tomatoes Rating of " + param + " is: " + response.data.Ratings[1].Value);
                    console.log("Country where the movie was produced is: " + response.data.Country);
                    console.log("Language of the movie is: " + response.data.Language);
                    console.log("Plot of the movie is: " + response.data.Plot);
                    console.log("Actors in the movie are: " + response.data.Actors);
                }
            }
        )
}

// Spotify
function showSongInfo(param) {
    if (param === undefined) {
        param = "The Sign";
    }
    spotify.search(
        {
            type: "track",
            query: param,
            limit: '1'
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
            }
            else {
                var songs = data.tracks.items;
                for (var i = 0; i < songs.length; i++) {
                    console.log("**********SONG INFO*********");
                    fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                    console.log(i);
                    fs.appendFileSync("log.txt", i + "\n");
                    console.log("Song name: " + songs[i].name);
                    fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                    console.log("Preview song: " + songs[i].preview_url);
                    fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                    console.log("Album: " + songs[i].album.name);
                    fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                    console.log("Artist(s): " + songs[i].artists[0].name);
                    fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                    console.log("*****************************");
                    fs.appendFileSync("log.txt", "*****************************\n");
                }
            }
        }
    );
};


function showConcertInfo(queryConcertUrl) {
    axios.get(queryConcertUrl)
        .then((response) => {
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            console.log(moment(response.data[0].datetime).format("MM DD YYYY"));
        });
}


function readTxtFile() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }

        data = data.split(",");

        option = data[0];
        param = data[1];

        switchStatements(option, param);
    });
}

function switchStatements(option, param) {
    switch (option) {
        case "movie-this":
            var queryUrl = "http://www.omdbapi.com/?t=" + param + "&y=&plot=short&apikey=trilogy";
            showMovieInfo(queryUrl)
            break;

        case 'spotify-this-song':
            showSongInfo(param);
            break;

        case "concert-this":
            var queryConcertUrl = "https://rest.bandsintown.com/artists/" + param + "/events?app_id=codingbootcamp";
            showConcertInfo(queryConcertUrl);
            break;

        case "do-what-it-says":
            readTxtFile();
            break;

        default:
            console.log("Invalid Option");
    }
}

switchStatements(option, param);
