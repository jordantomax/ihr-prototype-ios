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
    width = $('.p').width() - 50
    console.log $('.p').is(':visible')

    $('.g-app-drawer').css('display', 'block')
    $('.p:visible').animate(
      marginLeft: width
    )



