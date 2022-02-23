# game-of-life

A project by Mark Pazolli using [Create React App](https://github.com/facebook/create-react-app) with the [official template](https://github.com/reduxjs/cra-template-redux) for the [Redux](https://redux.js.org/), [Redux Toolkit](https://redux-toolkit.js.org/) and [TypeScript](https://www.typescriptlang.org/) combination.

## Usage

To build and run:

```
nvm use v16.14.0
npm install
npm start
```

Then to run the unit tests:

```
npm test
```

## Structure

Many files are unmodified from the template.

- `App.tsx` houses the top-level content
- `shared` contains colors, constants, common types and a cloning utility function - importantly `constants.ts` defines the _BOARD_ROWS_ and _BOARD_COLS_
- `redux` contains all Redux-specific code - only `cellsSlice` differs substantially from the template: these files specify the actions, reducers and initial state that is the heart of the program
- `core` contains the board logic to generate the cells after the user clicks "Next generation"
- `components` contain the `.tsx` files that render the _Board_ which consists of multiple *Cell*s and the _Header_ that contains the action buttons "Reset" and "Next generation"

All styling is done using [styled-components](https://styled-components.com/) and,
unlike the template, there are no CSS files.

## Redux actions

The redux actions are:

- _toggle_ to toggle a particular cell
- _reset_ to clear the board (i.e. set all cells to dead)
- _revise_ to revise the board - typically called as a consequence of the thunk
- _next_ a thunk that runs regeneration and then calls _revise_ to revise the board

## Design choices and notes

- The co-ordinate system used is (row, column) _never_ (x, y)

- Redux themselves [advises projects](https://redux.js.org/faq/general#when-should-i-use-redux)
  to consider if Redux is necessary. There are a few reasons I chose to use it here though:

  - The way the next generation depends upon the previous generation of and position of
    all cells works very well with Redux's immutable update approach
  - The Redux structure and framework will be familiar to many programmers
  - I try to avoid using [Context](https://reactjs.org/docs/context.html) directly and Redux
    provides a way to parachute the `toggle` action to the cell, the overall board state to the board and the other actions to the header quite neatly.

- This was my first time using [slices](https://redux-toolkit.js.org/api/createslice) and I like the way they encapsulate both the actions and reducers.

- The `regenerate.ts` file is tested across two test files because the tests were becoming unwieldy. `regenerate.test.ts` runs the full example provided as part of the scope. `regenerate-utils.test.ts` unit tests the three functions: _isCellAlive()_, _getNeighboursAlive()_ and _getWrappedSiblingNeigboursAlive()_ that `regenerate.ts` depends upon to calculate the next generation.

- If this were a real project, I would have asked for an example that showed the wrap-around working. My approach assumes that if a cell outside comes alive it wraps around to the other side. As such corner outside cells can never come alive because they can never have three neighbours. I also assume that if an edge cell dies but its wrap-around counterpart comes to life, that cell will be alive for the next generation (and vice versa).

- I do worry about the consistency of snapshot tests passing between different versions of node.

- The regeneration works by checking the neighbours of each cell and working out if it is alive for the next generation. To do this, for each cell, it loops over the 8 nearest cells. There are probably faster approaches - but I felt this was the most readable.

## Future improvements

- Replace the `button`s: on big boards you can't drag over to enable multiple cells and there is dead-space between them.
- Improve performance: on big boards even toggling is slightly sluggish - would be interesting to see if performance improves if the `button`s became `div`s.
- Add auto-advancing: nicer than clicking a button several times.
- Add unit testing for the wrap-around function: as outlined above, I'd like an approved example to unit test against.
- Make it so board size is a React property not a constant: allowing it to be changed during runtime and removing the module mocking in some tests.
