import 'little-state-machine';

import { ApplicationStatus, FormValues } from './interfaces';

declare module 'little-state-machine' {
  interface GlobalState extends ApplicationStatus {
    formData: FormValues;
  }
}

declare global {
  interface Window {
    radicalFormAjaxObj?: {
      nonce: string;
      ajax_url: string;
    };
  }
}
