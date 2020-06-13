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


### Icons
Place all icons in the `assets/icons/source` folder.
If you want to use CSS to color them, remove any `fill=` tags from the SVG code.

Reference in your markup as follows (where icon is exampleicon)

```
<svg class="icon_exampleicon_svg">
  <use xlink:href="/assets/icons/renders/sprite.svg#exampleicon"></use>
</svg>
```
