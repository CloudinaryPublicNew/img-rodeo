# img-rodeo

An image placeholder service like [placehold.it](https://placehold.it), [placekitten](https://placekitten.com), and [placebeyonce](https://placebeyonce.com) – powered by Cloudinary.

## todo

- [ ] hook this up to the https://img.rodeo domain that I just purchased
- [ ] some form of caching on folder lists?
- [ ] front-end examples
- [ ] document setup on webtask

## examples

Basic usage:

![https://evangelism-eric.cloudinary.auth0-extend.com/imgrodeo/300x200]()
*/300x200*

By default, it randomly selects one out of a pre-defined pallete of 18 colors. Can also use a custom color:

![https://evangelism-eric.cloudinary.auth0-extend.com/imgrodeo/300x200?colors=tomato]()
*/300x200?colors=tomato*

Or a custom palette:

![https://evangelism-eric.cloudinary.auth0-extend.com/imgrodeo/300x200?colors=tomato,bisque,steelblue]()
*(/300x200?colors=tomato,bisque,steelblue*

The *really* cool thing though, is that I can hook it up to folders in my Cloudinary account, which it'll pull random images out of:

![https://evangelism-eric.cloudinary.auth0-extend.com/imgrodeo/300x200?folder=israel-sept-2016]()
*/300x200?folder=israel-sept-2016*

So instead of choosing between placebeyonce and placekitten, I can place whatever I can put into Cloudinary (placewizard, for example).

Cherry on top, you can transform these URLs like any Cloudinary URL:

![https://evangelism-eric.cloudinary.auth0-extend.com/imgrodeo/e_art:fes,r_max/200x200?folder=israel-sept-2016]()
*/e_art:fes,r_max/200x200?folder=israel-sept-2016*

## installation

It runs on Webtask...

