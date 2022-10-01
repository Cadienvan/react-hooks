# What is this?
A simple collection of React Hooks made for personal use, just for testing and experimenti

# Which hooks are available?
## onMount
A hook that runs a callback when the component is mounted.  
It's a simple wrapper around `useEffect` that runs the callback only at component mount.
Example:
```js
import { onMount } from '@cadienvan/react-hooks'
function MyComponent() {
  onMount(() => {
    console.log('Mounted!')
  })
  return <div>My Component</div>
}
```

## onUnmount
A hook that runs a callback when the component is unmounted.  
It's a simple wrapper around `useEffect` that runs the callback only at component dismount.
Example:
```js
import { onUnmount } from '@cadienvan/react-hooks'
function MyComponent() {
  onUnmount(() => {
    console.log('Unmounted!')
  })
  return <div>My Component</div>
}
```

## useAtom
A hook that creates a reactive variable, preventing the stale state problem by using a mix of React's `useState` and `Proxy`.

### What is the stale state problem?
The stale state problem is when you have a useState and update the corresponding state using the hook's given setState function. Until React rerenders the component, your state will be stale, meaning that it will not be updated.  
Here's a nice blog post on Free Code Camp about React State internals:
[Read It!](https://www.freecodecamp.org/news/what-every-react-developer-should-know-about-state/)  

Here's an example of a stale state:
```js
const [count, setCount] = useState(0)
setCount(count + 1);
console.log(count); // Expecting 1, receiving 0 instead.
setTimeout(() => {
  setCount(count + 1);
}, 1000); // Expecting 2, receiving 1 instead.
```
As mentioned, the above code will not work as expected, because the state will be stale until React re-renders the component. This is where `useAtom` comes in.  
By providing a proxy to the state, we can make sure that the state is always up to date, even if React hasn't re-rendered the component yet.
Example:
```js
const atomTest = useAtom(0);
console.log(atomTest.value); // 0, as expected
atomTest.value++;
console.log(atomTest.value); // 1, as expected
setTimeout(() => {
  atomTest.value++;
}, 1000); // 2, as expected
```
The above code will work as expected, because the state is not stale. The `useAtom` hook will update the state immediately, and the `value` property will be updated as well.  

### What can I put in an atom?
You can use the `useAtom` hook both with primitives (strings, numbers, etc..), arrays and objects. It cannot be used with functions.  
Internally, the hook will create an atom for every primitive in the array or in the object.  
```js
  const atomObj = useAtom({
    a: 1,
    b: 10,
    c: 100,
  });

  atomObj.a.value = 2; // This will update the state
  console.log(atomObj.a.value); // 2, as expected

  const atomArr = useAtom([1, 2, 3, 4, 5]);

  atomArr[0].value = 10; // This will update the state
  console.log(atomArr[0].value); // 10, as expected
```

### What is the difference between `useAtom` and `useState`?
The difference is that `useAtom` will update the state variable immediately thanks to its Proxy-based implementation, while `useState` will not update it until React re-renders the component.

### What is the difference between `useAtom` and `useRef`?
The difference is that `useAtom` will re-render the component on change, while `useRef` will not.

### How can I subscribe for changes?
If you want to respect the Observer Pattern, you can use the `subscribe` property to subscribe and unsubscribe for changes:
```js
const atomTest = useAtom(0);
const atomObserver = (newValue, oldValue) => {
  console.log(`New value: ${newValue}, old value: ${oldValue}`);
};
atomTest.subscribe(atomObserver);
atomTest.value++;
atomTest.unsubscribe(atomObserver);
```  

### What if I want to keep using the `useEffect` hook?
If you instead prefer a more standard approach, the hook exposes a `state` property which contains the React state value, allowing you to use the `useEffect` hook as usual.  
```js
const atomTest = useAtom(0);
useEffect(() => {
  console.log(`New value: ${atomTest.state}`);
}, [atomTest.state]);
atomTest.value++;
```

### How can I trigger my subscribe callback at first component mount?
You can pass a second parameter to the useAtom hook, which will contain the atom configuration.  
You can use the `triggerOnMount` property to trigger the subscribe callback at first component mount.  
This will work in a similar way to a `Behaviour Subject` in Reactive Programming and works just like the `useEffect` hook.
```js
const atomTest = useAtom(0, {
  triggerSubscribeOnMount: true,
});
atomTest.subscribe((newValue, oldValue) => {
  console.log(`New value: ${newValue}, old value: ${oldValue}`);
}); // This will be logged at first component mount with initial value of 0.
```