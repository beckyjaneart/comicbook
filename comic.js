function ComicBook($el, opts) {
  var _index
  var _pages = opts.pages
  var _totalPages = _pages.length

  function loadIndex(index) {
    _index = parseInt(index)
    if (_pages[_index] !== null && _pages[_index] !== undefined) {
      _renderSpread(_index)
    } else {
      loadIndex(0)
    }

    if (opts.onPageChange) {
      opts.onPageChange.call(this, _index)
    }
  }

  function _renderSpread(index) {
    $el.innerHTML = ''
    var spread = _pages[index]
    var left = _renderPage(_getPath(spread[0]), index, 0)
    var right = _renderPage(_getPath(spread[1]), index, 1)

    $el.appendChild(left)
    $el.appendChild(right)
  }

  function _renderPage(path, index, pos) {
    var $spreadPage = document.createElement('div')
    var $pageMeta = document.createElement('div')
    var $img = document.createElement('img')
    var $loading = _getLoadingPage()
    var page

    if (index > 0) {
      page = pos === 0 ? (index * 2) - 1 : (index * 2) 
    } else {
      page = pos === 0 ? '' : 'Front Cover'
    }

    $img.className = 'comic__page-image'
    $pageMeta.innerHTML = page
    $pageMeta.className = 'comic__page-number'
    $spreadPage.appendChild($loading)
    $spreadPage.appendChild($pageMeta)
    $img.src = path
    $img.onload = function () {
      $spreadPage.removeChild($loading)
      $spreadPage.appendChild($img)
    }
    $img.onerror = function () {
      $spreadPage.removeChild($loading)
      $spreadPage.innerHTML = '<img src="images/warning.svg" class="comic__page-error" alt="Error loading page">'
    }
    $spreadPage.className = 'comic__page'

    return $spreadPage
  }

  function _getPath(name) {
    name = name || 'blank-page'
    return 'https://s3.' + opts.aws.region + '.amazonaws.com/' + opts.aws.bucket + '/' + name + '.jpg'
  }

  function _getLoadingPage() {
    var $loading = document.createElement('div')
    var $loadingImg = document.createElement('img')
    $loading.className = 'comic__page-loading'
    $loadingImg.className = 'comic__page-image'
    $loadingImg.src = _getPath('loading-page')
    $loading.appendChild($loadingImg)

    return $loading
  }

  function prev() {
    _index > 0 ? loadIndex(_index - 1) : null
  }

  function next() {
    _index < _totalPages - 1 ? loadIndex(_index + 1) : null
  }

  return {
    loadIndex: loadIndex,
    prev: prev,
    next: next
  }
}