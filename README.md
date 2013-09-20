## Ember Live API

This project aims to replicate the functionality of the emberjs.com/api/ site (which is statically generated), with an Ember application that uses the 
YUIDoc output directly. This will allow us to access documentation for nearly any version of Ember (instead of a single version).

### TODO

This is a listing of the things I think that need to be done before we can really push to change out the current static generated API docs with this:

* Add routes for modules, projects, and namespaces.
* Add routes allowing direct linking to specific 'classitems' (methods, properties, events).
* Allow passing the data via URL (either by query string or dynamic segment).
* Make ApiOptions actually filter (Inherited, Protected, Private, and Deprecated).
* Figure out rendering speed issues (takes 1/2 second to switch from index view to method view, why?).
* Fix searching.
  * UI Sucks
  * Targets are not clickable

### Contributing

To get started:

```
git clone https://github.com/rjackson/ember-live-api.git
cd ember-live-api
npm install
npm install -g grunt-cli # if you don't already have it
grunt server
```

Then visit [http://localhost:8000/](http://localhost:8000/)

### Requirements

[Node.js](http://nodejs.org).
