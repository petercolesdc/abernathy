# Abernathy.

![Excellent](https://media.giphy.com/media/l2SqblV4jfjdExmr6/giphy.gif "Delores")

Abernathy is a place to start product and web builds. Built with atomic component based systems in mind, she renders to standard html templates, so you can build in a modular fashion - then render the old fashioned way.

Abernathy uses the [Nunjucks](https://mozilla.github.io/nunjucks/) templating language to harness the power of includes, macros and loops to aid in building dynamic design systems.

## Install (Docker)
Grab docker desktop, install and start on your machine. Then:

1. Change directory into this repo in your CLI.
2. `make images` - You only need to do this once
3. `make design.watch` to run in watch mode
4. `make design.stop` to stop watch mode
5. `make design.build` to build the project to the public folder on your computer (not in the container)
6. `make design.icons` generate icons

### Optional
If you want to keep a tidy house, then I'd recommend the following:

1. Open `Makefile` and update `IMAGE?=` to the name of your project
2. Update this ReadMe file


## Making icons
Place all icons in the `assets/icons/source` folder.
If you want to use CSS to color them, remove any `fill=` tags from the SVG code.

Reference in your markup as follows (where icon is exampleicon)

```
<svg class="icon_exampleicon_svg">
  <use xlink:href="/assets/icons/renders/sprite.svg#exampleicon"></use>
</svg>
```

## Colors
Updating colors is pretty easy, but requires a few things to be changed in order for the system and the color palette in `/guide` to display correctly.

1. Rename and/or re-assign colors in the `absracts/_colors.scss` file.
2. Assign colors to the map function in `absracts/_colors.scss`. These should match the color variables. This function builds swatches, and is generally useful for making loops to assign color.
3. Open `/guide/color.html` and update the model with the color references.

Watch the terminal for errors

## Deployment (basic)
When you run `make design.build` Abernathy bundles the whole build into the local `public` folder. You can then deploy this folder anywhere you like as a self-contained flat-file system (I like to use surge.sh).

## Component macro sheets
You can keep all your macros on one html page, and import only the ones you need into other pages.

For components, this works a treat. Here's what I like to do:

1. Create a folder in `/components` and name it as per that component type
2. Create an `index.html` page, that acts as an Index for the component type
3. Create one or more `.html` pages for the component and keep all the macros for that component in one place
4. Import the macro sheet using the `{% import 'components/thing/thing.html' as thing %}`method
5. Reference the specific macro using the `{{ thing.thingName('setting', 'setting') }}`

## Use the mixins and functions (or don't. Whatever!)
The `mixins.scss` and `functions.scss` contains goodies that you might find useful. It's probably easier to pick through them, but here's what they do (and how to use them).

It's worth noting that many mixins use settings defined in `/abstracts/_measurements.scss`, so be sure to check that out also.

### Spacing
`@mixin baseline(number, 'type')` allows you to space items taking into account a consistent baseline. Use like this `@include baseline(3, 'margin-bottom')`. Be sure to set `$baseline` in `measurements.scss`. Can take `margin-bottom` `margin-top` `padding-top` or `padding-bottom` arguments.

### Typography
`@mixin font-size(size, 'loosen/tighten', adjust_amount)` allows you to set the font-size in rem (but declare in px / pt value), and optionally tighten or loosen leading, based on a set baseline unit found in `measurements.scss`. E.g `@include font-size($yourTypeSizeVar, 'tighten', 1);`

### Responsive
Convenient syntax mixins for responsive breakpoints. I won't outline each one as they all follow a similar syntax. There are options for min and max width, min and max heights and a combination of both.

`@mixin respond-to($media-min) { @content }`. Sets the breakpoint syntax based on browser width. I usually define these in `viewports.scss`. Use like this: `@include respond-to($vpA) { Your styles here };`

### Helpful stuff
- `@function rem($pixels)` is a function that takes a unit-less pixel value and converts it into REM values.
- `@mixin link-active-styles`. Combines `:focus, :active and :hover` states into one easy place. Use like this: `@include link-active-styles { Your stuff };`
- `@mixin a11yhide`. Hide text in an accessible fashion. Usage: `@include a11yhide;`.
- `@mixin ratio();`. Little mixin for ratio calculations. Great for responsive video. Usage `@include ratio(16 9)`
- `@mixin pie-clearfix`. Clearfix the old-skool way. Usage. `@include pie-clearfix;`
- `@mixin sharp-text`. Make text sharper. Sometimes it looks better, sometimes it looks pants. Use with discretion. `@include sharp-text;`

### Animation
There's some Animation helpers should you need them. See comments in the file for more details

## Known bugs & limitations
- Occasionally, when adding new images or re-saving images, someone will freak out and ruin the party. To resolve, do a `make design.stop` then `make design.watch` to get back to the action.
- Right now, I have no flippin' idea how to use an `include` and a `for loop` together. This only appears to work if the data and the loop exist in the same page.
- The `extends` method for templating is powerful, but requires planning to get to most out of it.
- The included `grid` mixins aren't comprehensive.
