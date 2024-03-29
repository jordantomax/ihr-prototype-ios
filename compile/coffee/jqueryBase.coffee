class app.JqueryBase
	constructor: (@options) ->
		if !@options then @options = {}
		else if @options.el
			@$el = $(@options.el)

			if @$el.length
				app.callFunc @options.beforeInitialize, @

				if @action
					@action()

				app.callFunc @options.onInitialize, @

				if @options.events then _setupEvents.call @

	_setupEvents = ->
		for key of @options.events
			self = @
			event = key
			@$el.on key, (e) ->
				self.options.events[e.type].apply @,  arguments
