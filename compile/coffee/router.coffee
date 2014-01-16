class app.Router
  constructor: ->
    self = @

    $(document).on 'click', "a[href^='/']", (event) ->

        href = $(event.currentTarget).attr('href')

        # Allow shift+click for new tabs, etc.
        if !event.altKey and !event.ctrlKey and !event.metaKey and !event.shiftKey
          event.preventDefault()

          # Remove leading slashes and hash bangs (backward compatablility)
          url = href.replace(/^\//,'').replace('\#\!\/','')
          data = $(@).data()

          # Instruct Backbone to trigger routing events
          self.router.navigate url, {trigger: true, data: data }

          return false

    @genres()

    _.each @pages, (page) ->
      $('.route-' + page).on 'click', ->
        self.switchPages page

    hamburger = new app.header.Hamburger
    $('.g-app-capital').prepend(hamburger.render())

  routes:
    '*genres': 'genres'

  pages: [
    'genres',
    'stations'
  ]

  switchPages: (newPage) ->
    _.each @pages, (page) ->
      $page = $('#p-' + page)
      if $page.is ':visible'
        $page.fadeOut()
    $('#p-' + newPage).fadeIn()
    $('body').removeClass().addClass(newPage)

  genres: ->
    self = @;

    if !app.genres
      app.genres = new app.Genres
      app.genres.reset genresData

      app.genres.each (model) ->
        genreTile = new app.GenreTile model: model
        $('#genres').append(genreTile.render())

      $('#go-to-stations').on 'click', ->
        selectedGenres = []
        app.genres.each (model) ->
          if model.get('checked') == true
            selectedGenres.push(model.get('formattedName'))

        self.stations(selectedGenres)

  stations: (selectedGenres) ->
    selectedStationsData = []
    sortedStationsData = []

    _.each stationsData, (station, i) ->
      intersection = _.intersection(station.genres, selectedGenres)

      if intersection.length > 0
        station.genreMatches = intersection.length
        selectedStationsData.push station

    sortedStationsData = _.sortBy selectedStationsData, (station) ->
      -1 * station.genreMatches

    stations = new app.Stations sortedStationsData
    $('#m-station-rows').empty()
    stations.each (model) ->
      stationRow = new app.StationRow model: model
      $('#m-station-rows').append(stationRow.render())

    @switchPages('stations')
