function Builder() {
  this._value = null;
  this._functions = [];
}

Builder.prototype.sumOfArguments = function() {
  if (arguments.length === 0) throw new Error('Arguments not defined');
  return [].slice.call(arguments).reduce(function(acc, item) {
    return acc + item;
  });
};
Builder.prototype.plus = function() {
  const args = arguments;
  this._functions.push((function() {
    this._value += this.sumOfArguments.apply(null, args);
  }).bind(this, args));
  return this;
};
Builder.prototype.get = function() {
  this._functions.forEach(function(func) { func(); }, this);
  this._functions = [];
  return this._value;
};

class IntBuilder extends Builder {
  constructor(int) {
    super();
    this._value = int;
  }

  static random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  minus(...args) {
    this._functions.push(() => {
      this._value -= super.sumOfArguments(...args);
    });
    return this;
  }

  multiply(n) {
    this._functions.push(() => {
      this._value *= n;
    });
    return this;
  }

  divide(n) {
    this._functions.push(() => {
      this._value = Math.trunc(this._value / n);
    });
    return this;
  }

  mod(n) {
    this._functions.push(() => {
      this._value %= n;
    });
    return this;
  }
}

function StringBuilder(str) {
  Builder.call(this);
  this._value = str || '';
}

StringBuilder.prototype = Object.create(Builder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function(n) {
  this._functions.push((function() {
    this._value = this._value.slice(0, -n);
  }).bind(this, n));
  return this;
};
StringBuilder.prototype.multiply = function(n) {
  this._functions.push((function() {
    this._value = new Array(n + 1).join(this._value);
  }).bind(this, n));
  return this;
};
StringBuilder.prototype.divide = function(n) {
  this._functions.push((function() {
    const k = Math.floor(this._value.length / n);
    this._value = this._value.slice(0, k);
  }).bind(this, n));
  return this;
};
StringBuilder.prototype.remove = function(str) {
  this._functions.push((function() {
    this._value = this._value.split(str).join('');
  }).bind(this, str));
  return this;
};
StringBuilder.prototype.sub = function(from, n) {
  this._functions.push((function() {
    this._value = this._value.substring(from, from + n + 1);
  }).bind(this, from, n));
  return this;
};
