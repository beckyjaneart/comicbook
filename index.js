var $comic = document.getElementById('comic')
var $prev = document.getElementById('prev')
var $next = document.getElementById('next')
var startingIndex = 0

var comic = new ComicBook($comic, {
  pages: __COMIC_PAGES__,
  aws: {
    region: 'us-east-2',
    bucket: 'becky-jane.com/comicbook'
  },
  onPageChange: function (index) {
    location.hash = index

    if (window.localStorage) {
      localStorage.setItem('index', index)
    }
  }
})

if (location.hash) {
  startingIndex = location.hash.substr(1)
} else if (window.localStorage) {
  startingIndex = localStorage.getItem('index') || 0
}

comic.loadIndex(startingIndex)

$prev.addEventListener('click', comic.prev)
$next.addEventListener('click', comic.next)

window.addEventListener('hashchange', function () {
  comic.loadIndex(parseInt(location.hash.substr(1)))
})

document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'ArrowLeft':
      comic.prev()
      break
    case 'ArrowRight':
      comic.next()
      break
  }  
})
