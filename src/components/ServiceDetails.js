import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import data from '../data';
import Navbar from './Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ServiceDetails() {
  // const baseURL = "localhost:8000";
  const baseURL = "http://3.109.212.159";
  // const baseURL = "http://0.0.0.0";

  const [zipFile, setZipFile] = useState(null);
  const [services] = useState(data);
  const [perlCode, setPerlCode] = useState('');
  const [result, setResult] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const { id } = useParams();
  const service = services.find((s) => s.id === parseInt(id));

  if (!service) {
    return <h2>Service not found</h2>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const fileExtension = file.name.split('.').pop().toLowerCase(); 
    console.log(fileExtension);
    console.log(file.type);
    if (file && (fileExtension === 'zip' || file.type === "application/zip" || file.type === "application/x-zip-compressed")){

    // if (file && file.type === 'application/zip') {
      setZipFile(file);
    } else {
      alert('Please select a zip file');
    }
  };

  const handleSubmit = async () => {
    if (!zipFile) {
      alert('Please select a zip file before submitting');
      return;
    }

    const formData = new FormData();
    formData.append('file', zipFile);
    const loadingToastId = toast.loading("Uploading file...");

    try {
      const response = await axios.post(`${baseURL}${service.zipApi}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      toast.update(loadingToastId, { 
        render: "File uploaded successfully! 😊", 
        type: "success", 
        isLoading: false, 
        autoClose: 2000,
        position: "top-center"
      });

      const blob = new Blob([response.data], { type: 'application/zip' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'sample_test_result.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.update(loadingToastId, { 
        render: "Error uploading file", 
        type: "error", 
        isLoading: false, 
        autoClose: 2000 
      });
      console.error('Error uploading zip file:', error);
    }
  };

  const handleSubmit1 = async () => {
    const loadingToastIdExplain = toast.loading("Fetching explanation...");

    try {
      const response = await axios.post(
       `${baseURL}${service.textApi}`,
        { code: perlCode }
      );

      setResult({ __html: response.data.explanation.replace(/\n/g, "<br>") });

      toast.update(loadingToastIdExplain, {
        render: "Code fetched successfully! 😊",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-center"
      });
    } catch (error) {
      toast.update(loadingToastIdExplain, {
        render: "Failed to fetch the info. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleInputChange1 = (event) => setInput1(event.target.value);
  const handleInputChange2 = (event) => setInput2(event.target.value);

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const loadingToastIdRepo = toast.loading("Processing request...");

    try {
      await axios.post(
       `${baseURL}${service.repoApi}`,
        { access_token: input1, repo_url: input2 },
        { headers: { 'Content-Type': 'application/json' } }
      );

      toast.update(loadingToastIdRepo, {
        render: "Code fetched successfully! Please visit your GitHub repo. 😊",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-center"
      });
    } catch (error) {
      toast.update(loadingToastIdRepo, {
        render: "Failed to fetch explanation. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error('Error uploading inputs:', error);
    }
  };

  return (
    <div className="w-100 innerpage">
      <Navbar />
      <ToastContainer />
      <div className="application custom-card mt-5 noborder">
        <img src="./images/589042351.jpg" alt="" />
        <h1>{service.name}</h1>
        <div className="container">


  {/* GitHub Repository Code Explanation */}
  <form onSubmit={handleSubmit2} className='row mt-3 align-items-center justify-content-between c_row'>
            <div className='col-md-9 offset-1'>
              <div className='d-flex w-100'>
                <div className='w-100'>
                  <label htmlFor="gitId">Type GIT Id</label>
                  <input
                    type="text"
                    className="input-element mr-3"
                    id="gitId"
                    value={input1}
                    onChange={handleInputChange1}
                    placeholder="Enter Git Id"
                  />
                </div>
                <div className='w-100'>
                  <label htmlFor="gitUrl">Type GIT Url</label>
                  <input
                    type="text"
                    className="input-element"
                    id="gitUrl"
                    value={input2}
                    onChange={handleInputChange2}
                    placeholder="Enter Git Url"
                  />
                </div>
              </div>
            </div>
            <div className='col-md-2'>
              <button type="submit" className="btn btn-primary w-50" style={{position:'relative',top:'7px'}}>Execute</button>
            </div>
          </form>

          {/* Zip File Upload */}
          <div className="row c_row">
            <div className="form-controls col-md-9 offset-1">
              <label htmlFor="formFile" className="form-label">Select a zip file</label>
              <input
                className="form-control input-element"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
              />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn w-50" onClick={handleSubmit} style={{position:'relative',top:'3px'}}>Execute</button>
            </div>

            
          </div>

          {/* Perl Code Explanation */}
          <div className="row c_row">
            <div className="col-md-9 offset-1">
              <label htmlFor="perl-code">Type code here</label>
              <textarea
                id="perl-code"
                placeholder="Type code here"
                className="input-element"
                value={perlCode}
                onChange={(e) => setPerlCode(e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn w-50" onClick={handleSubmit1}>Execute</button>
            </div>
            <div className="col-md-9 offset-1">
              <div id="result" className='' dangerouslySetInnerHTML={result} />
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
