// components/editors/homePage/tabs/AboutTab.tsx

import { useState, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchHomePageBlock, updateHomePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import Input from 'src/components/Input/Input';
import { TAboutTab } from 'src/utils/types';

type FormData = {
  about: TAboutTab;
};

const AboutTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    getValues,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      about: {
        text: '',
        bullets: {
          countries: '7',
          events: '50',
          visitors: '100,000',
          sqm: '50,000',
        },
      },
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHomePageBlock('about');
      console.log(data.content);
      setValue('about', JSON.parse(data.content) as TAboutTab);
      setLoading(false);
    };

    console.log(getValues());

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updateHomePageBlock('about', JSON.stringify(formData.about));
      showSuccess('Successfully saved!');
      setLoading(false);
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          <CustomEditor
            name="about.text"
            watch={watch}
            control={control}
            style={{ marginBottom: '30px' }}
          />
          {Object.keys(watch('about.bullets')).map((bullet) => (
            <Input
              shrink={getValues(`about.bullets.${bullet}`)}
              label={bullet}
              {...register(`about.bullets.${bullet}`)}
              disabled={!watch(`about.bullets.${bullet}`)}
              key={bullet}
            />
          ))}
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button>Save</Button>
    </form>
  );
};

export default AboutTab;
