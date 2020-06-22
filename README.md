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

It's worth noting that many mixins use settings defined in `/abstracts/measurements.scss`, so be sure to check that out also.

### Typography
- `@function rem($pixels)` is a function that takes a pixel value and converts it into REM values. Use it like this: `font-size: rem(16);` or better yet `font-size: rem($yourTypeSizeVar);`
- `@mixin leading_adjust()` allows you to adjust the line-height of some text based on the `$lineheightBase` value set in `measurements.scss` for consistent spacing. Use like this: `@include leading_adjust(4);`
- `@mixin baseline()` allows you to space items taking into account a consistent baseline. Use like this `@include baseline(3, 'margin-bottom')`. Be sure to set `$gridBaseline` in `measurements.scss`.

### Grid
- `@mixin gridCalc()`. Set's down a grid based on `$gridCols` defined in `measurements.scss`. You can set it's value to `true` if you want to use the defined `$gridGap`, or leave undefined for no gap at all. `@include gridCalc('true')` This mixin is only really useful when used with `@mixin gridCol` and `@mixin gridRow`.
- `@mixin gridCol()` allows you to set the start column and span number for a grid item. Use like this: `@include gridCalc(1, 3)` where the first number is the column (1) and the second number is how many columns to span (3).
- `@mixin gridRow()` allows you to define which row an item appears on. Use like this `@include gridRow(2)` to place an item on the second row.

### Responsive
Convenient syntax mixins for responsive breakpoints. I won't outline each one as they all follow a similar syntax. There are options for min and max width, min and max heights and a combination of both.
- `@mixin respond-to($media-min) { @content }`. Sets the breakpoint syntax based on browser width. I usually define these in `viewports.scss`. Use like this: `@include respond-to($vpA) { Your styles here };`

### Helpful shit
- `@mixin link-active-styles`. Combines `:focus, :active and :hover` states into one easy place. Use like this: `@include link-active-styles { Your stuff };`
- `@mixin a11yhide`. Hide things in an accessible fashion. Usage: `@include a11yhide;`.
- `@mixin ratio();`. Little mixin for ratio calculations. Great for responsive video. Usage `@include ratio(16 9)`
- `@mixin pie-clearfix`. Clearfix the old-skool way. Usage. `@include pie-clearfix;`
- `@mixin sharp-text`. Make text sharper. Sometimes it looks better, sometimes it looks pants. Use with discretion. `@include sharp-text;`
- `@mixin fauxUnderline()`. Create a fake underline style. `@include fauxUnderline(red)`;

### Animation
There's some Animation helpers should you need them. See comments in the file for more details

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
