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
    title: ":: cyjet",
    subtitle: "[midtempo electronica]",
    author: "AndrewJ",
    version: "0.7",
    date: "2025-12-28",
    info: "Cyjet home",
    appendTitleTo: (selector) => {
      appendTo(selector, `<span class="page-title">${Info.title}</span>`);
      appendTo(selector, `<span class="page-subtitle">${Info.subtitle}</span>`);
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
                <img class="modal-image" src="${release.cover_image}"/>
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

  // Handle click/touch interactions for modal
  const setupClickHandlers = () => {
    document.addEventListener('click', (e) => {
      const release = e.target.closest('.release');
      const image = e.target.closest('.image');

      if (image && release) {
        // Clicking image: close others, toggle this modal
        document.querySelectorAll('.release.modal-active').forEach(el => {
          if (el !== release) el.classList.remove('modal-active');
        });
        release.classList.toggle('modal-active');
        e.preventDefault();
      } else if (release && release.classList.contains('modal-active')) {
        // Clicking inside open modal (release-info): close it
        release.classList.remove('modal-active');
      } else {
        // Clicking outside: close all modals
        document.querySelectorAll('.release.modal-active').forEach(el => {
          el.classList.remove('modal-active');
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
    setupClickHandlers();
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
