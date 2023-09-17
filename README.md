# RSC Test

This is an npm package intended to test React Server Component implementations.

Currently it includes a single React component, RscForm. The component has the `'use client'` directive at the top of the file because internally it uses React's `useState()`, and so can only be used on the client. RscForm renders a form that takes a form action as a prop. The form action is supposed to be a React Server Function/Server Action.

The package is published under an organization on purpose, to test that the RSC implementation supports org package names (with dots in the name).

## Example

```
import { RscForm } from '@tobbe.dev/rsc-test'
import { onSend } from './serverActions'

// ...

  return (
    <RscForm onSend={onSend} />
  )
  
// ...
```
