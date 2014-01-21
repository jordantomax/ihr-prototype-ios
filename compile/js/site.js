(function() {
  window.app = {};

  window.app.header = {};

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
  var genreNames, stationImgPath;

  genreNames = ['top 40 & pop', 'country', 'hip hop', 'r & b', 'alternative', 'rock', 'news & talk', 'sports', 'religious', 'spanish', 'dance', 'oldies', 'classic rock', 'mix & variety', 'soft rock', 'jazz', 'classical', 'personalities', 'comedy', 'international', 'college radio', 'reggae & island'];

  window.genresData = [];

  stationImgPath = 'assets/img/stations/';

  _.each(genreNames, function(el, i) {
    var formattedName;
    formattedName = el.replace(/[^\w\s]/gi, '').replace(/\s\s/g, ' ').replace(/\s/g, '-');
    return window.genresData.push({
      name: el,
      formattedName: formattedName,
      src: 'assets/img/genres/' + formattedName + '.jpg'
    });
  });

  window.stationsData = [
    {
      name: "z100",
      tagline: "New York's Hit Music Station",
      imgSrc: stationImgPath + "z100.png",
      genres: ["top-40-pop", "country", "news-talk"]
    }, {
      name: "106.7 Lite FM",
      tagline: "New York's Christmas Station",
      imgSrc: stationImgPath + "106.7-lite-fm.png",
      genres: ["r-b", "alternative", "rock"]
    }
  ];

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.header.Hamburger = (function(_super) {
    __extends(Hamburger, _super);

    function Hamburger() {
      _ref = Hamburger.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Hamburger.prototype.tagName = 'a';

    Hamburger.prototype.className = 'g-app-hamburger';

    Hamburger.prototype.initialize = function() {};

    Hamburger.prototype.render = function() {
      return this.el;
    };

    Hamburger.prototype.events = {
      'click': 'slideDrawer'
    };

    Hamburger.prototype.slideDrawer = function() {
      return $('.p:visible').toggleClass('drawer-open');
    };

    return Hamburger;

  })(Backbone.View);

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

    Genres.prototype.url = 'http://apistage.ccrd.clearchannel.com/api/v2/content/genre?offset=0&limit=10&sortBy=sort&showHidden=false';

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
      this.model.set('checked', !this.model.get('checked'));
      return this.$el.toggleClass('checked');
    };

    return GenreTile;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref, _ref1, _ref2,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.Station = (function(_super) {
    __extends(Station, _super);

    function Station() {
      _ref = Station.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Station;

  })(Backbone.Model);

  app.Stations = (function(_super) {
    __extends(Stations, _super);

    function Stations() {
      _ref1 = Stations.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Stations.prototype.model = app.Station;

    return Stations;

  })(Backbone.Collection);

  app.StationRow = (function(_super) {
    __extends(StationRow, _super);

    function StationRow() {
      _ref2 = StationRow.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    StationRow.prototype.tagName = 'li';

    StationRow.prototype["class"] = 'station-row';

    StationRow.prototype.initialize = function() {};

    StationRow.prototype.template = Handlebars.templates.stationRow;

    StationRow.prototype.render = function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this.el;
    };

    return StationRow;

  })(Backbone.View);

}).call(this);

(function() {
  app.Router = (function() {
    function Router() {
      var hamburger, self;
      self = this;
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
      _.each(this.pages, function(page) {
        return $('.route-' + page).on('click', function() {
          return self.switchPages(page);
        });
      });
      hamburger = new app.header.Hamburger;
      $('.g-app-capital').prepend(hamburger.render());
    }

    Router.prototype.routes = {
      '*genres': 'genres'
    };

    Router.prototype.pages = ['genres', 'stations'];

    Router.prototype.switchPages = function(newPage) {
      _.each(this.pages, function(page) {
        var $page;
        $page = $('#p-' + page);
        if ($page.is(':visible')) {
          return $page.fadeOut();
        }
      });
      $('#p-' + newPage).fadeIn();
      return $('body').removeClass().addClass(newPage);
    };

    Router.prototype.genres = function() {
      var self;
      self = this;
      $('#go-to-stations').on('click', function() {
        var selectedGenres;
        selectedGenres = [];
        app.genres.each(function(model) {
          if (model.get('checked') === true) {
            return selectedGenres.push(model);
          }
        });
        return self.stations(selectedGenres);
      });
      if (!app.genres) {
        app.genres = new app.Genres;
        return $.ajax({
          url: "http://apistage.ccrd.clearchannel.com/api/v2/content/genre?offset=0&limit=10&sortBy=sort&showHidden=false",
          type: "GET",
          dataType: 'json',
          success: function(genres) {
            app.genres.reset(genres.hits);
            return app.genres.each(function(model) {
              var genreTile;
              genreTile = new app.GenreTile({
                model: model
              });
              return $('#genres').append(genreTile.render());
            });
          }
        });
      }
    };

    Router.prototype.stations = function(selectedGenres) {
      var getUrl, selectedStationsData, sortedStationsData, stations, stationsurl;
      selectedStationsData = [];
      sortedStationsData = [];
      stationsurl = 'http://apistage.ccrd.clearchannel.com/api/v2/recs/genre?offset=0&limit=10&template=LRRM,CR,DL';
      getUrl = {
        live: function(id) {
          return 'http://apistage.ccrd.clearchannel.com/api/v2/content/liveStations/' + id;
        },
        custom: function(id) {
          return 'http://apistage.ccrd.clearchannel.com/api/v1/catalog/getArtistByArtistId?artistId=' + id + '&includeBio=true';
        }
      };
      _.each(selectedGenres, function(genre) {
        return stationsurl += '&genreId=' + genre.id;
      });
      $.ajax({
        url: stationsurl,
        type: "GET",
        dataType: 'json',
        success: function(stationsData) {
          var stations;
          _.each(stationsData.values, function(data) {
            var type;
            type = data.type === "LRRM" || data.type === "LN" || data.type === "LR" ? 'live' : 'custom';
            return $.ajax({
              url: getUrl[type](data.contentId),
              type: "GET",
              dataType: 'json',
              success: function(additionalData) {
                var stationType;
                stationType = type === 'live' ? 'hits' : 'artist';
                return data = _.extend(data, additionalData[stationType][0] !== void 0 ? additionalData[stationType][0] : additionalData[stationType]);
              }
            });
          });
          $('#m-station-rows').empty();
          stations = new app.Stations(stationsData.values);
          return stations.each(function(station) {
            var stationRow;
            stationRow = new app.StationRow({
              model: station
            });
            return $('#m-station-rows').append(stationRow.render());
          });
        }
      });
      stations = new app.Stations(sortedStationsData);
      $('#m-station-rows').empty();
      stations.each(function(model) {
        var stationRow;
        stationRow = new app.StationRow({
          model: model
        });
        return $('#m-station-rows').append(stationRow.render());
      });
      return this.switchPages('stations');
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
