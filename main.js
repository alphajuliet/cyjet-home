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

//-------------------
// Main namespace

const Cyjet = (() => {

  const Info = {
    title: "cyjet",
    author: "AndrewJ",
    version: "0.1",
    date: "2023-03-25",
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

  const MyReleases = [
    {
      artist: "Cyjet",
      title: "dust craft",
      cover_image: "images/ep01 dust-craft 1500x1500.jpg",
      releaseDate: "2022-10",
      releaseText: "october 2022",
      links: [
        { site: "All sites", href: "https://artists.landr.com/cyjet-dust-craft" },
        { site: "Bandcamp", href: "https://cyjet.bandcamp.com/album/dust-craft" },
        { site: "Spotify", href: "https://open.spotify.com/album/2zYz71mHvjHZe3SsUcf1Dr" },
        { site: "YouTube Music", href: "https://music.youtube.com/playlist?list=OLAK5uy_mSsPea67U7Aeh7C7olJ_hqjp7dJJyjIw4" },
        { site: "Apple Music", href: "https://geo.music.apple.com/album/dust-craft-ep/1653157543" },
        { site: "Amazon Music", href: "https://music.amazon.com/albums/B0BLHY5LPQ?ref=dm_ff_linkfire" },
      ],
      trackList: []
    },
    {
      artist: "Cyjet",
      title: "cargo cult",
      cover_image: "images/ep02 cargo-cult 1500x1500.jpg",
      releaseDate: "2022-11",
      releaseText: "november 2022",
      links: [
        { site: "All sites", href: "https://artists.landr.com/cargo-cult" },
        { site: "Bandcamp", href: "http://bandcamp.com/cyjet/cargo-cult" },
        { site: "Spotify", href: "https://open.spotify.com/album/65f26Ij2tWTVeGfBn67zQi" },
        { site: "YouTube Music", href: "https://music.youtube.com/playlist?list=OLAK5uy_m8w3wWYdBSNnLPh_wKI_Ziu0D1IvjKnPM" },
        { site: "Apple Music", href: "https://geo.music.apple.com/album/cargo-cult-ep/1658040968" },
        { site: "Amazon Music", href: "https://music.amazon.com/albums/B0BP2RV7LG?ref=dm_ff_linkfire" },
      ],
      trackList: []
    },
    {
      artist: "Cyjet",
      title: "scan lines",
      cover_image: "images/ep03 scan-lines 1024x1024.jpg",
      releaseDate: "2023-03",
      releaseText: "march 2023",
      links: [
        { site: "All sites", href: "https://artists.landr.com/cyjet-scan-lines" },
        { site: "Bandcamp", href: "http://bandcamp.com/cyjet/scan-lines" },
        { site: "Spotify", href: "https://open.spotify.com/album/6mW2yAqITqCMA8Oo60gIbk" },
        { site: "YouTube Music", href: "https://music.youtube.com/playlist?list=OLAK5uy_knYV1jeY4jkXNBiQ01en3p9kmGVn5Arro" },
        { site: "Apple Music", href: "https://geo.music.apple.com/album/scan-lines-ep/1675167080" },
        { site: "Amazon Music", href: "https://music.amazon.com/albums/B0BX8ZGDDH?ref=dm_ff_linkfire" },
      ],
      trackList: []
    }
  ];

  // ====================================================
  // Rendering functions

  const renderLink = R.curry((target, link) => {
    return $(target).append_($(`<a class="link" href="${link.href}">${link.site}</a>`));
  });

  const renderLinks = R.curry((target, release) => {
    return R.reduce(renderLink, target, release.links);
  });

  const renderRelease = R.curry((target, release) => {
    const container2 = $(`<div class="release-info"></div>`);
    const title = $(`<div class="title">${ release.title }</div>`);
    const releaseText = $(`<div>${ release.releaseText }</div>`);
    const info = $(container2).append_(title)
                              .append_(releaseText);
    const info2 = renderLinks(info, release);

    const container1 = $(`<div class="release"></div>`);
    const image = $(`<img class="image" src="${release.cover_image}"/>`)

    const rel = $(container1).append_(image)
                             .append_(info2);
    return $(target).append_(rel);
  });

  // -------------------
  // Render all public tracks by a nominated key. Also a reducing function.
  // renderByPropTo :: jQuery -> Object -> jQuery

  const renderReleasesTo = R.curry((target, corpus) => {
    const container1 = $(`<div class="releases"></div>`);
    return R.reduce(renderRelease, target, corpus);
  });

  // -------------------
  // Initialise the page with content

  const initialise = () => {
    Info.appendTitleTo(".header");
    Info.appendVersionDateTo("#attribution");
    renderReleasesTo("#releases", MyReleases);
    console.log("Initialised.");
  };

  // Public data
  return Object.freeze({
    initialise: initialise
  });

})();

// The End
