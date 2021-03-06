import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import Form from './Form';
import appContext from '../context/app/appContext';
import authContext from '../context/auth/authContext';

const Dropzone = () => {
  const { showAlert, uploadFile, createLink, loading } = useContext(appContext);
  const { user } = useContext(authContext);
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    uploadFile(formData, file.path);
  });
  const onDropRejected = () => {
    showAlert(
      'File rejected, create a free account to allow uploads larger than 1MB'
    );
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: 1000000,
  });
  const files = acceptedFiles.map((file) => {
    const { lastModified, path, size } = file;
    return (
      <li
        className='bg-white flex-1 p-3 mb-4 shadow-lg rounded'
        key={lastModified}
      >
        <p className='font-bold text-xl'>{path}</p>
        <p className='text-sm text-gray-500'>
          {(size / Math.pow(1024, 2)).toFixed(2)} MB
        </p>
      </li>
    );
  });
  return (
    <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4'>
      {acceptedFiles.length ? (
        <div className='mt-10 w-full'>
          <h4 className='text-2xl font-bold text-center mb-4'>Files</h4>
          <ul>{files}</ul>
          {user && <Form />}
          {loading ? (
            <p className='my-10 text-center text-gray-600'>Uploading file...</p>
          ) : (
            <button
              className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
              type='button'
              onClick={createLink}
            >
              Create Link
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
          <input className='h-100 ' {...getInputProps()} />
          {isDragActive ? (
            <p className='text-2xl text-center text-gray-600'>Drop here</p>
          ) : (
            <div className='text-center'>
              <p className='text-2xl text-center text-gray-600'>
                Grab a file and drag it here
              </p>
              <button
                className='bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800'
                type='button'
              >
                Select files to upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
