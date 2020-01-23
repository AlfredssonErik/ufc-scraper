This is a node server used by [https://github.com/AlfredssonErik/ufc-fighter-lens](https://github.com/AlfredssonErik/ufc-fighter-lens). 

### Endpoints
`/rankings`
Returns the top 15 fighters for each division.<br>
Example:
```json
[
 {
	 name: 'divisionName',
	 fighers: [
		 {
			 name: 'fighterName',
			 link: 'link-to-athlete'
		 }
	 ]
 }
]
```



## Available Scripts

In the project directory, run:

### `npm start`

Runs the app in the development mode on port 3000.

### `npm run build`

Builds the app for production to the `build` folder.