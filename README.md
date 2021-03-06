# fp-ts-std

The missing pseudo-standard library for [fp-ts](https://gcanti.github.io/fp-ts/). Supports both the web and Node.

Documentation: [samhh.github.io/fp-ts-std](https://samhh.github.io/fp-ts-std/)

For DOM bindings, check out [dom-ts](https://github.com/waynevanson/dom-ts).

## Installation

The library is available on the npm registry under the same package name: [fp-ts-std](https://www.npmjs.com/package/fp-ts-std)

fp-ts, [newtype-ts](https://gcanti.github.io/newtype-ts/), and [monocle-ts](https://gcanti.github.io/monocle-ts/) are listed as peer dependencies.

Some of the more commonly needed functions from [fp-ts-contrib](https://gcanti.github.io/fp-ts-contrib/docs/modules) are duplicated here.

## Objectives

fp-ts-std aims to achieve the following objectives:

- Flesh out what fp-ts is missing
- Fill in the gaps between fp-ts and Ramda
- Wrap JS APIs to be friendly, so that you never have to interact with `null` or `undefined`, or worry about a function throwing again

## Ethos

fp-ts-std strives to adhere to the following principles:

- Strict type-safety wherever possible, with risks well documented
- All functions are curried
- Functions are data-last as a rule
- Functions are total unless explicitly prefixed with "unsafe"
- Impure functions are appropriately signed with the `IO` and `Task` types
- Lean towards Haskell naming conventions and idioms with an eye to fp-ts norms
- 100% testing coverage

## Contributing

Unreleased work is commit to the `develop` branch. `master` is the release branch and whence the documentation is generated.

All modules and exports must be annotated with JSDoc. This information is used to generate documentation. Simple, illustratory tests can also be included and will be checked during docs generation. For more information, see [docs-ts](https://github.com/gcanti/docs-ts).

