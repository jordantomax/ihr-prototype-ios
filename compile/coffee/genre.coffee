class app.Genre extends Backbone.Model
  defaults:
    checked: false

class app.Genres extends Backbone.Collection
  model: app.Genre

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

    @model.checked = !@model.checked
    @$el.toggleClass 'checked'
