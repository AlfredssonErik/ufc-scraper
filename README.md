This is a node server used by [https://github.com/AlfredssonErik/ufc-fighter-lens](https://github.com/AlfredssonErik/ufc-fighter-lens). 

## Endpoints

### /rankings
Returns the top 15 fighters for each division.<br>
Example:
```javascript
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
  ...
]
```

### /athlete/:name
Returns biograpghy, stats and history for a fighter<br>
Example:
```javascript
[
  {
    name: 'Jon Jones',
    image: 'example.com/image.png',
    total: '24-1-0 (W-L-D)',
    stats: [
    {
	  text: 'Striking accuracy',
      figue: '58%'
	}
	...
    ]
    bio: [
    {
      text: 'Age',
      figure: '31
    }
      ...
    ]
    history: [
      {
        event: 'UFC 239',
        name: 'Jones vs Santos',
        date: 'Jul 6 2019',
        win: true,
        stats: [
        {
          label: 'Round',
          text: '5',
        }
        ]
      }
    ]
  }
  ...
]
```



## Available Scripts

In the project directory, run:

### `npm start`

Runs the app in the development mode on port 3000.

### `npm run build`

Builds the app for production to the `build` folder.