import "react-dom";

declare module "react-dom" {
  function useFormStatus(): FormStatus;
}