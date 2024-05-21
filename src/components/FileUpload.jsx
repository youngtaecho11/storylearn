import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

const FileUpload = ({selectedFile, setSelectedFile}) => {
    const [uploadStatus, setUploadStatus] = useState('');
    const [dragOver, setDragOver] = useState(false);

    const handleFileChange = (file) => {

        if (file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            setUploadStatus('PDF 파일을 끌어다 놓으세요.');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', selectedFile);

        try {
            setUploadStatus('Uploading...');
            const response = await axios.post('YOUR_BACKEND_ENDPOINT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setUploadStatus('File uploaded successfully!');
                setSelectedFile(null); // 업로드 후 파일 초기화
            } else {
                setUploadStatus(`Upload failed with status: ${response.status}`);
            }
        } catch (error) {
            setUploadStatus('Upload failed with error: ' + error.message);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };
    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragOver(false);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files[0];
        handleFileChange(file);
    };
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        handleFileChange(file);
    };
    const handleFileDelete = () => {
        setSelectedFile(null);
    };
    return (
        <div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput').click()}
                style={{
                    border: dragOver ? '2px dashed #000' : '2px dashed #bbb',
                    padding: '20px',
                    borderRadius: '5px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    minHeight: '65px',
                }}
            >
                <input
                    type="file"
                    id="fileInput"
                    accept="application/pdf"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                />
                {selectedFile ? (
                    <div>
                        <p>{selectedFile.name}</p>
                        <button onClick={handleFileDelete}>Delete</button>
                    </div>
                ) : (
                    <p>파일을 끌어다 놓거나 클릭하세요.</p>
                )}
            </div>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};
export default FileUpload;

FileUpload.propTypes = {
    selectedFile: PropTypes.object,
    setSelectedFile: PropTypes.func,
}