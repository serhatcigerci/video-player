const playPauseBtn = document.querySelector('.play-pause-btn')
const theaterBtn = document.querySelector('.theater-btn')
const fullScreenBtn = document.querySelector('.full-screen-btn')
const miniPlayerBtn = document.querySelector('.mini-player-btn')
const video = document.querySelector('video')
const currentTimeElem = document.querySelector('.current-time')
const totalTimeElem = document.querySelector('.total-time')
const muteBtn = document.querySelector('.mute-btn')
const volumeSlider = document.querySelector('.volume-slider')
const videoContainer = document.querySelector('.video-container')

video.addEventListener('loadeddata', () => {
  totalTimeElem.textContent = formatDuration(video.duration)
})

video.addEventListener('timeupdate', () => {
  currentTimeElem.textContent = formatDuration(video.currentTime)
})

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})
function formatDuration(time) {
  const seconds = Math.floor(time % 60)
  const minutes = Math.floor(time / 60) % 60
  const hours = Math.floor(time / 3600)
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`
  }
}

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
        case 'm':
          toggleMute()
          break
        case 'j':
        case 'arrowleft':
          skip(-5)
          break
        case 'l':
        case 'arrowright':
          skip(5)
          break
  }
})

muteBtn.addEventListener('click', toggleMute)
volumeSlider.addEventListener('input', e => {
  video.volume = e.target.value
  video.muted = e.target.value === 0
})

function toggleMute() {
  video.muted = !video.muted
}

video.addEventListener('volumechange', () => {
  volumeSlider.value = video.volume
  let volumeLevel
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0
    volumeLevel = 'muted'
  } else if (video.volume >= 0.5) {
    volumeLevel = 'high'
  } else {
    volumeLevel = 'low'
  }
  videoContainer.dataset.volumeLevel = volumeLevel
})


theaterBtn.addEventListener('click', toggleTheater)
fullScreenBtn.addEventListener('click', togglefullScreen)
miniPlayerBtn.addEventListener('click', toggleminiPlayer)

function skip(duration) {
  video.currentTime += duration 
}

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