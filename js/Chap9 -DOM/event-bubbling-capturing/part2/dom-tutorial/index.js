// ✅ Event Capturing  : Event capturing is the phase where an event moves from the outermost element down to the target element.

// ✅ Event Bubbling : Event bubbling is the phase where an event propagates from the target element up to its parent elements.

// ✅ Event Delegation : Event delegation is a technique where a single event listener is added to a parent element to handle events for its child elements using event bubbling.

// Capturing → top to bottom
// Bubbling → bottom to top
// Delegation → parent handles child events



// =================================




// console.log("hello world");

const grandparent = document.querySelector(".grandparent");
// const parent = document.querySelector(".parent");
// const child = document.querySelector(".child");



// Event Capturing

// child.addEventListener("click",() => {
//     console.log("capture !!!! child");
//   },
//   true   // boolean value diya hai ki ye event capture karna hai ki nahi       true means the event listener will run in the capturing phase, not the bubbling phase.
// );

// parent.addEventListener("click",() => {
//     console.log("capture !!!! parent");
//   },
//   true
// );
// grandparent.addEventListener("click",() => {
//     console.log("capture !!!! grandparent");
//   },
//   true
// );
// document.body.addEventListener("click",() => {
//     console.log("capture !!!! document.body");
//   },
//   true
// );







//// not capture    Event Bubbling : child to parent

// child.addEventListener("click", () => {
//   console.log("bubble child");
// });
// parent.addEventListener("click", () => {
//   console.log("bubble parent");
// });
// grandparent.addEventListener("click", () => {
//   console.log("bubble grandparent");
// });
// document.body.addEventListener("click", () => {
//   console.log("bubble document.body");
// });






// event delegation
grandparent.addEventListener("click", (e) => {
  console.log(e.target);           //Parent pe event lagaya hai, lekin click jis child pe hota hai, e.target usi element ko batata hai.
  //This is event delegation, where a single event listener is attached to a parent element to handle click events on its child elements using event.target.
});