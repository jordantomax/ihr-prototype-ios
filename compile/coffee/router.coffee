class app.Router
  constructor: ->
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


  genres: ->
    self = @;
    genres = new app.Genres
    genres.reset genresData

    genres.each (model) ->
      genreTile = new app.GenreTile model: model
      $('#genres').append(genreTile.render())

    $('#go-to-stations').on 'click', ->
      selectedGenres = []
      genres.each (model) ->
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
    stations.each (model) ->
      stationRow = new app.StationRow model: model
      $('#m-station-rows').append(stationRow.render())

    @switchPages('stations')
