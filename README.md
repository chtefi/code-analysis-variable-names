# code-analysis-variable-names

## What it does

Parse a given javascript source using `acorn` and outputs the frequency of
variable/parameters names used in the source. (it can parse ES6/ES2015 sources)

## How to install

You can install it globally or locally, globally being the easiest way to use it:
```
npm i -g code-analysis-variable-names
cavn index.js
```

## Options

It has some options to adjust the output :

- `app.js` : which file to parse
 - mandatory
- `no-top` or `--top 10` : only display the top 10 of the most used or everything
 - default: `--top 30`
- `no-summary` : don't display the summary in the output
 - default: `false`
- `no-params` : don't take into account the function parameters
 - default: `false`

## Output

For instance, here is the output for `react.js` :

```shell
$ app react.js --top 10
# Total: 2126
# Total Distinct: 884
# Top 10:
42 i
40 invariant
28 nativeEvent
25 id
25 node
24 ReactElement
24 assign
24 props
23 key
23 propName
```

On a minified file, that's not very useful:

```shell
$ app react.min.js --top 10 --no-summary
258 e
214 t
191 n
168 o
158 r
147 i
112 a
87 u
72 s
65 l
```

jQuery likes loops :

```
$ app jquery.js --top 10 --no-summary
68 i
36 elem
20 ret
20 type
18 name
13 len
13 length
12 j
11 hooks
11 index
```
