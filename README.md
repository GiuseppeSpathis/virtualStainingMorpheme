# Virtual Staining Blind Test — GitHub Pages

This folder is a standalone static website. No installation or build step is required.

## Add your images

1. Put your PAS image pool in `images/pas/` and name the 24 supplied slots `pas-1.jpg` to `pas-24.jpg`.
2. Put your IHC image pool in `images/ihc/` and name the 24 supplied slots `ihc-1.jpg` to `ihc-24.jpg`.
3. Open `script.js` and update each `answer` to either `real` or `generated`.

The site randomly selects 8 images from each 24-image pool. After the score is revealed, **Play another random round** draws a new set of 8 images. You can increase `length:24` in `script.js` if your pool contains more images.

## Publish on GitHub Pages

Upload everything inside this folder to the root of your GitHub repository. In GitHub, open **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/ (root)`.

You can test locally by opening `index.html` in a browser.
