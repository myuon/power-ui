import React from "react";

type IdentityOnObject<T> = Pick<T, keyof T>;

export interface ComponentWithAs<T extends React.ElementType, P> {
  <E extends React.ElementType = T>(
    props: E extends React.ElementType
      ? IdentityOnObject<
          JSX.LibraryManagedAttributes<E, React.ComponentPropsWithRef<E>> & P
        > & {
          as?: E;
        }
      : never,
    ref: any
  ): JSX.Element;
}

export function forwardRef<P, T extends React.ElementType>(
  component: (
    props: Omit<React.ComponentProps<T>, "ref"> & {
      as?: React.ElementType;
    } & React.PropsWithChildren<P>,
    ref: React.Ref<any>
  ) => React.ReactElement | null
) {
  return (React.forwardRef(component as any) as unknown) as ComponentWithAs<
    T,
    P
  >;
}

/*
// eslint-disable-next-line react/display-name
export const Button = forwardRef<{ disable: boolean }, "button">(
  (props, ref) => {
    const { as: Component = "button", ...rest } = props;
    return <Component ref={ref} {...rest} />;
  }
);

export const fb: JSX.Element = React.createElement(Button, {
  href: "aaa",
  disable: false,
});

// export const b = <Button as="button" href="aaa" disable={false} />;
export const b2 = <Button as="a" href="foo" disable={true} />;
// export const b3 = <Button href="aaa" disable={true} />;
export const b4 = <Button disable={true} onClick={() => 10} />;
*/
