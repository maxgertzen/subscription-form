import React from "react";
import {
  useFormContext,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

type WithFormDataBindingProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
};

type ExtendedProps = {
  onBlur?: React.FocusEventHandler; // Extend with onBlur event handler
};

const withFormDataBinding = <
  TFieldValues extends FieldValues,
  TProps extends ExtendedProps
>(
  WrappedComponent: React.ComponentType<
    TProps & WithFormDataBindingProps<TFieldValues>
  >
) => {
  return (props: TProps & WithFormDataBindingProps<TFieldValues>) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<TFieldValues>();
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur: React.FocusEventHandler = (event) => {
      setIsFocused(false);
      if (props.onBlur && typeof props.onBlur === "function") {
        props.onBlur(event);
      }
    };

    const { ref, ...restRegister } = register(props.name, props.rules);

    const componentProps = {
      ...props,
      ...restRegister,
      onFocus: handleFocus,
      onBlur: handleBlur,
      ref,
      isFocused,
    };

    const errorMessage = errors[props.name]?.message as string | undefined;

    return (
      <>
        <WrappedComponent {...componentProps} />
        {errorMessage && <p>{errorMessage}</p>}
      </>
    );
  };
};

export default withFormDataBinding;
