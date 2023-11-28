import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { fetchPageBlock, removeFS, updatePageBlock } from 'src/utils/api';
import useSnackbar from 'src/hooks/useSnackbar';
import { v4 as uuidv4 } from 'uuid';
import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Input from 'src/components/Input';
import { TMaterialsPage, TMaterial } from 'src/utils/types';
import { AccordionCustom } from 'src/components/globalStyles';
import FileUploader from 'src/components/upload/FileUploader';
import ImagePreview from 'src/components/ImagePreview';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatBytes } from 'src/utils/getFileSize';

const PageTab: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [toBeDeleted, setToBeDeleted] = useState<TMaterial | null>(null);
  const { register, handleSubmit, setValue, watch } = useForm<TMaterialsPage>();
  const { showError, showSuccess } = useSnackbar();
  const materials = watch('materials') || [];

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPageBlock('materials', 'page');
      const parsedData = JSON.parse(data.content);
      setValue('materials', parsedData.materials);
      setValue('image', parsedData.image);
      setLoading(false);
    };

    fetchData();
  }, [setValue]);

  const handleSave: SubmitHandler<TMaterialsPage> = async (formData) => {
    try {
      await updatePageBlock(
        'materials',
        'page',
        { content: JSON.stringify(formData) },
        'media/materials'
      );
      showSuccess('Successfully saved!');
    } catch (error) {
      showError('An error occurred');
    }
  };

  const handleDelete = async (material: TMaterial) => {
    await removeFS({ fileUrl: `${material.link}` });

    const updatedMaterials = materials.filter((item) => item.id !== material.id);
    setValue('materials', updatedMaterials);
    setOpenDialog(false);
    setToBeDeleted(null);
    handleSubmit(handleSave)();
  };

  const addNewMaterial = () => {
    const updatedMaterials = [
      ...materials,
      {
        id: uuidv4(),
        link: '',
        name: '',
        size: '',
        format: '',
        order: '',
      },
    ];
    setValue('materials', updatedMaterials as TMaterial[]);
  };

  const onUpload = (index: number) => async (data: any) => {
    setValue(`materials.${index}.name`, data[0].name.replace('material_', '').split('_').join(' '));
    setValue(`materials.${index}.size`, formatBytes(data[0].size));
    setValue(`materials.${index}.format`, data[0].type);
    setValue(`materials.${index}.order`, data[0].order);
  };

  return !loading ? (
    <form onSubmit={handleSubmit(handleSave)}>
      <Box style={{ marginBottom: '30px' }}>
        <FileUploader inputName="image" setValue={setValue} folder="materials" prefix="preview" />
        <ImagePreview src={watch('image')} alt="Header Background" height={200} />
        <Input
          label="Image"
          shrink={watch('image')}
          fullWidth
          {...register('image', { required: 'This field is required' })}
        />
      </Box>
      <Box style={{ marginBottom: '30px' }}>
        {materials.map((material, index) => (
          <AccordionCustom key={material.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{material.name || 'New Material'}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FileUploader
                inputName={`materials[${index}].link`}
                setValue={setValue}
                folder="materials"
                prefix="material"
                preview={false}
                onUpload={onUpload(index)}
              />
              {watch(`materials.${index}.link`) ? (
                <Box display="flex" flexDirection="column" gap={2}>
                  <Input
                    label="Name"
                    {...register(`materials.${index}.name`)}
                    fullWidth
                    shrink={`materials.${index}.name`}
                  />
                  <Input
                    label="Link"
                    {...register(`materials.${index}.link`)}
                    fullWidth
                    shrink={`materials.${index}.link`}
                  />
                  <Input
                    label="Size (bytes)"
                    {...register(`materials.${index}.size`)}
                    fullWidth
                    shrink={`materials.${index}.size`}
                    disabled
                  />
                  <Input
                    label="Format"
                    {...register(`materials.${index}.format`)}
                    fullWidth
                    shrink={`materials.${index}.format`}
                  />
                  <Input
                    label="Order"
                    {...register(`materials.${index}.order`)}
                    fullWidth
                    shrink={`materials.${index}.order`}
                  />
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setOpenDialog(true);
                      setToBeDeleted(material);
                    }}
                  >
                    Delete material <DeleteIcon />
                  </Button>
                </Box>
              ) : null}
            </AccordionDetails>
          </AccordionCustom>
        ))}
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={addNewMaterial}
        style={{ marginRight: '15px' }}
      >
        Add New +
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{'Are you sure you want to delete this material?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (toBeDeleted !== null) handleDelete(toBeDeleted);
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  ) : (
    <p>Loading...</p>
  );
};

export default PageTab;
