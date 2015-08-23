# code-analysis-variable-names

## What it does

Parse a given javascript source using `acorn` and outputs the frequency of
variable/parameters names used in the source. (it can parse ES6/ES2015 sources)

## Options

It has some options to adjust the output :

- `--file ./dist/app.js` [mandatory] : which file to parse
- `no-top` or `--top 10` : only display the top 10 of the most used or everything
 - default: `--top 30`
- `no-summary` : don't display the summary in the output
 - default: `false`
- `no-params` : don't take into account the function parameters
 - default: `false`

## Output

```shell
$ app --file ./react.js --top 10
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

```shell
$ app --file ./react.min.js --top 10 --no-summary
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

```
$ app --file .\jquery.js --top 10 --no-summary
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

## Note

It's written in ES2015 with some features nodejs does not handle yet (import).
So basically, you need `babel-node` to run it.
