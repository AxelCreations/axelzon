import "react-dom";

declare module "react-dom" {
  function experimental_useFormStatus(): FormStatus;
}