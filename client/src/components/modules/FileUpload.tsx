import React, { useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (files: File[]) => {
    const selectedFile = files[0];

    if (selectedFile) {
      // Check if the selected file has a CSV extension
      if (selectedFile.name.endsWith('.csv')) {
        // Set the file if it's a CSV file
        setFile(selectedFile);
      } else {
        // Alert the user that only CSV files are allowed
        alert('Please select a CSV file.');
      }
    }
  };
  
  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept=".csv">
          {(props) => <Button {...props}>Upload CSV</Button>}
        </FileButton>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
}

export default FileUpload;