class app.Station extends Backbone.Model

class app.Stations extends Backbone.Collection
  model: app.Station

class app.StationRow extends Backbone.View
  tagName: 'li'
  class: 'station-row'
  initialize: ->
    # _.bindAll()
  template: Handlebars.templates.stationRow

  render: ->
    @$el.html(@template(@model.toJSON()))
    @el

  # events:
  #   'click': 'check'
