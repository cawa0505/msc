var React = require('react');
var $     = require('jquery');

var options = [
// {
//   title: 'Playlist',
//   faIcon: 'fa-list',
//   onClick: function () {
//     console.log('clicked playlist');
//     window.location = '/playlist';
//   },
// },
{
  title: 'Settings',
  faIcon: 'fa-cog',
  onClick: function () {
    $('.settings').addClass('active');
  },
},
];

var Menu = React.createClass({

  _show: function (menuElem) {
    var self = this;
    menuElem.show().removeClass('_hide').addClass('_show');
    // Clicking outside the menu closes it
    $('.flex-container').on('click', function (event) {
      //event.stopPropagation();
      menuElem.hide();
    });
  },

  _hide: function (menuElem) {
    menuElem.hide().removeClass('_show').addClass('_hide');
    menuElem.off('click');
    $('.flex-container').off('click');
  },

  _onClick: function (event) {
    var menu = $($(event.currentTarget).siblings()[0]);
    if (menu.hasClass('_show')) {
      this._hide(menu);
    } else {
      this._show(menu);
    }
  },

  render: function () {
    var opts = [];
    for (var i = 0; i < options.length; ++i) {
      var className = 'fa ' + options[i].faIcon;
      opts.push(
        <li onClick={options[i].onClick.bind(this)} key={i}>
					<i className={className}></i> {options[i].title}
				</li>
      );
    }

    return (
      <div>
				<ul className="menu">
					{opts}
				</ul>
				<i className="fa fa-bars"
         id="menu-btn"
         onClick={this._onClick}></i>
			</div>
    );
  },

});

module.exports = Menu;
