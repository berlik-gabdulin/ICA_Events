import React from 'react';
import { Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import { Box } from '@mui/material';
import { FONT_PRIMARY } from 'src/theme/typography';

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
            field.onChange(content);
          }}
          value={watch(name)}
          init={{
            height: 200,
            menubar: false,
            toolbar:
              'undo redo | h1 h2 h3 h4 h5| bold italic underline backcolor link | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
            plugins: ['link'],
            content_style: `body { font-family: ${FONT_PRIMARY}; font-size: 1rem; font-weight: 300; }`,
            setup: function (editor) {
              editor.ui.registry.addButton('h1', {
                text: 'H1',
                onAction: function () {
                  editor.formatter.apply('h1');
                },
              });
              editor.ui.registry.addButton('h2', {
                text: 'H2',
                onAction: function () {
                  editor.formatter.apply('h2');
                },
              });
              editor.ui.registry.addButton('h3', {
                text: 'H3',
                onAction: function () {
                  editor.formatter.apply('h3');
                },
              });
              editor.ui.registry.addButton('h4', {
                text: 'H4',
                onAction: function () {
                  editor.formatter.apply('h4');
                },
              });
              editor.ui.registry.addButton('h5', {
                text: 'H5',
                onAction: function () {
                  editor.formatter.apply('h5');
                },
              });
            },
          }}
        />
      )}
    />
  </Box>
);

export default CustomEditor;
