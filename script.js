console.log("Welcome to Voice");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let mastersongname = document.getElementById('mastersongname');
let gif = document.getElementById('gif');
let songitem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songname:"Music 1",filPath:"songs/1.mp3",coverPath:"icon.png"},
    {songname:"Music 2",filPath:"songs/2.mp3",coverPath:"icon.png"},
    {songname:"Music 3",filPath:"songs/3.mp3",coverPath:"icon.png"},
    {songname:"Music 4",filPath:"songs/4.mp3",coverPath:"icon.png"},
    {songname:"Music 5",filPath:"songs/5.mp3",coverPath:"icon.png"},
    {songname:"Music 6",filPath:"songs/6.mp3",coverPath:"icon.png"},
    {songname:"Music 7",filPath:"songs/7.mp3",coverPath:"icon.png"},
    {songname:"Music 8",filPath:"songs/8.mp3",coverPath:"icon.png"},
    {songname:"Music 9",filPath:"songs/9.mp3",coverPath:"icon.png"},
    {songname:"Music 10",filPath:"songs/10.mp3",coverPath:"icon.png"},
]

// audioElement.play(); 

songitem.forEach((element,i) => {
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
});


//Handle play/pause click
masterplay.addEventListener('click',() => {
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity =1;
    }
    else
    {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity =0;
    }
})

//Listen to events 
audioElement.addEventListener('timeupdate',() => {
    // console.log('timeupdate');
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
    console.log(progress);
});

myprogressbar.addEventListener('change',() => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
});

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => 
    {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
 
Array.from(document.getElementsByClassName('songitemplay')).forEach(element => {
    element.addEventListener('click',(e) => {
        makeAllplays();
        console.log(e.target);
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        mastersongname.innerText = songs[songIndex-1].songname;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity =1;
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
    });
});

document.getElementById('next').addEventListener('click',() => {
    songIndex = (songIndex+1)%10;
    audioElement.src = `songs/${songIndex}.mp3`;
    mastersongname.innerText = songs[songIndex-1].songname;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
})

document.getElementById('previous').addEventListener('click',() => {
    songIndex = (songIndex-1)%10;
    if(songIndex==0)
    {songIndex = 10;}
    mastersongname.innerText = songs[songIndex-1].songname;
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-pause-circle');
    masterplay.classList.add('fa-play-circle');
})