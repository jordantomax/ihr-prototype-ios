class app.GenreModel extends Backbone.Model
  defaults:
    checked: false

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
    @model.checked = !@model.checked
    @$el.toggleClass 'checked'

