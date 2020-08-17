const searchBtn = document.getElementById("search-btn");
const getLyricsBtnSample = document.querySelectorAll(".sample-results .author .get-lyrics");
const getLyricsBtnFancy = document.querySelectorAll(".single-result .text-center .get-lyrics");
const getSongDetails = document.querySelectorAll(".song-details");

                // search button 
searchBtn.addEventListener("click", function(){

    const searchBox = document.getElementById("search-box").value;
    const apiURL ='https://api.lyrics.ovh';

    if (!searchBox) {
        alert('Search box should not be blank.');
    }
    else {
        songSuggestions(searchBox, apiURL);
    }

});

async function songSuggestions(searchBox, apiURL){
    const res = await fetch(`${apiURL}/suggest/${searchBox}`)
    const data = await res.json();
    sampleResults(data);
    fancyResults(data);
}

                // sample results
function sampleResults(info){

    const suggestions = document.querySelectorAll('.sample-results .author');

    for (let i = 0; i < suggestions.length; i++) {

        const element = suggestions[i];

        const suggestedSongs = info.data[i];
        const title = suggestedSongs.title;
        const artist = suggestedSongs['artist'].name;
        

        element.querySelector('strong').innerText = title;
        element.querySelector('span').innerText = artist;

        document.getElementsByClassName("sample-results")[0].style.display = "block"; 

    }

}

                // get lyric - sample results
for (let i = 0; i < getLyricsBtnSample.length; i++) {
    const element = getLyricsBtnSample[i];
    element.addEventListener("click", function(){
        const songTitle = document.querySelectorAll(".sample-results .author strong")[i].innerText;
        const songArtist = document.querySelectorAll(".sample-results .author span")[i].innerText;
        getLyrics(songArtist, songTitle);
        
    });
    
}


                // fancy results
function fancyResults(info){

    const suggestions = document.querySelectorAll('.col-md-7');

    for (let i = 0; i < suggestions.length; i++) {

        const element = suggestions[i];

        const suggestedSongs = info.data[i];
        const title = suggestedSongs.title;
        const artist = suggestedSongs['artist'].name;

        const songCover = suggestedSongs['album'].cover_big;
        const songType = suggestedSongs.type;
        const downloadLink = suggestedSongs.link;
        getSongDetails[i].addEventListener("click", function(){
            songDetails(songCover, title, artist, songType, downloadLink);
        });

        element.querySelector('.lyrics-name').innerText = title;
        element.querySelector('span').innerText = artist;

        document.getElementsByClassName("fancy-results")[0].style.display = "block";

    }
    
}

            // get lyric - fancy results
for (let i = 0; i < getLyricsBtnFancy.length; i++) {
    const element = getLyricsBtnFancy[i];
    element.addEventListener("click", function(){

        const songTitle = document.querySelectorAll(".single-result .col-md-7 .lyrics-name")[i].innerHTML;
        const songArtist = document.querySelectorAll(".single-result .col-md-7 .author span")[i].innerHTML;

        getLyrics(songArtist, songTitle);
        
    });
    
}

function songDetails(songCover, title, artist, songType, downloadLink){
    document.getElementById("img").src = songCover;
    document.getElementById("song-title").innerHTML = title;
    document.getElementById("song-artist").innerHTML = artist;
    document.getElementById("song-type").innerHTML = songType;
    document.getElementById("download-link").href = downloadLink;

    document.getElementsByClassName("fancy-details")[0].style.display = "block";
}


            // single lyric

async function getLyrics(artist, title){
    const response = await fetch('https://api.lyrics.ovh/v1/' + artist + '/' + title);
    const data = await response.json();
    showLyric(data, title, artist);
}

function showLyric(data, title, artist){
    
    const songHeader = document.querySelector(".single-lyrics .text-success");
    songHeader.innerText = title + ' - ' + artist;

    const lyric = document.querySelector(".lyric");
    const songLyric = data.lyrics;
    if(songLyric == undefined){
        alert("Lyric not found. Try another.");
    }
    else{
        lyric.innerText = songLyric;
        document.getElementsByClassName("single-lyrics")[0].style.display = "block";
    }
}






