# Awesome Logger
A simple logger that does what it needs to do.

### What does it do?
It logs your logs, warning, errors, and all other text messages to the console and, depending on the log level, to a file.

### Why awesome?
Because I'm awesome. And also because the name simple-logger which I had originally thought of was already taken. But mostly the awesome thing.

### Basic usage
Install the module using npm:

```
npm install awesome-logger
```

Require the logger like this:

```CoffeeScript
log = require('awesome-logger')()
```

Then use it in your code like this:
```CoffeeScript
log 'This is a notice'
```

### Log options
The first parameter is the string to log. Simple.

The second parameter is a number indicating the log level.

- 0: Info (default value, just like a regular console.log)
- 1: Success (prints in green)
- 2: Warning (prints in orange)
- 3: Non-critical error (prints in red)
- 4: Critical error (prints in bold red on white)

```CoffeeScript
log 'Hello world' # prints: Hello world
log 'Hello world', 1 # prints (green text): Hello world
log 'Hello world', 2 # prints (orange text): [WARN] Hello world
log 'Hello world', 3 # prints (red text): [ERROR] Hello world
log 'Hello world', 4 # prints (bold red text): [CRITICAL] Hello world
```

These error numbers aren't just for display purposes, they also define if the log should be logged to a file. By default, log levels 2 and higher (warnings and errors) get logged to a file. But you can configure this.

Also, log levels 2 and up add prefixes [WARN], [ERROR] and [CRITICAL] to the logs (so you don't have to)

### Configuration
To create the logger, call a function. Leaving all parameters empty will use the default settings, but you can of course configure the logger to do what you want:

```CoffeeScript
require('awesome-logger')(report_level, directory, disable_colours)
```

- Report_level: from which level should the logs be written to a file? In production, the default of 2 is usually the best choice. But for development you might want to set this to 0 to log everything to file.
- Directory: The directory in which your logs will be stored. In this directory, one log file will be created per day. Defaults to **__dirname/logs/**
- Disable_colours: Defaults to false. Set to true if you want to disable the use of colours in the console.

All parameters are optional.