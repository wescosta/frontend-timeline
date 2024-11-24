# Timeline POC

## How long you spent on the assignment
About 5 hours. ~3 hours implementing. 2 hours testing.

I started by just dropping some code to see the timeline events list on the screen. Then I dropped some CSS to make it look better.

After that, I refactored the code to use a custom hook that returns the events list because it would also return an update function. Then I wanted to group the timeline events by end date for simplicity and the custom hook worked like a charm for that. So I sorted and grouped the event list in a map object where the keys are the dates and the values the list of events ending on that date.

Then I implemented the update dialog and the drag and drop features.

Finally, I tweaked the CSS, refactored the code for better readability and added test cases. 

## What you like about your implementation
- It uses a CSS to build the timeline
- It uses a custom hook to load and parse the timeline data
- It groups timeline events with the same end date for simplicity sake
- You can drag and drop events on different date groups
- You can update the event name and date details and the list gets updated

## What you would change if you were going to do it again
- Use Typescript
- Define types and component prop types with TS
- Use style components at least, if UI libs like Chakra or Material UI were still not allowed
- Configure test coverage thresholds

## How you made your design decisions
- Since no UI lib was allowed, I've looked up for a CSS solution and found this W3C example, which I used as an inspiration https://www.w3schools.com/howto/howto_css_timeline.asp

## How you would test this if you had more time
- I would add visual tests possibly with Storybook to ensure look and feel remain consistant while updating

### Note
You may need to execute this line before running

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```