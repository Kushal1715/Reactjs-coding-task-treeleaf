import React, { useState, useEffect } from "react";
import PaginationTable from "../components/PaginationTable";
import Form from "../components/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormPage = () => {
  const [formData, setFormData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Load data from localStorage when the component mounts
  useEffect(() => {
    console.log("Loading data from localStorage");
    const storedData = JSON.parse(localStorage.getItem("formData")) || [];
    console.log("Loaded data:", storedData);
    setFormData(storedData);
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("formData", JSON.stringify(data));
    console.log("Data saved to localStorage:", data);
  };

  const handleDelete = (index) => {
    const updatedData = formData.filter((_, i) => i !== index);
    setFormData(updatedData);
    saveToLocalStorage(updatedData);
    toast("Data is deleted");

    console.log("Deleted item at index:", index);
  };

  const handleEdit = (index) => {
    const profileToEdit = formData[index];
    setSelectedProfile(profileToEdit);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Editing profile:", profileToEdit);
  };

  const handleSubmit = (newData) => {
    let updatedData;

    if (selectedProfile) {
      updatedData = formData.map((profile) =>
        profile.email === selectedProfile.email ? newData : profile
      );
      setSelectedProfile(null);
      console.log("Updated profile:", newData);
      toast("Data is updated");
    } else {
      updatedData = [...formData, newData];
      console.log("Added new profile:", newData);
      toast("Data is added");
    }

    setFormData(updatedData);
    saveToLocalStorage(updatedData);
  };

  return (
    <div>
      <ToastContainer />
      <Form initialValues={selectedProfile} onSubmit={handleSubmit} />
      <PaginationTable
        formData={formData}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default FormPage;
