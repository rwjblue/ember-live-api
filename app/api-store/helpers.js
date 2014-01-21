var isEmpty = Ember.isEmpty,
    keys = Ember.keys;

function getProject() {
  return Ember.computed(function() {
    return this.store.findProject();
  });
}

function getModule(moduleNameKey) {
  return Ember.computed(function() {
    var moduleName = this.get(moduleNameKey);
    if (isEmpty(moduleName)) return;
    return this.store.findModule(moduleName);
  }).property(moduleNameKey);
}

function getModules(moduleNamesKey) {
  return Ember.computed(function() {
    var store = this.store,
        moduleNames;

    if (moduleNamesKey) {
      moduleNames = this.get(moduleNamesKey);
    } else {
      moduleNames = keys(store.get('data.modules'));
    }

    if (Ember.isArray(moduleNames)) {
      return moduleNames.map(function(moduleName) {
        return store.findModule(moduleName);
      });
    }
  }).property(moduleNamesKey);
}

function getClass(classNameKey, options) {
  return Ember.computed(function() {
    var className = this.get(classNameKey);
    if (isEmpty(className)) return;
    return this.store.findClass(className, options);
  }).property(classNameKey);
}

function getClasses(classNamesKey) {
  return Ember.computed(function() {
    var store = this.store,
        classNames;

    if (classNamesKey) {
      classNames = this.get(classNamesKey);
    } else {
      classNames = keys(store.get('data.classes'));
    }

    if (Ember.isArray(classNames)) {
      return classNames.map(function(className) {
        return store.findClass(className);
      });
    }
  }).property(classNamesKey);
}

// TODO: Drop the argument and just use this.name?
function getOwnClassitems(classNameKey) {
  return Ember.computed(function() {
    var className = this.get(classNameKey);
    if (isEmpty(className)) return [];
    return this.store.findOwnClassitems(className);
  }).property(classNameKey);
}

function hasClass(classNameKey) {
  return Ember.computed(function() {
    var className = this.get(classNameKey);
    return this.store.hasClass(className);
  }).property(classNameKey);
}

function hasModule(moduleNameKey) {
  return Ember.computed(function() {
    var moduleName = this.get(moduleNameKey);
    return this.store.hasModule(moduleName);
  }).property(moduleNameKey);
}

export {
  getProject,
  getModule,
  getModules,
  getClass,
  getClasses,
  getOwnClassitems,
  hasClass,
  hasModule
};