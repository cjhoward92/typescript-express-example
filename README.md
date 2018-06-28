# TypeScript Express Example Server

This is a little project to show how you could write a small express server with TypeScript! It isn't perfect, but it handles a synchronous route, an asynchronous route that calls to MongoDB through Mongoose, and error handling. There are also some fancy decorators to show off their power as well.

## Design principles

This isn't perfect, by any means. I need a little more time to refine. But the idea is I am following a _mostly_ functional paradigm using ideas that Mark Seeman laid out in his blog series on [Dependency Inversion in Functional Programming](http://blog.ploeh.dk/2017/01/27/from-dependency-injection-to-dependency-rejection/). It is a great series with a lot of insight from a master of software development. There isn't a ton of "domain logic" quite yet, but over time maybe this will expand to be a more full example!

## Building and running the project

Make sure you have `MongoDB` running on port `27017`

Make sure you have `yarn` installed: `npm i -g yarn`  

Run the following commands in order:
- `yarn`
- `yarn compile`
- `yarn start`

You should get a message that you are connected to the DB and the app is listening on port `3000`.

## Running the tests

After building and running the app, simply run `yarn test` in the console and the tests should start.

## Comments or conerns

If you have ideas about how to expand this project, have some questions on why I did what, or just want to chat feel free to open an issue!

Or, you can find me on the AZ WebDevs slack `@Carson Howard`

## Final note

Have fun!