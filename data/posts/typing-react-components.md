---
title: How to type Function Components in React with TypeScript
date: 2022-12-29 11:10 UTC+1
description: >-
  One of TypeScript's biggest strengths is providing autocompletion and
  typechecking in IDEs. Properly typing components makes writing JSX a lot easier
  and can avoid many common errors.
tags:
  - TypeScript
  - React
  - Guide
---

# How to type Function Components in React with TypeScript

One of TypeScript's biggest strengths is providing autocompletion and typechecking in IDEs. Properly typing components makes writing JSX a lot easier and can avoid many common errors.

## What is a component?

In React a function component is any function that takes a single parameter - an object containing properties - and returns either ReactNodes or null. If your IDE displays the inferred return type you will often see `Element | null`.

To attach a type you can either use `React.FC` (or `import type { FC } from "react"` if the React namespace is not available) or simply attach your Props type directly.

```tsx
const Columns: React.FC<MyProps> = function ({ children }) {
  return <div className="columns">{children}</div>;
};

// or

function Columns({ children }: MyProps) {
  return <div className="columns">{children}</div>;
}
```

## The `children` property

The `children` property represents the equivalent to a Component's innerHTML. React provides the type `PropsWithChildren` an object type which contains all valid types in an optional children property.

```ts
interface MyProps extends React.PropsWithChildren {
  someProp: string;
}

// or

type MyProps = { someProp: string } & React.PropsWithChildren;
// Note I'll stop showing both interface and type now, you can always use whichever you prefer or even use Union Types.
```

If your Component requires children to be present you can make yourself a utility type based on `PropsWithChildren` and use it in your props type:

```ts
type RequiredChildren = Exclude<
  React.PropsWithChildren["children"],
  undefined | boolean | null
>;

interface MyProps {
  children: RequiredChildren;
  someProp: string;
}
```

Note the lack of `?` at `children: RequiredChildren`. As a rule of thumb all properties that do not have one must be explicitly set in JSX, even if undefined is an allowed value.

## Building a Type representing an HTML Element

For building Types representing HTML Elements React again provides as a helpful type: `ComponentProps`. This type takes a generic argument with a string of which HTML Element you want to represent and gives you the corresponding type, (which includes `children` where appropriate!) representing this Element.

```tsx
const StyledLink: React.FC<React.ComponentProps<"a">> = ({
  children,
  ...props
}) => {
  return (
    <a {...props} className="link-style">
      {children}
    </a>
  );
};
```

You can also use [Pick](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) and [Omit](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) to further narrow the types you want to be available on your Component or replace properties with different types:

```tsx
interface StyledLinkProps extends Omit<React.ComponentProps<"a">, "className"> {
  className?: string[] | string;
}

const StyledLink: React.FC<StyledLinkProps> = ({
  children,
  className = [], // won't be undefined now
  ...props
}) => {
  const classNames: string = ["link-style", className].flat().join(" ");

  return (
    <a {...props} className={classNames}>
      {children}
    </a>
  );
};
```

### A Note on spread in JSX

In the above examples `{...props}` is intentionally the first property/properties in JSX. As with objects the order of spread and keys matters. Putting `{...props}` after certain properties will in theory allow `props` to override your values, which may or may not be a feature you want. If you do not want this behaviour always spread first, then set the other properties.

### A note on the Generic Argument

If you would like to build a utility type based on `ComponentProps` you will need to use the following type (as string is not narrow enough):

```ts
import type { Class } from "classcat";

export type CC = { className?: Class };
export type ComponentPropsCC<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = Omit<React.ComponentProps<T>, "className"> & CC;
```

## Properties to represent CSS Custom Properties

Using the `CSSProperties` type there are two approaches to using [Custom Properties]: The `as` keyword to override typechecks or extending the type.

```tsx
interface ColoredLinkProps extends React.PropsWithChildren {
  href: string;
  hover: string;
  color?: string; // This one's optional!
}

interface ColoredLinkStyles extends React.CSSProperties {
  "--hover": string;
  "--color"?: string;
}

function ColoredLink({ children, href, hover, color }: ColoredLinkProps) {
  const style: ColoredLinkStyles = {
    "--hover": hover
  };
  // handle optional properties with if
  if (color) style["--color"] = color;

  return (
    <a href={href} className="fancy-link" style={style}>
      {children}
    </a>
  );
}
```

Generally it is recommend to extend the CSSProperties with your variables to let TypeScript properly typecheck everything. If you are sure that you are only setting values to string you can simply use `as React.CSSProperties` on the object declaration.

## Representing Props of other Components

TypeScript's [Parameters] utility type allows you to represent properties of other components. You can build a custom utility type to pick a property or use Parameters directly:

```ts
type PickProp<
  C extends (props: {}) => any,
  P extends keyof Parameters<C>[0]
> = Pick<Parameters<C>[0], P>;

// Example:
interface CloseButtonProps extends PickProp<typeof Button, "onClick"> {
  // includes onClick from Button
}

// same as:
interface CloseButtonProps {
  onClick?: Parameters<typeof Button>[0]["onClick"];
}
```

Note: You can also combine [Parameters] with [Omit] or [Partial] or use different property names on each component. Use [Exclude] to turn optional properties into required ones:

```ts
interface CloseButtonProps {
  handleClose: Exclude<Parameters<typeof Button>[0]["onClick"], undefined>;
}
```

[custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
[pick]: https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
[omit]: https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
[partial]: https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
[parameters]: https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype
[exclude]: https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers
