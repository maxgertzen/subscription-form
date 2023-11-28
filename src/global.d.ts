import "little-state-machine";
import { FormValues } from "./interfaces";

declare module "little-state-machine" {
  interface GlobalState {
    formData: FormValues;
  }
}
