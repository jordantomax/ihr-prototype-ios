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

    $('#go-to-stations').on 'click', ->
      selectedGenres = []
      app.genres.each (model) ->
        if model.get('checked') == true
          selectedGenres.push(model)

      self.stations(selectedGenres)

    if !app.genres
      app.genres = new app.Genres

      $.ajax
        url: "http://apistage.ccrd.clearchannel.com/api/v2/content/genre?offset=0&limit=10&sortBy=sort&showHidden=false"
        type: "GET"
        dataType: 'json'
        success: (genres) ->
          console.log genres
          app.genres.reset genres.hits

          app.genres.each (model) ->
            genreTile = new app.GenreTile model: model
            $('#genres').append(genreTile.render())

        # beforeSend: (xhr) ->
        #   xhr.setRequestHeader "Authorize", " Bearer T2R6dFl2MXY4bA=="

  stations: (selectedGenres) ->
    selectedStationsData = []
    sortedStationsData = []
    stationsurl = 'http://apistage.ccrd.clearchannel.com/api/v2/recs/genre?offset=0&limit=10&template=LRRM,CR,DL'
    getUrl =
      live: (id) ->
        'http://apistage.ccrd.clearchannel.com/api/v2/content/liveStations/' + id

      custom: (id) ->
        'http://apistage.ccrd.clearchannel.com/api/v1/catalog/getArtistByArtistId?artistId=' + id + '&includeBio=true'

    _.each selectedGenres, (genre) ->
      stationsurl += '&genreId=' + genre.id

    $.ajax
      url: stationsurl
      type: "GET"
      dataType: 'json'
      success: (stationsData) ->
        _.each stationsData.values, (data) ->
          type = if data.type == "LRRM" or data.type == "LN" or data.type == "LR" then 'live' else 'custom'

          $.ajax
            url: getUrl[type](data.contentId)
            type: "GET"
            dataType: 'json'
            success: (additionalData) ->
              stationType = if type is 'live' then 'hits' else 'artist'
              data = _.extend data, if additionalData[stationType][0] isnt undefined then additionalData[stationType][0] else additionalData[stationType]


        $('#m-station-rows').empty()

        stations = new app.Stations stationsData.values

        stations.each (station) ->
          stationRow = new app.StationRow model: station
          $('#m-station-rows').append(stationRow.render())

      # beforeSend: (xhr) ->
      #   xhr.setRequestHeader "Authorize", " Bearer T2R6dFl2MXY4bA=="

    # _.each stationsData, (station, i) ->
    #   intersection = _.intersection(station.genres, selectedGenres)

    #   if intersection.length > 0
    #     station.genreMatches = intersection.length
    #     selectedStationsData.push station

    # sortedStationsData = _.sortBy selectedStationsData, (station) ->
    #   -1 * station.genreMatches

    stations = new app.Stations sortedStationsData
    $('#m-station-rows').empty()
    stations.each (model) ->
      stationRow = new app.StationRow model: model
      $('#m-station-rows').append(stationRow.render())

    @switchPages('stations')
