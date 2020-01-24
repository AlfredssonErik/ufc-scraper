This is a node server for scraping UFC data, used by [https://github.com/AlfredssonErik/fighter-lens](https://github.com/AlfredssonErik/fighter-lens). 

## Available Scripts

In the project directory, run:

`node server.js`

Runs the server on port 4000.

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
Returns biography, stats and history for a fighter<br>
Example for /athelete/jon-jones:
```javascript
[
  {
    name: 'Jon Jones',
    image: 'example.com/image.png',
    total: '24-1-0 (W-L-D)',
    stats: [
    {
	  text: 'Striking accuracy',
      figure: '58%'
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
