class app.Genre extends Backbone.Model
  defaults:
    checked: false

class app.Genres extends Backbone.Collection
  model: app.Genre
  url: 'http://apistage.ccrd.clearchannel.com/api/v2/content/genre?offset=0&limit=10&sortBy=sort&showHidden=false'

class app.GenreTile extends Backbone.View
  tagName: 'li'
  class: 'genre-tile'
  initialize: ->
    # _.bindAll()
  template: Handlebars.templates.genreTile

  render: ->
    @$el.html(@template(@model.toJSON()))
    @el

  events:
    'click': 'check'

  check: ->
    if !@model.collection.checked
      @model.collection.checked = true
      @$el.closest('ul').addClass('checked')

    @model.set('checked', !@model.get('checked'))
    @$el.toggleClass 'checked'
