import { ApplicationStatus, FormValues } from '../interfaces';
import { State } from './store';

function isApplicationStatus(
  payload: Partial<FormValues> | Partial<ApplicationStatus>
): payload is Partial<ApplicationStatus> {
  return (
    typeof payload === 'object' &&
    ('isLoading' in payload || 'isError' in payload || 'isWarning' in payload)
  );
}

export const updateStore = (
  state: State,
  payload: Partial<FormValues> | Partial<ApplicationStatus>
) => ({
  ...state,
  ...(isApplicationStatus(payload)
    ? payload
    : {
        formData: {
          formDataStepOne: {
            ...state.formData.formDataStepOne,
            ...payload.formDataStepOne,
          },
          formDataStepTwo: {
            ...state.formData.formDataStepTwo,
            ...payload.formDataStepTwo,
          },
        },
      }),
});

export default updateStore;
