let play = document.getElementsByClassName('play')[0];
let forward = document.getElementsByClassName('forward')[0];
let backward = document.getElementsByClassName('backward')[0];
let shuffle = document.getElementsByClassName('shuffle')[0];
let speaker = document.getElementsByClassName('speaker')[0];
let title = document.getElementById('title');
let cover = document.getElementById('image');
let player = document.getElementsByClassName('player')[0];
let start_time = document.getElementsByClassName('start-time')[0];
let end_time = document.getElementsByClassName('end-time')[0];
const audio = document.getElementsByTagName('audio')[0];
let progress = document.getElementsByClassName('music-played-till-now')[0];
let progress_container = document.getElementsByClassName('music-played-complete')[0];


const songs = [
  'Monster - By MusicbyAden (Free Copyright Safe Music)', //0
  'Over You - Atch · [Free Copyright-safe Music]', //1
  'Too Sweet - IVAAVI [Audio Library Release] · Free Copyright-safe Music', //2
  'Trust Me (instrumental) – RYYZN (No Copyright Music)', //3
  "Wanderlust - extenz [Audio Library Release] · Free Copyright-safe Music", //4
  'Wistful Rain by Ghostrifter Official · [Free Copyright-safe Music]' //5
]


let muted = false;


let shuffled = false;
let playing_history = [];

let songIndex = 1;
loadFunction(songs[songIndex]);

function loadFunction(name){
  title.innerText = name;
  audio.src = `Songs/${name}.mp3`;  //Songs/Monster - by ....... .mp3;
  cover.src = `Photos/${name}.jpg`;
}


function playSong(){
  player.classList.add("play");
  play.src="icons/pause.png";
  audio.play();
}


function pauseSong(){
  player.classList.remove("play");
  play.src = "icons/play.png";
  audio.pause();
}

play.addEventListener('click',()=>{ //arrow function
  const isPlaying = player.classList.contains("play");
  if(isPlaying){
    pauseSong();
  }
  else{
    playSong();
  }
})


function nextSong(){
  if(shuffled){
    playing_history.push(songIndex);
    let current  = songIndex;
    while( current == songIndex){
      songIndex = Math.floor(Math.random()*songs.length);
    }
  }
  else{
  songIndex +=1;
  if(songIndex > songs.length-1){
    songIndex = 0;
  }
}
  loadFunction(songs[songIndex]);
  playSong();
}


function prevSong(){

  if(shuffled){
    if(playing_history.length == 0){
      songIndex = Math.floor(Math.rando()*songs.length);
    }
    else{
      songIndex = playing_history[playing_history.length - 1];
      playing_history.pop();
    }
  }
  else{

  songIndex-=1;
  if(songIndex < 0){
    songIndex = songs.length-1;
  }
}
  loadFunction(songs[songIndex]);
  playSong();
}


forward.addEventListener('click', nextSong);
backward.addEventListener('click', prevSong);


function calculate(time){
  let sec = Math.floor(time);
  let min = Math.floor(sec/60);
  while(sec>=60){
    sec -= 60;
  }
  if(!isNaN(min) && !isNaN(sec)){
    min = min >= 10 ? min : "0" +min; //ternary statements
    sec = sec >=10 ? sec : "0" + sec;
    return min + ":" + sec;
  }
}



function  updateProgress(e){
  const  { duration , currentTime } = e.srcElement;

  start_time.innerText = calculate(currentTime);
  if(calculate(duration))
  end_time.innerText = calculate(duration);

  const progrePrecentage  = (currentTime /duration) *100;

  progress.style.width = `${progrePrecentage}%`;

}


function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width )*duration;
}

audio.addEventListener('timeupdate', updateProgress)
progress_container.addEventListener('click' ,setProgress)

speaker.addEventListener('click',()=>{
  speaker.classList.toggle('active');
  muted = !muted;
  audio.muted = muted;
})


shuffle.addEventListener('click',()=>{
  shuffle.classList.toggle('active');
  shuffled = !shuffled;
})

audio.addEventListener('ended', nextSong);
