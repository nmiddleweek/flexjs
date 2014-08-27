flexjs
======

A little experiment to create an Adobe Flex like UI component life cycle framework to initialise top level and sub-components recursively...


Note: JSObject exposes a closure protected method called SUPER. This is in affect the same as the super method found in ES6 and Java. e.g. take the following inheritance chain...

ImageViewer < UIComponent < EventDispatcher < JSObject

Each 'Class' exposes a .trace() method and you can see inside the application.js, we're creating an instance of the ImageViewer, then calling it's .trace() method passing 'hi' as a parameter. The result is a chainable hierarchy of trace() calls up the prototypal inheritance chain.

Have a a little snoop around :-)


Warning: This is a work in progress.


Nick