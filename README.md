# Abernathy.

A place to start. Made with Gulp and SCSS.

![Excellent](https://media.giphy.com/media/KdILx9YU2IcaA/giphy.gif "Shalom")

## Docker

1. `make images`
2. `make design.watch` to run in watch mode
3. `make design.stop` to stop watch mode
4. `make design.build` to just build

## Install (the old way)

1. Install NPM
2. Change directory into the root folder for Abernathy
3. `npm install`
4. `gulp serve` to get going
5. Ditch the demofiles folder and `demo.scss` file in `scss/layout`

### Icons
`gulp build:icons` builds the icon sprite from SVG icons placed in the `assets/icons/source` folder.

Reference in your markup as follows (where icon is exampleicon)

```
<svg class="icon_exampleicon_svg">
  <use xlink:href="/assets/icons/renders/sprite.svg#exampleicon"></use>
</svg>
```
