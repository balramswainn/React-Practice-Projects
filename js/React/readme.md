React is a JavaScript library for building user interfaces. React is used to build single-page applications. React allows us to create reusable UI components.

vite : Vite is a modern frontend build tool that provides fast development server and optimized production builds.

node modules :-  Yaha project ke saare installed packages / libraries store hote hain jo npm install se aate hain. Isko manually edit nahi karte.
Contains all installed dependencies and packages required for the project. It is automatically created when you run npm install.


public:- Yaha static files rakhte hain jaise images, favicon, ya koi file jo directly browser ko serve hogi.
Contains static assets that are served directly to the browser without processing.

src:- Ye project ka main code folder hota hai jaha React components, CSS, JS logic sab hota hai.
Contains the main source code of the application such as components, styles, and logic.

.gitignore :- Ye batata hai Git ko kaunsi files ignore karni hai (jaise node_modules, environment files).
Specifies files and folders that Git should ignore and not track in version control.

eslint.config.js :- Ye file ESLint rules define karti hai taaki code clean aur error-free likha ja sake.
Configuration file for ESLint that defines rules to maintain consistent and error-free code.

index.html:- Ye project ka main HTML file hota hai jisme React app load hota hai.
The main HTML entry file where the React application is mounted.

package-lock.json:-Ye file exact dependency versions lock karti hai taaki har machine me same version install ho.
Locks the exact versions of installed dependencies to ensure consistent installs.

package.json:- Isme project ka name, dependencies, scripts (start, build) sab defined hota hai.
Contains project metadata, dependencies, and scripts used to run and manage the project.

Readme.md:- Project ka documentation hota hai jisme project kya hai aur kaise run kare likha hota hai.
Documentation file that explains the project, setup instructions, and usage.

vite.config:- Ye file Vite bundler configuration ke liye hoti hai jaise plugins, server settings.
Configuration file for Vite that controls build settings, plugins, and development server behavior.




type : Ye batata hai project me kaunsa module system use ho raha hai (CommonJS ya ES Modules). Agar "type": "module" hai toh import/export use kar sakte ho.
Defines the module system used in the project. "type": "module" enables ES modules (import/export) instead of CommonJS (require).

scripts : Yaha custom commands define karte hain jo npm run se chalti hain jaise npm run dev, npm run build.
Contains commands that can be run using npm run. These scripts automate tasks like starting, building, or testing the project.

dependencies : Ye main packages hote hain jo app run hone ke liye production me bhi chahiye hote hain.
Lists packages required for the application to run in production.

devDependencies : Ye development ke tools hote hain jo coding ya build ke time chahiye hote hain, production me nahi.
Lists packages needed only during development (build tools, linters, testing libraries).





================================================================================





1️⃣ State :- State is a built-in React object used to store data that can change over time inside a component. When the state changes, the component re-renders automatically to update the UI.    const [count, setCount] = useState(0);

2️⃣ Props (Properties) :- Props are the mechanism for passing data from a parent component down to a child component.They are like function arguments in JavaScript and allow components to be dynamic and reusable with different data. They are used to pass data and configuration between components. <Greeting name="Balram" />

3️⃣ Components :- components are independent, reusable building blocks of the user interface (UI) in React that returns JSX to describe how the UI should appear, IT allows developers to break down complex applications into smaller, manageable pieces. They are conceptually like JavaScript functions that accept inputs called "props" and return React elements describing what should appear on the screen. Components can be functional components or class components, but modern React mainly uses functional components.





1. ReactDOM : connects React with the browser DOM and renders React components into the web page.
2. createRoot : It lets you create a root to display react components inside a browser DOM node.
3. React.StrictMode :  is a development tool that helps identify potential problems in React applications.


4. npx create-react-app my-app vs npm create vite@latest

| Feature    | create-react-app | Vite             |
| ---------- | ---------------- | ---------------- |
| Speed      | Slow             | Very Fast        |
| Dev server | Slower           | Instant start    |
| Build tool | Webpack          | ESBuild + Rollup |
| Hot reload | Slow             | Very fast        |
| Config     | Hidden           | Simple           |






5. VirtualDOM : The Virtual DOM is a lightweight representation of the real DOM that exists in memory. React uses it to efficiently update the user interface.
When the state or props of a component change, React first updates the Virtual DOM. Then React compares the new Virtual DOM with the previous one using a process called diffing. After finding the differences, React updates only the necessary parts of the real DOM instead of updating the entire DOM. This makes UI updates faster and more efficient.

Virtual DOM is still a core concept in React. React still uses Virtual DOM, but the algorithm that processes updates is React Fiber.
Fiber controls how the diffing and updates are processed.

State / Props change
        ↓
New Virtual DOM
        ↓
Compare with Old Virtual DOM (Diffing)
        ↓
Find changes
        ↓
Update Real DOM



6. React Fiber is the reconciliation engine introduced in React 16 that breaks rendering work into small units and allows React to pause, prioritize, and schedule updates efficiently. so the browser is not blocked for a long time.

Key Features of React Fiber

1️⃣ Incremental rendering – work is split into smaller units
2️⃣ Prioritization – important updates first
3️⃣ Pause & resume work – rendering can stop and continue later
4️⃣ Better scheduling – smoother user experience

Earlier React updates were synchronous, meaning the whole UI update had to complete immediately. This could block the main thread and cause frame drops or poor user experience in complex applications.

With React Fiber, updates can be paused, prioritized, resumed, or batched, which improves performance and makes the UI smoother.


Maan lo page pe: typing input, large list rendering, animation
Old React me: Sab updates ek saath run   ->    Browser block   ->    Lag / frame drop
Fiber me: High priority (user typing)   ->   Low priority (large list rendering later)    ->   Smooth UI




7. Reconciliation is the process by which React compares the new Virtual DOM with the previous one and updates only the changed parts of the real DOM. React Fiber wahi engine hai jo Reconciliation process ko handle karta hai aur updates ko schedule karta hai.

8. JSX is a syntax extension for JavaScript that allows developers to write HTML-like code inside JavaScript. It is compiled into React.createElement() calls.
JSX:
A syntax that allows writing HTML-like structures inside JavaScript for React components.

Fragment:
A React feature used to return multiple elements without adding an extra DOM element.


9. Babel is a JavaScript compiler that converts modern JavaScript and JSX into compatible JavaScript that browsers can understand.React browsers directly cannot understand JSX, so Babel transforms JSX into regular JavaScript (React.createElement) that the browser can execute.



React applications typically use a bundler (such as Vite, Webpack, or Parcel). The bundler works together with tools like Babel behind the scenes.

Babel’s job is to transpile modern JavaScript and JSX syntax into standard JavaScript that browsers can understand.

When we write JSX in React, Babel converts it into React element objects using React.createElement(). React then uses these objects to build the Virtual DOM, compare changes, and finally update the real DOM, which is displayed in the browser.

Flow :-  JSX → Babel converts it to React.createElement() → React creates element objects → React updates the DOM.
JSX Code
   ↓
Babel transpiles JSX
   ↓
React.createElement()
   ↓
React Element Object
   ↓
Virtual DOM
   ↓
Real DOM
   ↓
Displayed in Browser



10. Evaluated Expression in JSX   ->  {state}

An evaluated expression in React means writing JavaScript expressions inside JSX using {}.
The expression inside {} is evaluated and the result is rendered in the UI.
const name = "Balram";
return <h1>Hello {name}</h1>;

Inside JSX {} you can write JavaScript expressions, but not statements.
✔ Allowed: variables, functions , ternary operators, math operations
<h1>{2 + 2}</h1>
<h1>{user.name}</h1>
<h1>{isLoggedIn ? "Welcome" : "Login"}</h1>

❌ Not allowed: if , for, while   because they are statements, not expressions.


difference
1️⃣ Expression wo hota hai jo koi value produce kare.Matlab evaluate hone ke baad result milega.
Examples :- 2 + 3 = 5

2️⃣ Statement wo hota hai jo koi action perform karta hai, but value return nahi karta.
Example : 
if (x > 5) {
  console.log("big");
} 
Ye actions hain, value produce nahi karte.

4️⃣ Easy trick : Agar code ko variable me assign kar sakte ho, toh wo expression hai.
✔ let a = 2 + 3;
✔ let a = user.name;
❌ let a = if(x>5){}

Isliye React me conditional rendering ke liye ye use hota hai:
{isLoggedIn ? <Home/> : <Login/>}
Kyuki ternary operator expression hai.









11. Hooks :- are special functions in React that allow functional components to use state and other React features without writing class components.
Hooks were introduced in React 16.8.
Before hooks, only class components could manage state and lifecycle methods. Hooks made it possible to do this inside functional components. 
Common Hooks :- useState, useEffect, useContext, useRef, useMemo, useCallback

12. A Custom Hook is a JavaScript function that uses one or more React hooks to reuse logic across multiple components.The name of a custom hook must start with use.

1️⃣ useState :- useState is a React hook that allows functional components to store and update state.When the state changes, the component re-renders. 
const [state, setState] = useState(initialValue);
Key Points:-
useState returns state value + setter function
Updating state triggers re-render

2️⃣ useEffect is a React hook used to handle side effects in functional components.Side effects include: API calls, DOM manipulation, timers, subscriptions, event listeners.
useEffect is used to perform side effects such as API calls, subscriptions, or DOM updates in React functional components.
useEffect(() => {
  // side effect
}, [dependencies]);

| Dependency    | When it runs                |
| ------------- | --------------------------- |
| `[]`          | only once (component mount) |
| `[value]`     | runs when value changes     |
| no dependency | runs on every render        |


3️⃣ useRef :- useRef is used to store a mutable value that does not cause re-render when it changes.It is also commonly used to access DOM elements directly.useRef = value ya DOM reference store karo bina re-render ke
  const inputRef = useRef();

4️⃣ useMemo :- useMemo is used to memoize expensive calculations so they are not recomputed on every render.
const value = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
useMemo caches the result of a computation and recomputes it only when dependencies change.

5️⃣ useCallback :- useCallback is a React hook that lets you cache a function definition between re-renders.
useCallback is used to memoize functions so they are not recreated on every render. useCallback returns a memoized version of a function that only changes when dependencies change.

const memoizedFunction = useCallback(() => {
  // function logic
}, [dependencies]);

6. useId :- useId is a React Hook for generating unique IDs that can be passed to accessibility attributes  like htmlFor. const id = useId(), Do not call useId to generate keys in a list. Keys should be generated from your data.

| Hook        | Purpose                       |
| ----------- | ----------------------------- |
| useState    | store state                   |
| useEffect   | side effects                  |
| useRef      | DOM reference / mutable value |
| useMemo     | memoize values                |
| useCallback | memoize functions             |












1️⃣ Why does useEffect run twice in development?
In React 18, when using React.StrictMode, React intentionally runs some functions (including useEffect) twice in development to detect side effects and potential bugs.
This happens only in development, not in production.


2️⃣ What is the Virtual DOM?
The Virtual DOM is a lightweight representation of the real DOM stored in memory. React compares the new Virtual DOM with the previous one and updates only the necessary parts of the real DOM.


3️⃣ What is Reconciliation?
Reconciliation is the process where React compares the previous Virtual DOM with the new Virtual DOM to determine what changes need to be made to the real DOM.


4️⃣ What are keys in React?
Keys are special attributes used to uniquely identify elements in a list so React can efficiently update, add, or remove items during reconciliation.
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}


5️⃣ Why should we not use array index as key?
Using the array index as a key can cause incorrect UI updates when items are added, removed, or reordered because React cannot properly track element identity.


6️⃣ Controlled vs Uncontrolled Components
Controlled Component
React controls the input value using state. <input value={name} onChange={e => setName(e.target.value)} />

Uncontrolled Component
The DOM controls the input value using ref.
const inputRef = useRef();
<input ref={inputRef} />


7️⃣ What is the difference between useMemo and useCallback?
| Hook        | Purpose                   |
| ----------- | ------------------------- |
| useMemo     | memoizes a computed value |
| useCallback | memoizes a function       |
const value = useMemo(() => calculate(), []);
const fn = useCallback(() => doSomething(), []);


8️⃣ What is React Fragment?
A React Fragment allows grouping multiple elements without adding extra nodes to the DOM.
<>
  <h1>Hello</h1>
  <p>World</p>
</>


9️⃣ What is a Custom Hook?
A custom hook is a reusable function that uses React hooks to share logic across multiple components.


🔟 What is the difference between state and props?
| State                    | Props              |
| ------------------------ | ------------------ |
| managed inside component | passed from parent |
| can change               | read-only          |
| triggers re-render       | triggers re-render |


11. Why React is fast?
React is fast because of: Virtual DOM, Diffing algorithm, Efficient reconciliation, React Fiber scheduling




=============================================================================




React converts JSX → React elements → Virtual DOM, compares changes using diffing, schedules updates with Fiber, and efficiently updates the real DOM to render the UI.


1️⃣ JSX
JSX (JavaScript XML) allows us to write HTML-like syntax inside JavaScript.
Example:  const element = <h1>Hello Balram</h1>;
Browsers cannot understand JSX directly.


2️⃣ Babel
Babel converts JSX into normal JavaScript.
Example conversion: JSX - <h1>Hello</h1>

Converted code
React.createElement("h1", null, "Hello")
So Babel transpiles JSX → JavaScript.


3️⃣ React.createElement()
React.createElement() creates a React Element object.
Example object:{
  type: "h1",
  props: {
    children: "Hello"
  }
}
This object is not DOM.
It is just a description of the UI.


4️⃣ React Element
React Elements are plain JavaScript objects that describe what the UI should look like.
Example:{
 type: "div",
 props: {
   className: "container",
   children: "Hello"
 }
}
React uses these objects to build the UI.


5️⃣ Fiber (Reconciliation Engine)
React Fiber is the internal algorithm that manages rendering.
It: breaks work into small units
prioritizes updates
schedules rendering
prevents UI blocking
Fiber is responsible for reconciliation.


6️⃣ Virtual DOM
React creates a Virtual DOM tree from React elements.
Virtual DOM is a lightweight copy of the real DOM stored in memory.


7️⃣ Diffing Algorithm
When state or props change:
React creates a new Virtual DOM
compares it with the previous Virtual DOM
finds differences
This process is called diffing.



8️⃣ Real DOM Update
After finding changes, React updates only the necessary parts of the real DOM instead of re-rendering everything.
This improves performance.


9️⃣ Browser UI
After the real DOM is updated, the browser renders the updated UI on the screen.
⭐ One-Line Summary (Very Good for Interviews)
React converts JSX → React elements → Virtual DOM, compares changes using diffing, schedules updates with Fiber, and efficiently updates the real DOM to render the UI.




1. onClick expects a function reference that React will execute when the click event occurs.
| Code                            | Meaning            |
| ------------------------------- | ------------------ |
| `onClick={handleClick}`         | function reference | React will call the function when the click happens.
| `onClick={() => handleClick()}` | inline function    | Here React runs the arrow function when the button is clicked.
| `onClick={handleClick()}`       | ❌ runs immediately during render 


2. JSX
1️⃣ JSX must return a single parent element
2️⃣ Use className instead of class, Because class is a reserved keyword in JavaScript. : <div className="container"></div>
3️⃣ JavaScript expressions must be inside {}, JSX allows JavaScript expressions inside curly braces. : <h1>Hello {name}</h1>
4️⃣ JSX must have closing tags: <img src="image.png" />
5️⃣ Use camelCase for attributes , DOM attributes in JSX use camelCase. :<label htmlFor="name">Name</label>onClick, onChange, tabIndex
6️⃣ Inline styles must be objects, Styles in JSX are written as JavaScript objects:<div style={{ color: "red", fontSize: "20px" }}></div>
7️⃣ Use key when rendering lists, Keys help React identify elements efficiently during updates.
8️⃣ Comments inside JSX, Use {/* comment */}
9️⃣ Only expressions allowed inside JSX





