## Description

This project is a clone of the Momentum Chrome Extension. This project is not an extension, just a template with similar functionality.
Main goals were:

- Display time (12 and 24 hour format)
- Greet user by his/her name
- Display inspirational quote of the day
- Location and hourly updated weather
- Different background image depending on part of the day
- Focus and to-do list

Technologies and tools: Vue 2.6, Webpack

## Technologies and tools

Vue 2.6

Vue-cli 4.3.0

Vue-resource 1.5

CSS

HTML

## Used APIs

Weather - [Weatherbit API](https://www.weatherbit.io/api)

Quotes - [Typefit Quote API](https://type.fit/api/quote)

Images - [Pexels API](https://www.pexels.com/api)

## Project structure

```
/public - fonts, global css and index.html
```

```
/src/components - main components, template sections
```

```
/src/img - fallback default image
```

```
/src/mixins - mixins for logic sharing
```

```
/src/components/layer - smaller components for specific feature or template
```

```
/src/components/shared - reusable and configurable inputs, fabs and checkboxes
```

## Setup

```
npm install
npm run serve
```
