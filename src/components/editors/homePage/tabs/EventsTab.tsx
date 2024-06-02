import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import Button from 'src/components/Button';
import Input from 'src/components/Input';

type FormData = {
  events: {
    title: '';
    events: [];
    eventWebsiteBtn: '';
    eventPromoBtn: '';
    viewAllBtn: '';
  };
};

const EventsTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { handleSubmit, setValue, getValues, register } = useForm<FormData>({
    defaultValues: {
      events: {
        title: '',
        events: [],
        eventWebsiteBtn: '',
        eventPromoBtn: '',
        viewAllBtn: '',
      },
    },
  });
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('home', 'events');

      setValue('events', JSON.parse(data.content));
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);
      await updatePageBlock('home', 'events', { content: JSON.stringify(formData.events) });
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
            shrink={getValues('events.title')}
            label="Block title"
            fullWidth
            {...register('events.title')}
          />
          <Input
            shrink={getValues('events.eventWebsiteBtn')}
            label="Website Button Label"
            fullWidth
            {...register('events.eventWebsiteBtn')}
          />
          <Input
            shrink={getValues('events.eventPromoBtn')}
            label="Promo Button Label"
            fullWidth
            {...register('events.eventPromoBtn')}
          />
          <Input
            shrink={getValues('events.viewAllBtn')}
            label="All Events Button Label"
            fullWidth
            {...register('events.viewAllBtn')}
          />
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button>Save</Button>
    </form>
  );
};

export default EventsTab;
