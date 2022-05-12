const playPauseBtn = document.querySelector('.play-pause-btn')
const video = document.querySelector('video')
playPauseBtn.addEventListener('click', togglePlay)


function togglePlay() {
  video.paused ? video.play() : video.pause()
}