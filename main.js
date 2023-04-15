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
    version: "0.2",
    date: "2023-04-14",
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
      trackList: ["Angel Deep", "Occultation", "Distant Touch", "Metal City Dub"]
    },
    {
      artist: "Cyjet",
      title: "cargo cult",
      cover_image: "images/ep02 cargo-cult 1500x1500.jpg",
      releaseDate: "2022-11",
      releaseText: "november 2022",
      links: [
        { site: "All sites", href: "https://artists.landr.com/cargo-cult" },
        { site: "Bandcamp", href: "https://bandcamp.com/cyjet/cargo-cult" },
        { site: "Spotify", href: "https://open.spotify.com/album/65f26Ij2tWTVeGfBn67zQi" },
        { site: "YouTube Music", href: "https://music.youtube.com/playlist?list=OLAK5uy_m8w3wWYdBSNnLPh_wKI_Ziu0D1IvjKnPM" },
        { site: "Apple Music", href: "https://geo.music.apple.com/album/cargo-cult-ep/1658040968" },
        { site: "Amazon Music", href: "https://music.amazon.com/albums/B0BP2RV7LG?ref=dm_ff_linkfire" },
      ],
      trackList: ["Gamboge", "Londeth", "Shades of January", "Do You Love?"]
    },
    {
      artist: "Cyjet",
      title: "scan lines",
      cover_image: "images/ep03 scan-lines 1024x1024.jpg",
      releaseDate: "2023-03",
      releaseText: "march 2023",
      links: [
        { site: "All sites", href: "https://artists.landr.com/cyjet-scan-lines" },
        { site: "Bandcamp", href: "https://bandcamp.com/cyjet/scan-lines" },
        { site: "Spotify", href: "https://open.spotify.com/album/6mW2yAqITqCMA8Oo60gIbk" },
        { site: "YouTube Music", href: "https://music.youtube.com/playlist?list=OLAK5uy_knYV1jeY4jkXNBiQ01en3p9kmGVn5Arro" },
        { site: "Apple Music", href: "https://geo.music.apple.com/album/scan-lines-ep/1675167080" },
        { site: "Amazon Music", href: "https://music.amazon.com/albums/B0BX8ZGDDH?ref=dm_ff_linkfire" },
      ],
      trackList: ["Servolex", "Cube", "Coma Trip", "Snow at Easter"]
    },
    {
      artist: "Cyjet",
      title: "neon ride",
      cover_image: "images/ep04 neon-ride 1024x1024.jpg",
      releaseDate: "2023-04",
      releaseText: "april 2023",
      links: [
        { site: "All sites", href: "https://artists.landr.com/cyjet-neon-ride" },
        { site: "Bandcamp", href: "https://bandcamp.com/cyjet/neon-ride" },
        { site: "Spotify", href: "https://open.spotify.com/album/5viirWr8G3z1tRK8bmpoqh" },
        { site: "YouTube Music", href: "https://music.youtube.com/playlist?list=OLAK5uy_mNVd3VT72flKorj0J_xcVKIJEoWlx6w1c" },
        { site: "Apple Music", href: "" },
        { site: "Amazon Music", href: "https://music.amazon.com/albums/B0C2D5R8GM?ref=dm_ff_linkfire" },
      ],
      trackList: ["No-one Else Around", "Sexkontakt", "Fluorescence", "As Colours Edge"]
    }
  ];

  const renderLink = R.curry((target, link) => {
    return $(target).append_($(`<a class="link" href="${link.href}">${link.site}</a>`));
  });

  const renderRelease = R.curry((target, release) => {
    const rel = $(`<div class="release"></div>`)
          .append_($(`<img class="image" src="${release.cover_image}"/>`))
          .append_($(`<div class="release-info"></div>`)
                   .append_($(`<div class="title">${ release.title }</div>`))
                   .append_($(`<div class="releaseText">${ release.releaseText }</div>`))
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
