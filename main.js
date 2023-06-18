// main.js
// AndrewJ, created 2018-05-06
//-------------------

// Declare to prevent warnings when using these pre-defined prefixes
var R, ga;

//-------------------
// Utilities

// Make a chainable append
jQuery.fn.extend({
  append_: function (item) {
    this.append(item);
    return this;
  }
});

jQuery.fn.extend({
  reduce_: function (fn, list) {
    return R.reduce(fn, this, list);
  }
});

//-------------------
// Main namespace

const Cyjet = (() => {

  const Info = {
    title: "cyjet",
    author: "AndrewJ",
    version: "0.3",
    date: "2023-06-18",
    info: "Cyjet home",
    appendTitleTo: (tagName) => {
      $(tagName).append($(`<span class="title">cчjεt</span>`));
      return tagName;
    },
    appendVersionDateTo: (tagName) => {
      $(tagName).append($(`<span>Version: ${Info.version}, ${Info.date}.</span>`));
      return tagName;
    }
  };

  const renderLink = R.curry((target, link) => {
    return $(target).append_($(`<a class="link" href="${link.href}">${link.site}</a>`));
  });

  const renderRelease = R.curry((target, release) => {
    const rel = $(`<div class="release"></div>`)
          .append_($(`<img class="image" src="${release.cover_image}"/>`))
          .append_($(`<div class="release-info"></div>`)
                   .append_($(`<div class="title">${release.title }</div>`))
                   .append_($(`<div class="releaseText">${ release.id } | ${ release.releaseText }</div>`))
                   .reduce_(renderLink, release.links));

    return $(target).append_(rel);
  });

  // -------------------
  // Initialise the page with content
  const initialise = () => {
    Info.appendTitleTo(".header");
    Info.appendVersionDateTo("#attribution");
    R.reduce(renderRelease, "#releases", MyReleases);
    console.log("Initialised.");
  };

  // Public data
  return Object.freeze({
    initialise: initialise
  });

})();

// The End
