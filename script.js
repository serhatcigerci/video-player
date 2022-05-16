const playPauseBtn = document.querySelector('.play-pause-btn')
const theaterBtn = document.querySelector('.theater-btn')
const fullScreenBtn = document.querySelector('.full-screen-btn')
const miniPlayerBtn = document.querySelector('.mini-player-btn')
const video = document.querySelector('video')
const videoContainer = document.querySelector('.video-container')

document.addEventListener('keydown', e => {
  const tagName = document.activeElement.tagName.toLowerCase()

  if (tagName === 'input') return 

  switch (e.key.toLowerCase()) {
    case ' ':
      if (tagName === 'button') return
      case 'k':
        togglePlay()
        break
        case 'f':
          togglefullScreen()
          break
        case 't':
          toggleTheater()
          break
        case 'i':
          toggleminiPlayer()
          break
  }
})


theaterBtn.addEventListener('click', toggleTheater)
fullScreenBtn.addEventListener('click', togglefullScreen)
miniPlayerBtn.addEventListener('click', toggleminiPlayer)

function togglePlay() {
  video.paused ? video.play() : video.pause()
}

function toggleTheater() {
  videoContainer.classList.toggle('theater')
}

function togglefullScreen() {
  if (document.fullscreenElement === null) {
    videoContainer.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

function toggleminiPlayer() {
  if (videoContainer.classList.contains('mini-player')) {
    document.exitPictureInPicture()
  } else {
    video.requestPictureInPicture()
  }
}
document.addEventListener('fullscreenchange', () => {
  videoContainer.classList.toggle('full-screen', document.fullscreenElement)
})

video.addEventListener('enterpictureinpicture', () => {
  videoContainer.classList.add('mini-player')
})

video.addEventListener('leavepictureinpicture', () => {
  videoContainer.classList.remove('mini-player')
})

video.addEventListener('play', () => {
  videoContainer.classList.remove('paused')
})

video.addEventListener('pause', () => {
  videoContainer.classList.add('paused')
})

playPauseBtn.addEventListener('click', togglePlay)
video.addEventListener('click', togglePlay)