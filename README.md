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