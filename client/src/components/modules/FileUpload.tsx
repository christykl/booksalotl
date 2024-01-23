import React, { useEffect, useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';
import { post } from '../../utilities';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      // Check if the selected file has a CSV extension
      if (file.name.endsWith('.csv')) {
        // Set the file if it's a CSV file
        setFile(file);
      } else {
        // Alert the user that only CSV files are allowed
        alert('Please select a CSV.');
      }
    }
  };

  useEffect(() => {
    if (file) {
      post("/api/upload-csv", file).then(() => {
        console.log("file uploaded");
      })
    }
  }, [file]);

  return (
    <>
      <Group justify="center">
        <FileButton onChange={handleFileChange} accept=".csv">
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