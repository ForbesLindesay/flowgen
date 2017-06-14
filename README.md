# Flowgen2

Nothing much works yet, but I plan to expand on this very soon.

## Installation

```
npm install flowgen2
```

## Usage

Add something like the following to your package.json:

```
  "scripts": {
    "build": "tsc",
    "postbuild": "flowgen lib/**/*"
  }
```

Then when you run `npm run build`, you should see `.js.flow` files along with all your typescript defintions and plain JavaScript files.

## License

MIT