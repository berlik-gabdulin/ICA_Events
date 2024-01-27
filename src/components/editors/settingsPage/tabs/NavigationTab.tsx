import React, { Fragment, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, updatePageBlock } from 'src/utils/api';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { TNavigation } from 'src/utils/types';
import useSnackbar from 'src/hooks/useSnackbar';

const NavigationTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useSnackbar();
  const { register, handleSubmit, setValue, watch } = useForm<{ nav: TNavigation }>({
    defaultValues: {
      nav: [],
    },
  });

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const data = await fetchPageBlock('settings', 'navigation');
        setValue('nav', JSON.parse(data.content).nav);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNavigation();
  }, [setValue]);

  const handleSave: SubmitHandler<{ nav: TNavigation }> = async (formData) => {
    try {
      await updatePageBlock('settings', 'navigation', { content: JSON.stringify(formData) }, '#');
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      {!loading ? (
        <>
          {watch('nav').map((item, index) => (
            <Fragment key={item.path}>
              <Box key={index} display="flex" gap={2}>
                <Input label={item.name} value={item.label} {...register(`nav.${index}.label`)} />
                <Input label="Path" value={item.path} disabled />
                <Input label="Order" type="number" {...register(`nav.${index}.order`)} />
                <FormControlLabel
                  control={
                    <Switch {...register(`nav.${index}.isActive`)} checked={item.isActive} />
                  }
                  label={item.isActive ? 'Active' : 'Inactive'}
                  style={{ marginBottom: 15 }}
                />
              </Box>
              {item.subMenu && item.subMenu.length > 0 && (
                <div>
                  {item.subMenu.map((subItem, subIndex) => (
                    <Box key={subIndex} display="flex" gap={2}>
                      <Input
                        label={subItem.name}
                        value={subItem.label}
                        {...register(`nav.${index}.subMenu.${subIndex}.label` as any)}
                      />
                      <Input label="Sub-Path" value={subItem.path} disabled />
                      <Input
                        label="Sub-Order"
                        type="number"
                        {...register(`nav.${index}.subMenu.${subIndex}.order` as any)}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            {...register(`nav.${index}.subMenu.${subIndex}.isActive` as any)}
                            checked={subItem.isActive}
                          />
                        }
                        label={subItem.isActive ? 'Sub-Active' : 'Sub-Inactive'}
                        style={{ marginBottom: 15 }}
                      />
                    </Box>
                  ))}
                </div>
              )}
            </Fragment>
          ))}
          <Button type="submit">Save</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </form>
  );
};

export default NavigationTab;
