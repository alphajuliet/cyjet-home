// main.js
// AndrewJ, created 2018-05-06
//-------------------

// Import specific Ramda functions
import { curry, join, reduce } from 'https://cdn.skypack.dev/ramda@0.31.3';

// Utilities

const createElement = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
};

const appendTo = (parent, child) => {
  if (typeof parent === 'string') {
    parent = document.querySelector(parent);
  }
  if (typeof child === 'string') {
    child = createElement(child);
  }
  parent.appendChild(child);
  return parent;
};

//-------------------
// Main namespace

const Cyjet = (() => {
  const Info = {
    title: "cyjet",
    author: "AndrewJ",
    version: "0.6",
    date: "2025-08-23",
    info: "Cyjet home",
    appendTitleTo: (selector) => {
      appendTo(selector, `<span class="page-title">cyjet 𖡄</span>`);
      return selector;
    },
    appendVersionDateTo: (selector) => {
      appendTo(selector, `<span>Version: ${Info.version}, ${Info.date}.</span>`);
      return selector;
    }
  };

  const renderLink = curry((target, link) => {
    appendTo(target, `<a class="link" href="${link.href}">${link.site}</a>`);
    return target;
  });

  const renderRelease = curry((target, release) => {
    const releaseElement = createElement(`
            <div class="release">
              <img class="image" src="${release.cover_image}"/>
              <div class="release-info">
                <div class="title">${release.title}</div>
                <div class="releaseText">${release.id} | ${release.releaseText}</div>
                <div class="release-detail">
                  <div class="tracks">📂 ${join(" | ", release.trackList)}</div>
                  <div class="links">🎧 </div>
                </div>
              </div>
            </div>
        `);

    // Add links
    const linksContainer = releaseElement.querySelector('.links');
    release.links.forEach(link => renderLink(linksContainer, link));

    appendTo(target, releaseElement);
    return target;
  });

  // Handle touch interactions for mobile devices
  const setupTouchHandlers = () => {
    document.addEventListener('touchstart', (e) => {
      const releaseInfo = e.target.closest('.release-info');
      if (releaseInfo) {
        // Remove active state from all other release-info elements
        document.querySelectorAll('.release-info.touch-active').forEach(el => {
          if (el !== releaseInfo) el.classList.remove('touch-active');
        });
        // Toggle active state on touched release-info
        releaseInfo.classList.toggle('touch-active');
        e.preventDefault();
      } else {
        // Touched outside any release-info, remove all active states
        document.querySelectorAll('.release-info.touch-active').forEach(el => {
          el.classList.remove('touch-active');
        });
      }
    });
  };

  // -------------------
  // Initialise the page with content
  const initialise = () => {
    Info.appendTitleTo(".header");
    Info.appendVersionDateTo("#attribution");
    reduce(renderRelease, "#releases", MyReleases);
    setupTouchHandlers();
    console.log("Initialised.");
  };

  // Public data
  return Object.freeze({
    initialise: initialise
  });
})();

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  Cyjet.initialise();
});

// The End
