# DOM & Event Handling

### 1. 
### What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**`getElementById` :** 

যখন Specific কোনো এলিমেন্টের Style Change করতে হবে, তখন এটা Use করা যাবে।
শুধু একটাই ID হতে পারে একটা ডকুমেন্টে।

`getElementById()` দিয়ে যদি কোনো ID name খোঁজা হয় যেটা আসলে ডকুমেন্টের ভেতরে নেই, তাহলে `null` লেখা দেখা যাবে কনসোলে। 

**`getElementsByClassName` :**

যখন কেবল কয়েকটা এলিমেন্টের Style Change করতে হয়, তখন এটা Use করা যাবে। 
একটা ডকুমেন্টে Class একাধিক হয় সাধারণত।

`getElementsByClassName()` দিয়ে যদি কোনো Class name খোঁজা হয় যেটা আসলে ডকুমেন্টের ভেতরে নেই, তাহলে একটা ফাঁকা `HTMLCollection` দেখা যাবে কনসোলে। 

**`querySelectorAll` :**

কোনো নির্দিষ্ট একটা অংশের ভেতরে থাকা ID বা Class বা এলিমেন্টের Style Change করার ক্ষেত্রে এই Selector ব্যবহার করা যায়।

`querySelectorAll()` দিয়ে যদি কোনো ID বা Class name বা Element খোঁজা হয় যেটা আসলে ডকুমেন্টের ভেতরে নেই, তাহলে একটা ফাঁকা `NodeList` দেখা যাবে কনসোলে।

**`querySelector` :**

এটাও কোনো নির্দিষ্ট একটা অংশের ভেতরে থাকা ID বা Class বা Element খুঁজতে ব্যবহার করা হয়। তবে এটা কোনো `NodeList` না দিয়ে প্রথম যেটা খুঁজে পাবে Condition অনুসারে, কেবল সেটাই কনসোলে দেখাবে।

`querySelector()` দিয়ে যদি কোনো ID বা Class name বা Element খোঁজা হয় যেটা আসলে ডকুমেন্টের ভেতরে নেই, তাহলে `null` লেখা দেখা যাবে কনসোলে। 

### 2. 
### How do you create and insert a new element into the DOM?

DOM এ নতুন Element Create & Insert করার ধাপ তিনটাঃ

**১। Element Create করা:**

`createElement()` দিয়ে নতুন Element তৈরি করা।

```
const newDiv = document.createElement("div");
```

**২। Content Assign করা:**

নতুন এলিমেন্টের ভেতরে Text বা HTML Content রাখতে `innerText` বা `innerHTML` ব্যবহার করা।

```
newDiv.innerText = "Hello World!";
```

**৩। Element Insert করা:**

`appendChild()` দিয়ে নতুন এলিমেন্টকে তার প্যারেন্টের সাথে Connect করে দেয়া।

```
document.body.appendChild(newDiv);
```

### 3. 
### What is Event Bubbling and how does it work?

**Event Bubbling** হলো একটা পদ্ধতি যেখানে কোনো এলিমেন্টে কোনো Event ঘটলে সেটা প্রথমে Inner এলিমেন্টে Trigger হয় এবং তারপর Outer parent এলিমেন্টে ধাপে ধাপে উপরের দিকে চলে।

ধরা যাক একটা *parent div* এর ভেতরে একটা *child div* আছে।

```
<div id="parent">
  <div id="child">Click Me</div>
</div>
```

```
document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});
```

যদি *child div* এ Click করা হয়, তাহলে প্রথমে কনসোলে **"Child clicked"** দেখাবে, তারপর **"Parent clicked"** দেখাবে।

Event Bubbling এর মূল ব্যবহার হলো – Event-কে উপরের এলিমেন্টগুলোর সাথে Propagate করা, যাতে Parent এলিমেন্টগুলোও সেই Event handle করতে পারে।

### 4. 
### What is Event Delegation in JavaScript? Why is it useful?

**Event Delegation** হলো একটি পদ্ধতি যেখানে Parent এলিমেন্টে একটা Event listener বসানো হয় আর Child এলিমেন্টগুলোর Event একই Listener দিয়ে Handle করা হয়।

```
document.getElementById("list").addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    console.log("You clicked on:", e.target.innerText);
  }
});
```

Event Delegation ব্যবহার করলেঃ
- Performance ভালো হয় (প্রতিটি Child এলিমেন্টে আলাদা Listener লাগানো লাগে না)।
- Dynamic এলিমেন্টের Event handling সহজ হয়।

### 5. 
### What is the difference between preventDefault() and stopPropagation() methods?

**`preventDefault()` :**

সাধারণত কোনো এলিমেন্টের Default behavior বন্ধ করতে ব্যবহার করা হয়।

```
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
```

**`stopPropagation()` :**

সাধারণত Event bubbling বন্ধ করতে ব্যবহার করা হয়। এটা ইভেন্টকে DOM ট্রি’র উপরের দিকে যেতে বাধা দেয়। 

```
child.addEventListener("click", (e) => {
  e.stopPropagation();
});
```
