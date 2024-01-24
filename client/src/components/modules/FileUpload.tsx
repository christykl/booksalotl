import React, { useEffect, useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';
import { post } from '../../utilities';


// const csv = require('csv-parser')
// const fs = require('fs')
// const results: any[] = [];


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
      post("/api/upload-csv", file).then((file) => {
        console.log("file uploaded");
        console.log(file.content)
      })
    }
  }, [file]);

  // const parseCSV = (file) => {
  //   fs.createReadStream(file)
  //     .pipe(csv([
  //       "Book Id","Title","Author","Author l-f","Additional Authors","ISBN","ISBN13","My Rating","Average Rating","Publisher","Binding","Number of Pages","Year Published","Original Publication Year","Date Read","Date Added","Bookshelves","Bookshelves with positions","Exclusive Shelf","My Review","Spoiler","Private Notes","Read Count","Owned Copies"]))
  //     .on('data', (data) => results.push(data))
  //     .on('end', () => {
  //       console.log(results);
  // });

  // }

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