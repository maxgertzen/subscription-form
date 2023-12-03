import 'little-state-machine';
import { FormValues, ApplicationStatus } from './interfaces';

declare module 'little-state-machine' {
  interface GlobalState extends ApplicationStatus {
    formData: FormValues;
  }
}
