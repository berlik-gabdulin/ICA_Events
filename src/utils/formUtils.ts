import { AppDispatch } from 'src/redux/rootReducer';
import { setStatus, submitForm, closeModal } from 'src/redux/slices/contactModalSlice';
import { NextRouter } from 'next/router';

interface IFormInput {
  [key: string]: any;
}

const collectUTMParams = (): { [key: string]: string } => {
  const utmParams = new URLSearchParams(window.location.search);
  const utmData: { [key: string]: string } = {};
  utmParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      utmData[key] = value;
    }
  });
  return utmData;
};

export const handleFormSubmit = async (
  data: IFormInput,
  dispatch: AppDispatch,
  router: NextRouter
) => {
  const utmData = collectUTMParams();
  const formData = { ...data, ...utmData };

  await dispatch(submitForm(new URLSearchParams(Object.entries(formData))));
  dispatch(setStatus('succeeded'));

  setTimeout(() => {
    dispatch(setStatus('idle'));
    dispatch(closeModal());
  }, 3000);

  router.push(
    {
      pathname: router.pathname,
      query: { ...router.query, requestSubmitted: 'true' },
    },
    undefined,
    { shallow: true }
  );
};
