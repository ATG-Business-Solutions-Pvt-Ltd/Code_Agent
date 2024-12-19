import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import data from "../data";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";
function ServiceDetails({ serviceId }) {
  const baseURL = "http://10.201.150.168";
  // const baseURL = "http://127.0.0.1"; 
  // const baseURL = "http://3.109.212.159"; 

  const startConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const [zipFile, setZipFile] = useState(null);
  const [services] = useState(data);
  const [perlCode, setPerlCode] = useState("");
  const [result, setResult] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");


  const [responseReceived, setResponseReceived] = useState(false);
  const { id } = useParams();
  const service = services.find((s) => s.id === parseInt(serviceId));

  const handleCopy = () => {
    const resultDiv = document.getElementById("result");
    if (resultDiv) {
      const range = document.createRange();
      range.selectNodeContents(resultDiv);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand("copy");
        alert("Code copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
      selection.removeAllRanges();
    }
  };

  if (!service) {
    return <h2>Service not found</h2>;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase(); // Get the file extension
    console.log(fileExtension); 
    console.log(file.type);
    if (file && (fileExtension === 'zip' || file.type === "application/zip" || file.type === "application/x-zip-compressed")){
      setZipFile(file);
    } else {
      alert("Please select a zip file");
    }
  };

  const handleSubmit = async () => {
    if (!zipFile) {
      alert("Please select a zip file before submitting");
      return;
    }

    const formData = new FormData();
    formData.append("file", zipFile);
    const loadingToastId = toast.loading("Uploading file...");

    try {
      const response = await axios.post(
        `${baseURL}${service.zipApi}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      startConfetti();
      toast.update(loadingToastId, {
        render: "File uploaded successfully! 😊",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        position: "top-center",
      });

      const blob = new Blob([response.data], { type: "application/zip" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "sample_test_result.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.update(loadingToastId, {
        render: "Error uploading file",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      console.error("Error uploading zip file:", error);
    }
  };

  const handleSubmit1 = async () => {
    const loadingToastIdExplain = toast.loading("Fetching explanation...");

    try {
      const response = await axios.post(`${baseURL}${service.textApi}`, {
        code: perlCode,
      });

      const dynamicKey = Object.keys(response.data).find(
        (key) => response.data[key] && typeof response.data[key] === "string"
      );

      // setResult({ __html: response.data.explanation.replace(/\n/g, "<br>") });
      setResult({ __html: response.data[dynamicKey].replace(/\n/g, "<br>") });

      setTimeout(() => {
       
        setResponseReceived(true); // Set response received
      }, 1000); // Simulate delay
      const handleCopy = () => {
        // Select the content of the #result div
        const resultDiv = document.getElementById("result");
        if (resultDiv) {
          const range = document.createRange();
          range.selectNodeContents(resultDiv);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);

          try {
            // Execute copy command
            document.execCommand("copy");
            alert("Code copied to clipboard!");
          } catch (err) {
            console.error("Failed to copy text: ", err);
          }

          // Cleanup selection
          selection.removeAllRanges();
        }
      };

      startConfetti();
      toast.update(loadingToastIdExplain, {
        render: "Code fetched successfully! 😊",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-center",
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
        { headers: { "Content-Type": "application/json" } }
      );
      startConfetti();
      toast.update(loadingToastIdRepo, {
        render: "Code fetched successfully! Please visit your GitHub repo. 😊",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        position: "top-center",
      });
    } catch (error) {
      toast.update(loadingToastIdRepo, {
        render: "Failed to fetch explanation. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error("Error uploading inputs:", error);
    }
  };

  return (
    <div className="w-100 innerpage">
      {/* <Navbar /> */}
      <ToastContainer />
      <div className="application custom-card mt-5 noborder">
        {/* <img src="./images/589042351.jpg" alt="" />
        <h1>{service.name}</h1> */}
        <div className="container">
          <h1 className="serviceName">{service.name}</h1>

          {/* GitHub Repository Code Explanation */}
          <form
            onSubmit={handleSubmit2}
            className="row mt-3 align-items-center justify-content-between c_row"
          >
            <div className="col-md-12">
              <div className="d-flex w-100">
                <div className="w-100">
                  <label htmlFor="gitId">Type GIT Id</label>
                  <input
                    type="text"
                    className="input-element mr-3 input_width"
                    id="gitId"
                    value={input1}
                    onChange={handleInputChange1}
                    placeholder="Enter Git Id"
                    required
                  />
                </div>
                <div className="w-100">
                  <label htmlFor="gitUrl">Type GIT Url</label>
                  <input
                    type="text"
                    className="input-element"
                    id="gitUrl"
                    value={input2}
                    onChange={handleInputChange2}
                    placeholder="Enter Git Url"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 offset-4">
              {/* <button
                type="submit"
                className="btn btn-primary "
                style={{ position: "relative", top: "7px" }}
              >
                Execute
              </button> */}
              <div class="button-container">
                <button id="button-conf" className="btn btn-primary">
                  <i id="icon" class="fa-solid fa-play"></i>
                  <span id="text" class="text">
                    Execute
                  </span>
                </button>
              </div>
            </div>
          </form>

          {/* Zip File Upload */}
          <div className="row c_row">
            <div className="form-controls col-md-12">
              <label htmlFor="formFile" className="form-label">
                Select a zip file
              </label>
              <input
                className="form-control input-element"
                type="file"
                accept=".zip"
                onChange={handleFileChange}
                required
              />
            </div>
            <div cl4ssName="col-md-3 offset-4">
              {/* <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                style={{ position: "relative", top: "3px" }}
              >
                Execute
              </button> */}
              <div class="button-container">
                <button
                  id="button-conf"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  <i id="icon" class="fa-solid fa-play"></i>
                  <span id="text" class="text">
                    Execute
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Perl Code Explanation */}
          <div className="row c_row">
            <div className="col-md-6">
              <label htmlFor="perl-code">Type code here</label>
              <textarea
                id="perl-code"
                placeholder="Type code here"
                className="input-element"
                value={perlCode}
                onChange={(e) => setPerlCode(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 relative">
              {/* <label htmlFor="result"> Result</label> */}
              <span
                className="copy"
                onClick={handleCopy}
                style={{
                  cursor: responseReceived ? "pointer" : "not-allowed",
                  opacity: responseReceived ? 1 : 0.2,
                }}
              >
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg> Copy code
              </span>

              <div id="result" className="" dangerouslySetInnerHTML={result} />
            </div>
            <div cl4ssName="col-md-3 offset-4">
              <div class="button-container">
                <button
                  id="button-conf"
                  onClick={handleSubmit1}
                  className="btn btn-primary"
                >
                  <i id="icon" class="fa-solid fa-play"></i>
                  <span id="text" class="text">
                    Execute
                  </span>
                </button>
              </div>
              {/* <button
  type="button"
  className="btn btn-primary"
  onClick={handleSubmit1}
>
  Execute
</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
