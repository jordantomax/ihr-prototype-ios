class app.header.Hamburger extends Backbone.View
  tagName: 'a'
  className: 'g-app-hamburger'
  initialize: ->
    # _.bindAll()
  render: ->
    @el

  events:
    'click': 'slideDrawer'

  slideDrawer: ->
    $('body').toggleClass('drawer-open')
