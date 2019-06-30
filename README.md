# liri-node-app

This is a application that allows users to look up information on music, concerts, and movies by selecting options from a list then typing in a search term. This program runs in CLI

### Prerequisties
- Node.js and a package manager installed to a terminal

### Dependencies
- Use yarn or your preferred package manager to install dependencies

Ex.
``
yarn install
``
``
npm install
``

## Running the App
- In your terminal, run node on liri.js to start the app

Ex.
``
node liri.js
``

### Demo: 

![Demo](https://github.com/dhuan008/liri-node-app/blob/master/img/liri-demo.gif)

The user will be prompted with the following:

```
============SEARCH============
? Pick a option:  (Use arrow keys)
> movie-this
  spotify-this-song
  concert-this
  do-what-it-says

```

After selecting a option the user will be presented with the following prompt:

```
? Enter a search term:
```

After entering in a **search term**, the app will fetch and display data to the user in one of the following formats depending on the action and search term:

```
============SEARCH============
? Pick a option:  movie-this
? Enter a search term:  Avengers Endgame
============MOVIE INFO============
Title of the movie is: Avengers: Endgame
Year the movie came out is: 2019
Rotten Tomatoes Rating of Avengers: Endgame is: 94%
Country where the movie was produced is: USA
Language of the movie is: English, Japanese, Xhosa
Plot of the movie is: After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to undo Thanos' actions and restore order to the universe.
Actors in the movie are: Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth
==================================
```
```
============SEARCH============
? Pick a option:  spotify-this-song
? Enter a search term:  old town road
============SONG INFO============
Song Name: Old Town Road - Remix
Preview Link: https://p.scdn.co/mp3-preview/d94ec2ebe62fd52cf038760f57c251c145346bb2?cid=688e9fbd971f461189a0d3275b315274
Album: Old Town Road
Artist: Lil Nas X
=================================
```
```
============SEARCH============
? Pick a option:  concert-this
? Enter a search term:  Jonas
============CONCERT INFO============
Name of the venue: The Glad Cafe C.I.C
Venue location: Glasgow
Date of the event: 10/04/2019
====================================
```

#### Special Commands
The `do-what-it-says` option displays search results loaded from a text file in the same directory labeled `random.txt` .

## Technologies Used
- Node.js
- Yarn
- Axios
- Node-Spotify-API
- OMBD API
- Bands In Town API
- Moments.js
- Inquirer
- fs
- dotenv

## Syntax and Conventions
- Javascript es6