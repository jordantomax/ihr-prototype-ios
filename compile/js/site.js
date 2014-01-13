(function() {
  window.app = {};

}).call(this);

(function() {
  app.JqueryBase = (function() {
    var _setupEvents;

    function JqueryBase(options) {
      this.options = options;
      if (!this.options) {
        this.options = {};
      } else if (this.options.el) {
        this.$el = $(this.options.el);
        if (this.$el.length) {
          app.callFunc(this.options.beforeInitialize, this);
          if (this.action) {
            this.action();
          }
          app.callFunc(this.options.onInitialize, this);
          if (this.options.events) {
            _setupEvents.call(this);
          }
        }
      }
    }

    _setupEvents = function() {
      var event, key, self, _results;
      _results = [];
      for (key in this.options.events) {
        self = this;
        event = key;
        _results.push(this.$el.on(key, function(e) {
          return self.options.events[e.type].apply(this, arguments);
        }));
      }
      return _results;
    };

    return JqueryBase;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.JqueryPlugin = (function(_super) {
    __extends(JqueryPlugin, _super);

    function JqueryPlugin(options) {
      this.options = options;
      JqueryPlugin.__super__.constructor.apply(this, arguments);
    }

    JqueryPlugin.prototype.action = function() {
      return this.$el[this.options.plugin](this.options.config);
    };

    JqueryPlugin.prototype.update = function() {
      return this.constructor(this.options);
    };

    return JqueryPlugin;

  })(app.JqueryBase);

}).call(this);

(function() {
  var genreNames;

  genreNames = ['top 40 & pop', 'country', 'hip hop', 'r & b', 'alternative', 'rock', 'news & talk', 'sports', 'religious', 'spanish', 'dance', 'oldies', 'classic rock', 'mix & variety', 'soft rock', 'jazz', 'classical', 'personalities', 'comedy', 'international', 'college radio', 'reggae & island'];

  window.genresData = [];

  _.each(genreNames, function(el, i) {
    var formattedName;
    formattedName = el.replace(/[^\w\s]/gi, '').replace(/\s\s/g, ' ').replace(/\s/g, '-');
    return window.genresData.push({
      name: el,
      src: 'assets/img/genres/' + formattedName + '.jpg'
    });
  });

}).call(this);

(function() {
  var _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.Genre = (function(_super) {
    __extends(Genre, _super);

    function Genre() {
      _ref = Genre.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Genre.prototype.defaults = {
      checked: false
    };

    return Genre;

  })(Backbone.Model);

  app.Genres = (function(_super) {
    __extends(Genres, _super);

    function Genres() {
      _ref1 = Genres.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Genres.prototype.model = app.Genre;

    return Genres;

  })(Backbone.Collection);

  app.GenreTile = (function(_super) {
    __extends(GenreTile, _super);

    function GenreTile() {
      _ref2 = GenreTile.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    GenreTile.prototype.tagName = 'li';

    GenreTile.prototype["class"] = 'genre-tile';

    GenreTile.prototype.initialize = function() {};

    GenreTile.prototype.template = Handlebars.templates.genreTile;

    GenreTile.prototype.render = function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this.el;
    };

    GenreTile.prototype.events = {
      'click': 'check'
    };

    GenreTile.prototype.check = function() {
      if (!this.model.collection.checked) {
        this.model.collection.checked = true;
        this.$el.closest('ul').addClass('checked');
      }
      this.model.checked = !this.model.checked;
      return this.$el.toggleClass('checked');
    };

    return GenreTile;

  })(Backbone.View);

}).call(this);

(function() {
  app.Router = (function() {
    function Router() {
      $(document).on('click', "a[href^='/']", function(event) {
        var data, href, url;
        href = $(event.currentTarget).attr('href');
        if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
          event.preventDefault();
          url = href.replace(/^\//, '').replace('\#\!\/', '');
          data = $(this).data();
          self.router.navigate(url, {
            trigger: true,
            data: data
          });
          return false;
        }
      });
      this.genres();
    }

    Router.prototype.routes = {
      '*genres': 'genres'
    };

    Router.prototype.genres = function() {
      var genres;
      genres = new app.Genres;
      genres.reset(genresData);
      return genres.each(function(model) {
        var genreTile;
        genreTile = new app.GenreTile({
          model: model
        });
        return $('#genres').append(genreTile.render());
      });
    };

    return Router;

  })();

}).call(this);

(function() {
  $(function() {
    var router;
    return router = new app.Router;
  });

}).call(this);
