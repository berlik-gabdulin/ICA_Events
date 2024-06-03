import { useState, useEffect } from 'react';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import CustomEditor from 'src/components/CustomEditor';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { TAboutTab, Bullet } from 'src/utils/types';

type FormData = {
  about: Omit<TAboutTab, 'bullets'> & { bullets: Bullet[] };
};

const AboutTab: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const { watch, control, handleSubmit, setValue, getValues, register } = useForm<FormData>({
    defaultValues: {
      about: {
        title: '',
        text: '',
        bullets: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'about.bullets',
  });

  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('home', 'about');
      const aboutData = JSON.parse(data.content) as TAboutTab;

      // Transform bullets to array
      const bulletsArray = Object.entries(aboutData.bullets).map(([key, bullet]) => ({
        key,
        value: bullet.value,
        order: bullet.order,
      }));

      setValue('about', { ...aboutData, bullets: bulletsArray });
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<FormData> = async (formData) => {
    try {
      setLoading(true);

      // Transform bullets back to object
      const bulletsObject = formData.about.bullets.reduce((acc, bullet) => {
        acc[bullet.key] = { value: bullet.value, order: bullet.order };
        return acc;
      }, {} as Record<string, { value: string; order: number }>);

      await updatePageBlock('home', 'about', {
        content: JSON.stringify({ ...formData.about, bullets: bulletsObject }),
      });
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
            shrink={getValues('about.title')}
            label="Block title"
            fullWidth
            {...register('about.title')}
          />
          <CustomEditor
            name="about.text"
            watch={watch}
            control={control}
            style={{ marginBottom: '30px' }}
          />
          {fields.map((field, index) => (
            <div key={field.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <Input
                shrink={getValues(`about.bullets.${index}.key`)}
                label="Key"
                fullWidth
                {...register(`about.bullets.${index}.key`)}
              />
              <Input
                shrink={getValues(`about.bullets.${index}.value`)}
                label="Value"
                fullWidth
                {...register(`about.bullets.${index}.value`)}
              />
              <Input
                shrink={getValues(`about.bullets.${index}.order`).toString()}
                label="Order"
                type="number"
                fullWidth
                {...register(`about.bullets.${index}.order`)}
              />
              <Button type="button" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ key: '', value: '', order: fields.length + 1 })}
          >
            Add Bullet
          </Button>
        </>
      ) : (
        <p>Loading</p>
      )}
      <Button>Save</Button>
    </form>
  );
};

export default AboutTab;
