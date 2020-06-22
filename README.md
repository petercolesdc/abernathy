# Abernathy.

![Excellent](https://media.giphy.com/media/l2SqblV4jfjdExmr6/giphy.gif "Delores")

Abernathy is a place to start product and web builds. Built with atomic component based systems in mind, she renders to standard html templates, so you can build in a modular fashion - then render the old fashioned way.

Abernathy uses the [Nunjucks](https://mozilla.github.io/nunjucks/) templating language to harness the power of includes, macros and loops to aim in building dynamic design systems.

## Install (Docker)
Grab docker desktop, install and start on your machine. Then:

1. Change directory into this repo in your CLI.
2. `make images` - You only need to do this once
3. `make design.watch` to run in watch mode
4. `make design.stop` to stop watch mode
5. `make design.build` to build the project to deploy from public folder
6. `make design.icons` generate icons

### Optional
If you want to keep a tidy house, then I'd recommend the following:

1. Open `Makefile` and update `IMAGE?=` to the name of your project
2. Update this ReadMe file


### Icons
Place all icons in the `assets/icons/source` folder.
If you want to use CSS to color them, remove any `fill=` tags from the SVG code.

Reference in your markup as follows (where icon is exampleicon)

```
<svg class="icon_exampleicon_svg">
  <use xlink:href="/assets/icons/renders/sprite.svg#exampleicon"></use>
</svg>
```

## Use the mixins (or don't. Whatever!)
The `mixins.scss` contains goodies that you might find useful. It's probably easier to pick through them, but here's what they do (and how to use them).

- `@function rem($pixels)` is a function that takes a pixel value and converts it into REM values. Use it like this: `font-size: rem(16);` or better yet `font-size: rem($yourTypeSizeVar);`
- `@mixin leading_adjust($gapAdjust)` allows you to adjust the line-height of some text based on the `$lineheightBase` value set in `measurements.scss` for consistent spacing. Use like this: `@include leading_adjust(4);`
- `@mixin baseline($baselineMult, $type)` allows you to space items taking into account a consistent baseline. Use like this `@include baseline(3, 'margin-bottom')`. Be sure to set `$gridBaseline` in `measurements.scss`.

## Component macro sheets
So, I didn't know this was a thing, but what a thing it is. You can keep all your macros on one html page, and import only the ones you need into other pages. Love it!

For components, this works a treat. Here's what I like to do:

1. Create a folder in `/components` and name it as per that component type
2. Create an `index.html` page, that acts as an Index for the component type
3. Create one or more `.html` pages for the component and keep all the macros for that component in one place
4. Import the macro sheet using the `{% import 'components/thing/thing.html' as thing %}`method
5. Reference the specific macro using the `{{ thing.thingName('setting', 'setting') }}`


## Known bugs & limitations
- Occasionally, when adding new images or re-saving images, someone will freak out and ruin the party. To resolve, do a `make design.stop` then `make design.watch` to get back to the action.
- Right now, I have no flippin' idea how to use an `include` and a `for loop` together. This only appears to work if the data and the loop exist in the same page.
- The `extends` method for templating is powerful, but requires planning to get to most out of it.
- The included `grid` mixins aren't comprehensive.
