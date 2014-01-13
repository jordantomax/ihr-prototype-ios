  genreNames = [
    'top 40 & pop',
    'country',
    'hip hop',
    'r & b',
    'alternative',
    'rock',
    'news & talk',
    'sports',
    'religious',
    'spanish',
    'dance',
    'oldies',
    'classic rock',
    'mix & variety',
    'soft rock',
    'jazz',
    'classical',
    'personalities',
    'comedy',
    'international',
    'college radio',
    'reggae & island'
  ]

  window.genres = []

  _.each genreNames, (el, i) ->
    formattedName = el.replace(/[^\w\s]/gi, '').replace(/\s\s/g, ' ').replace(/\s/g, '-')
    window.genres.push
      name: el
      src: 'assets/img/genres/' + formattedName + '.jpg'


