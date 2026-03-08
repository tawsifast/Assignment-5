1️⃣  What is the difference between var, let, and const?
Ans: In javascript, var, let & const are used to declare variables. But they behave differently in order of scope, redeclaration, reassign & hoisting.
    ... var ...
Function-scoped (not block-scoped)
Can be redeclared
Can be reassigned
Hoisted
    ... let ...
Block-scoped 
Cannot be redeclared in the same scope
Can be reassigned
Hoisted but stayed in the Temporal Dead Zone (TDZ) until declared.
    ... const ...
Block-scoped
Cannot be redeclared
Cannot be reassigned
Must be initialized before declaration.

2️⃣ What is the spread operator (...)?
Ans: The spread operator (...) in JavaScript is used to expand or spread elements of an array, object, or iterable into individual elements.

3️⃣ What is the difference between map(), filter(), and forEach()?
Ans:  map(), filter(), and forEach() three of them are the method of array.
    map() => map() creates a new array by transforming each element of the original array.

    filter() => filter() creates a new array with elements that pass a condition.

    forEach() => forEach() loops through an array and performs an action, but does not return a new.

4️⃣ What is an arrow function?
Ans: An arrow function is a shorter and more modern way to write functions in JavaScript. It was introduced in ES6 (ECMAScript 2015) and uses the => syntax.

5️⃣ What are template literals?
And: Template literals are a feature in JavaScript (introduced in ES6) that allow you to create strings more easily using backticks (` `) instead of single (' ') or double (" ") quotes.

They make it easier to insert variables, write multi-line strings, and embed expressions.