# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static artist website for Cyjet, built with vanilla JavaScript and deployed via Cloudflare Pages. The site displays music releases with links to various streaming platforms.

## Architecture

- **Frontend**: Vanilla HTML/CSS/JavaScript with functional programming approach using Ramda.js
- **Data**: Release information stored in `releases.js` as a JavaScript array
- **Deployment**: Cloudflare Pages (configured via `wrangler.toml`)
- **Styling**: Custom CSS with Google Fonts (Unica One, IBM Plex Sans)

## Key Files

- `index.html` - Main page structure and layout
- `main.js` - Core application logic with Cyjet namespace and functional utilities
- `releases.js` - Static data containing all music releases with metadata and streaming links
- `style.css` - Visual styling and responsive design
- `wrangler.toml` - Cloudflare Pages deployment configuration
- `images/` - Album artwork and visual assets

## Development Commands

This project has no build system or package manager - it uses vanilla web technologies. To develop:

1. Serve files locally using any HTTP server (e.g., `python -m http.server` or VS Code Live Server)
2. Edit files directly - changes are immediately reflected
3. Deploy by committing to the repository (Cloudflare Pages handles automatic deployment)

## Code Patterns

- **Functional Programming**: Uses Ramda.js extensively with curried functions
- **Module Pattern**: Code organized in IIFE (Cyjet namespace) with public/private separation  
- **DOM Utilities**: Custom `createElement` and `appendTo` helper functions
- **Data-Driven Rendering**: Release display driven by `MyReleases` array data

## Data Structure

Each release in `releases.js` follows this schema:
- `artist`, `id`, `title` - Basic metadata
- `cover_image` - Path to album artwork
- `releaseDate`, `releaseText` - Date information
- `links` - Array of streaming platform links with `site` and `href`
- `trackList` - Array of track names

## Deployment

The site is configured for Cloudflare Pages deployment. The `wrangler.toml` specifies the entire directory as static assets. Changes pushed to the main branch are automatically deployed.