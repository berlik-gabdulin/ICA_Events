import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

type FormData = {
  location: {
    title: string;
  };
};

const LocationTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { handleSubmit, setValue, getValues, register } = useForm<FormData>({
    defaultValues: {
      location: {
        title: '',
      },
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('home', 'location');

      setValue('location.title', JSON.parse(data.content).title);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updatePageBlock('home', 'location', { content: JSON.stringify(formData.location) });
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
          <Input
            shrink={getValues('location.title')}
            label="Block title"
            fullWidth
            {...register('location.title')}
          />
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button>Save</Button>
    </form>
  );
};

export default LocationTab;
