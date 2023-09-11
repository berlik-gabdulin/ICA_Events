import React from 'react';
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { Box } from '@mui/material';

type CustomEditorProps = {
  name: string;
  watch: any;
  control: any;
  style?: any;
};

const CustomEditor: React.FC<CustomEditorProps> = ({ name, control, watch, style }) => (
  <Box style={style}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Editor
          apiKey="7og0noxauelc4a2y2ubsr1jx65l5fx7ope7cfildurp7h1io"
          onEditorChange={(content, editor) => {
            field.onChange(content); // Обновляем значение в форме
          }}
          value={watch(name)} // Устанавливаем начальное значение
          init={{
            height: 200,
            menubar: false,
            toolbar:
              'undo redo | formatselect | ' +
              'bold italic underline backcolor link | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            plugins: 'link',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          }}
        />
      )}
    />
  </Box>
);
export default CustomEditor;
