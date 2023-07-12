# squashify.js

Resize DOM elements in real-time for a seamless smartphone experience.

## Usage

```typescript
// Retrieve the root element directly below the body.
const root = document.getElementById("root")!
// Create a squasher with the desired dimensions of 1280x720.
const squasher = Squashify(root, [1280, 720])
// Squash the content every frame.
const update = () => {
    squasher()
    requestAnimationFrame(update)
}
update()
```
