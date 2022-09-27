# What is this?
A simple collection of React Hooks made for personal use, just for testing and experimenti

# Which hooks are available?
## onMount
A hook that runs a callback when the component is mounted.
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

#### What is the stale state problem?
The stale state problem is when you have a useState and update the corresponding state using the set function. Until React recompiles the component, your state will be stale, meaning that it will not be updated.  
Here's a nice blog post on Free Code Camp about React State internals:  
[Read It!](https://www.freecodecamp.org/news/what-every-react-developer-should-know-about-state/)  
Example:
```js
const [count, setCount] = useState(0)
setCount(count + 1);
console.log(count); // Expecting 1, receiving 0 instead.
setTimeout(() => {
  setCount(count + 1);
}, 1000); // Expecting 2, receiving 1 instead.
```
The above code will not work as expected, because the state will be stale until React recompiles the component. This is where `useAtom` comes in.
Example:
```js
const atomTest = useAtom(0);
console.log(atomTest.value); // 0, as expected
atomTest.value++;
console.log(atomTest.value); // 1, as expected
setTimeout(() => {
  count++
}, 1000); // 2, as expected
```
The above code will work as expected, because the state is not stale. The `useAtom` hook will update the state immediately, and the `value` property will be updated as well.  

#### What can I put in an atom?
Your only constraint is you will have to call the `.value` property, as the hook needs it in order to work.  
You can use the `useAtom` hook both with primitives, arrays and objects:
```js
  const atomObj = useAtom({
    a: 1,
    b: 10,
    c: 100,
  });

  atomObj.a = 2; // This will update the state
  console.log(atomObj.a); // 2, as expected

  const atomArr = useAtom([1, 2, 3, 4, 5]);

  atomArr[0] = 10; // This will update the state
  console.log(atomArr[0]); // 10, as expected
```

#### What is the difference between `useAtom` and `useState`?
The difference is that `useAtom` will update the state immediately thanks to its Proxy-based implementation, while `useState` will not update the state until React recompiles the component.

#### What is the difference between `useAtom` and `useRef`?
The difference is that `useAtom` will recompile the component on change, while `useRef` will not.

#### How can I watch for changes?
You can use the `watch` property to watch for changes:
```js
const atomTest = useAtom(0);
atomTest.watch((newValue, oldValue) => {
  console.log(`New value: ${newValue}, old value: ${oldValue}`);
});
atomTest.value++;
```

#### How can I trigger my watch callback at first component mount?
You can pass a second parameter to the useAtom hook, which will be the atom configuration.  
You can use the `triggerOnMount` property to trigger the watch callback at first component mount:
```js
const atomTest = useAtom(0, {
  triggerWatchOnMount: true,
});
atomTest.watch((newValue, oldValue) => {
  console.log(`New value: ${newValue}, old value: ${oldValue}`);
});
```