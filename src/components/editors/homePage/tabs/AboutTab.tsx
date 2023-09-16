import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { TAboutTab } from 'src/utils/types';

type FormData = {
  about: TAboutTab;
};

const AboutTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { watch, control, handleSubmit, setValue, getValues, register } = useForm<FormData>({
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
      const data = await fetchPageBlock('home', 'about');

      setValue('about', JSON.parse(data.content) as TAboutTab);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updatePageBlock('home', 'about', { content: JSON.stringify(formData.about) });
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
