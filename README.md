<image src="https://user-images.githubusercontent.com/16717155/155882642-fc3d8ebd-7763-4776-92cb-9398859e8f8a.png" width="350" align="right" />

# Firebase Basics

Started with this introduction https://fireship.io/courses/react-next-firebase/intro-firebase-basics/ however quickly realised it was outdated so worked through the 15 video course on YT here https://www.youtube.com/watch?v=9zdvmgGsww0&list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb

> You'll learn how to use the new version of Firebase, which adopts a more functional & modular approach & makes use of tree shaking to reduce our bundle size.

## Start, End Date & Final Project

- **Start:** 27th Feb 2022
- **End:** 27th Feb 2020
- **URL:** [[link](https://flexbox-crash-course-2022.pages.dev/)](<[link](https://flexbox-crash-course-2022.pages.dev/)>) - Cloudflare Pages

## First impressions

- Curious to see how this works as it promises a lot of help with backend processes (node & db, plus auth!)
- Did look at the pricing, looks very cheap with 1Gb of storage for db and its inexpensive above that

## What I liked & disliked

- Not used (knowingly) Webpack until now. Add config file, then to package.json and use `npm run build`
- Fixed console warnings about `DevTools failed to load source map: Could not load content for webpack://*` using this approach https://stackoverflow.com/questions/61767538/devtools-failed-to-load-sourcemap-for-webpack-node-modules-js-map-http-e
- Didn't like the then().catch() approach so converted to async/await which is easier to read
- Took to opportunity to style the components with BooStrap 5. Only mistake was not setting the button type to `submit` as I left it as `button` and the JS wouldn't pick up the submit event!
- There are a lot of functions that need to be remembered to do just basic things with Firebase `getFirestore,collection,getDocs,onSnapshot,addDoc,deleteDoc,doc,query,where,orderBy,serverTimestamp` where are already included in MongoDb implementation, which I know there is for speed. but it was the serverTimestamp() function that seemed a bit off, as with mongoDb, we can use use Date.now() and be done with it, then all calcs on the date value can be done natively within JS, not having to use a secondary function.
- Vendor "lock in" is what I'm thinking here. Fine if you are 100% committed to Firebase, if not...
- I do like the auth section, that could make things easier for user registration from multiple sources and I do like this too https://firebase.google.com/docs/auth/web/email-link-auth

## Notes

- Need to look up "Firestore rules" (if not covered in any detail in this course)
- Source code here, sorted into branches per lesson https://github.com/iamshaunjp/Getting-Started-with-Firebase-9
- Finally got fed up with default try/catch in vscode and wrote my own, with the custom short code of `trc`. `TM_SELECTED_TEXT` pastes in the selected text, so I can grab one whole block and wrap it in a try/catch and also did the same for `con` for `console.log()` and `coe` for `console.error()`

```
"try/catch": {
		"prefix": "trc",
		"body": [
			"try {",
			"	$TM_SELECTED_TEXT$0",
			"} catch (err) {",
			"	console.err(err)",
			"};"
		],
		"description": "Updated try/catch statement"
	}
```
