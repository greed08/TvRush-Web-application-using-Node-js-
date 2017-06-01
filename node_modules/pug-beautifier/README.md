# Pug(was Jade) Beautify CLI tool.

_Note :_ This program depends on [pug-beautify](https://github.com/vingorius/pug-beautify) module.

## Usage

```
$ pug-beautifier [options] [file]
```

Beautify `<file>`. If no file is specified,
input is taken from standard input and output to standard output.

### Options

```
-h, --help                  output usage information
-V, --version               output the version number
-s, --fillspace <tab_size>  fill <tab_size> spaces rather than tab, default tab.
-d, --omitdiv,              omit div tag, default not.
-o,--overwrite,             overwrite input file, default stdout.
```

### Examples

Beautify `foo.jade` to stdout:

```
$ pug-beautifier foo.jade
```
or
```
$ cat foo.jade | pug-beautifier
```

Beautify `foo.jade` and overwrite it:

```
$ pug-beautifier -o foo.jade
```

Beautify `foo.jade` with 4 spaces, omit 'div' tag :

```
$ pug-beautifier -d -s 4 foo.jade
```


## Installation

    npm install pug-beautifier -g

## License

MIT
