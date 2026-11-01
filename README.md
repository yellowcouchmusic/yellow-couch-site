# Yellow Couch Music — Website Starter

A responsive, static, GitHub Pages-ready **prototype** for a new yellowcouchmusic.com. No build step, package manager, or framework needed. Every route works on GitHub Pages, including the journal's `post.html?slug=...` story view.

## What is included

- Featured *Tidings In The Rough* album spotlight (always visible on the homepage)
- Journal / social-style feed with Live, Music, and Stories filters
- Individual reader-friendly story views with back links
- Upcoming date state and past show archive
- Projects: AJILE, SENSATION, and the Yellow Couch Music podcast
- About, store, press bio, newsletter holding area, and links to actual YCM Bandcamp/Instagram
- Responsive mobile navigation, accessible labels, reduced-motion handling, and social metadata

## Publish as a GitHub Pages preview

1. Create a **new public repository** in GitHub, for example `yellow-couch-site`.
2. Upload all the files and the `assets` folder at the repository root.
3. Go to **Settings → Pages**. Under Build and deployment, select **Deploy from a branch**, `main`, and `/ (root)`. Save.
4. GitHub provides a staging link such as `https://YOUR-USERNAME.github.io/yellow-couch-site/`. Check it on a phone and computer.
5. Keep your current Squarespace site live until the new site, mailing list, and commerce links are all ready. **Don't change DNS yet.** When ready, add your custom domain under Pages settings and update DNS per GitHub's current instructions. Add a `CNAME` file containing `yellowcouchmusic.com` if appropriate for the deployment.

## Add official album art and images

- Add the real album cover file at **`assets/tidings-cover.jpg`**. Replace the CSS fallback art used for the prototype.
- For each journal story, put a JPG or WebP photo in `/assets/`, and set `image: 'assets/my-photo.jpg'` in `content.js`.
- If the actual *Tidings* art makes a good wallpaper, a heavily muted background crop can be added to `.album-spotlight` in `styles.css` (not full-page wallpaper, which would undermine readability).

## Post a new journal entry

1. Open **`content.js`** and copy one object in `posts`.
2. Paste it at the **top** of the array (newest first), then edit `slug`, `date`, `category` (`live`, `music`, `stories`), `title`, `excerpt`, `image`, `body`, and the optional external link.
3. Commit to GitHub. The homepage updates automatically. Each post is readable at `post.html?slug=the-slug-you-chose`.
4. Cross-post the same content to Instagram and link people back to the website. **Instagram posts do not import automatically** in this version.

For a larger journal with SEO-friendly URLs, individual social previews, image galleries, and RSS, migrate this design to GitHub Pages/Jekyll or another static site generator. This starter prioritizes an editable, working design before adding a heavier publishing workflow.

## Details still to wire up

- **Newsletter:** Replace the Bandcamp fallback in the newsletter section with the actual provider's embedded subscribe form (Mailchimp, etc.). No addresses are collected by this starter.
- **Store:** Currently directs to Bandcamp. Physical merch checkout currently handled by Squarespace must be migrated or externally linked before the Squarespace site is retired.
- **Videos:** The videos area has linked editorial preview tiles, not playable videos yet. Replace them with YouTube embeds and actual video thumbnails when URLs and files are available.
- **Press:** Upload approved downloadable press photos, EPK PDF, and a booking contact before launch.
- **Content:** Stories are editorial sample summaries based on YCM events, **not verbatim published social posts**. Confirm wording, album-release dates and collaborator credits before going live.
- **Analytics:** Add privacy-conscious analytics once the new site has a public domain.
- **Social sharing:** For best post-specific previews and organic search, the next build should produce separate HTML pages rather than query-parameter posts.
- **Fonts:** Google Fonts are used for an editorial look. They require an internet connection; the site has built-in font fallbacks.

## File guide

| File | Function |
|---|---|
| `index.html` | Homepage and page sections |
| `post.html` | Journal story view |
| `styles.css` | Colors, layout, typography, responsive styling |
| `content.js` | All journal content and past shows |
| `app.js` | Filters, story pages, mobile navigation |
| `assets/` | Actual cover art, event photos, video thumbnails |
