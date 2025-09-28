import ee from 'event-emitter';

const MyClass = function () { /* .. */ };
ee(MyClass.prototype); // All instances of MyClass will expose event-emitter interface

const emitter = new MyClass();

export default emitter;