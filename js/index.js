

const API_KEY = "AIzaSyDHWOjyWGUDUBF0NZ0zQsT96KEombDrO38";
const API_PART = "id,snippet"
const MAX_RESULTS =10;
let nextPageToken = "";
let prevPageToken = "";
let url;
let searchTerm;
 
function fetchVideos( searchTerm ){
    if(searchTerm!=""){
        
        let settings = {
        method : 'GET',
    };
    console.log( url );
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults( responseJSON );
        })
        .catch( err => {
            console.log( err.message ); 
        });
    }
}

function displayResults( data ){
    //console.log( "Reached display" );
    let results = document.querySelector( '.results' );
    results.innerHTML = "";
    for( let i = 0; i < data.items.length; i ++ ){
        results.innerHTML += `
            <div class="result-item">
                <h2 class="title-item" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" >
                    ${data.items[i].snippet.title}
                </h2>
                <div>
                    <img src="${data.items[i].snippet.thumbnails.default.url}" class=thumbnail-item href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}" />
                </div>
                <p>
                    ${data.items[i].snippet.description}
                </p>
            </div>
        `;
    }
    window.scrollTo(0, 0);
    navigation(data.nextPageToken, data.prevPageToken);
}

function navigation(nextPageToken, prevPageToken) {
    let next = document.querySelector('.next');
    let prev = document.querySelector('.previous');
    if (nextPageToken) {
        next.addEventListener("click", (event) => {
            url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=${API_PART}&q=${searchTerm}&maxResults=${MAX_RESULTS}` + `&pageToken=${nextPageToken}`;
            fetchVideos();
            event.preventDefault();
        });
    }
    if (prevPageToken) {
        prev.addEventListener("click", (event) => {
            url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=${API_PART}&q=${searchTerm}&maxResults=${MAX_RESULTS}` + `&pageToken=${prevPageToken}`;
            fetchVideos();
            event.preventDefault();
        });
    }
}

function watchForm(){
    let submitButtton = document.querySelector( '.submitButtton' );

    submitButtton.addEventListener( 'click', ( event ) => {
        event.preventDefault();

        searchTerm = document.querySelector( '#searchTerm' ).value;
        if(searchTerm !=""){
            url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=${API_PART}&q=${searchTerm}&maxResults=${MAX_RESULTS}`;
            fetchVideos( searchTerm );
        }
    });
}

function OpenLink(){
    let resultSection = document.querySelector( '.results' );

    resultSection.addEventListener( 'click', (event) => {
        console.log(event.target);
        if(event.target.matches( '.title-item' ) || event.target.matches( '.thumbnail-item' )){
            console.log("Its a title or thumbnail");
            console.log(event.target.getAttribute('href'));
            window.open(event.target.getAttribute('href'),'_blank');
        }
    } );
}

function changePage(){
    let buttonsSection = document.querySelector( '.buttons' );

    buttonsSection.addEventListener( 'click', (event) => {
        console.log(event.target);
        if(event.target.matches( '.previous' )){
            console.log("Previous button");
        }
        if(event.target.matches( '.next' )){
            console.log("Next button");
        }
        let resultSection = document.querySelector( '.results' );
        resultSection.innerText.remove();
    } );
}


function init(){
    watchForm();
    OpenLink(); 
    //changePage();
}

init();