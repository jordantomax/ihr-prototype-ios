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

  genres: ->
    _.each genres, (el, i) ->
      genreModel = new app.GenreModel el
      genreTile = new app.GenreTile model: genreModel
      $('#genres').append(genreTile.render())

