function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.getName = () => {
    return `${this.firstName} ${this.lastName}`;
  };
  // console.log(`Person instantiated: `, this);
}

function Programmer(firstName, lastName) {
  Person.call(this, firstName, lastName);
  this.hasLive = false;
}
Programmer.prototype = Person.prototype;

const sonq = new Person('Sonq', 'Marinova');
const riko = new Programmer('Radoslav', 'Marinov');

Person.prototype.type = 'Constructor functio';

console.log(sonq.type);
console.log(riko.type);
console.log(sonq.hasLive);
console.log(riko.hasLive);
