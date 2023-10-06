import React from 'react'
import Papa from 'papaparse'

const FileUpload: React.FC<{ onUpload: (data: any[]) => void }> = ({
  onUpload,
}) => {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0]

      Papa.parse(selectedFile, {
        complete: (result: any) => {
          if (result.data.length) {
            onUpload(result.data)
          }
        },
        header: true,
      })
    }
  }

  return (
    <div>
      <p>Please, upload a CSV file</p>  
      <input type='file' accept='.csv' onChange={handleFileChange} />
    </div>
  )
}

export default FileUpload
