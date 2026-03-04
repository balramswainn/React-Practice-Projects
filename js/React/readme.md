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
React still uses Virtual DOM, but Fiber controls how the diffing and updates are processed.

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