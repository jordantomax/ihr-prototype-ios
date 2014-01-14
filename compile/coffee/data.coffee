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

window.genresData = []
stationImgPath = 'assets/img/stations/'

_.each genreNames, (el, i) ->
  formattedName = el.replace(/[^\w\s]/gi, '').replace(/\s\s/g, ' ').replace(/\s/g, '-')
  window.genresData.push
    name: el
    formattedName: formattedName
    src: 'assets/img/genres/' + formattedName + '.jpg'


window.stationsData = [
  {
    name: "z100",
    tagline: "New York's Hit Music Station",
    imgSrc: stationImgPath + "z100.png",
    genres: [
      "top-40-pop",
      "country",
      "news-talk"
    ]
  },
  {
    name: "106.7 Lite FM",
    tagline: "New York's Christmas Station",
    imgSrc: stationImgPath + "106.7-lite-fm.png",
    genres: [
      "r-b",
      "alternative",
      "rock"
    ]
  }
]
