[![Build Status](https://travis-ci.org/rjackson/ember-live-api.png?branch=master)](https://travis-ci.org/rjackson/ember-live-api)

## Ember Live API

This project aims to replicate the functionality of the emberjs.com/api/ site (which is statically generated), with an Ember application that uses the 
YUIDoc output directly. This will allow us to access documentation for nearly any version of Ember (instead of a single version).

### TODO

The listing of the things that need to be done before we can really push to change out the
current static generated API docs can be found [here](https://github.com/rjackson/ember-live-api/issues).

### Contributing

To get started:

``` sh
git clone https://github.com/rjackson/ember-live-api.git
cd ember-live-api
npm install
npm install -g grunt-cli # if you don't already have it
bower install
grunt server
```

Then visit [http://localhost:8000/](http://localhost:8000/)

### Requirements

[Node.js](http://nodejs.org).
