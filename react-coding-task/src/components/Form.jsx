import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CountryDropdown from "../components/CountryDropdown";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must be a number")
    .min(7, "Phone number must be at least 7 digits")
    .required("Phone number is required"),
  dob: Yup.date().required("Date of Birth is required"),
  city: Yup.string().required("City is required"),
  district: Yup.string().required("District is required"),
  province: Yup.string().required("Province is required"),
  profilePicture: Yup.mixed()
    .required("Profile picture is required")
    .test(
      "fileType",
      "Only png files are allowed",
      (value) => !value || value.type === "image/png"
    ),
});

const Form = ({ initialValues, onSubmit }) => {
  const formik = useFormik({
    initialValues: initialValues || {
      name: "",
      email: "",
      phone: "",
      dob: "",
      city: "",
      district: "",
      province: "",
      country: "Nepal",
      profilePicture: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const profilePictureUrl = values.profilePicture
        ? URL.createObjectURL(values.profilePicture)
        : initialValues?.profilePicture || "";

      const newData = {
        ...values,
        profilePicture: profilePictureUrl,
      };

      onSubmit(newData);
      formik.resetForm();
    },
  });

  // Populate form with initial values if in edit mode
  useEffect(() => {
    if (initialValues) {
      formik.setValues(initialValues);
    }
  }, [initialValues]);

  const handleCountryChange = (e) => {
    formik.setFieldValue("country", e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    formik.setFieldValue("profilePicture", e.target.files[0]);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
    >
      {/* Form Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.errors.name && formik.touched.name && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          onChange={formik.handleChange}
          value={formik.values.dob}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.errors.dob && formik.touched.dob && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.dob}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">City</label>
        <input
          type="text"
          name="city"
          onChange={formik.handleChange}
          value={formik.values.city}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.errors.city && formik.touched.city && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">District</label>
        <input
          type="text"
          name="district"
          onChange={formik.handleChange}
          value={formik.values.district}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.errors.district && formik.touched.district && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.district}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Province</label>
        <select
          name="province"
          onChange={formik.handleChange}
          value={formik.values.province}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Province</option>
          {[...Array(7)].map((_, i) => (
            <option key={i + 1} value={`Province ${i + 1}`}>
              Province {i + 1}
            </option>
          ))}
        </select>
        {formik.errors.province && formik.touched.province && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.province}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Country</label>
        <CountryDropdown
          selectedCountry={formik.values.country}
          handleCountryChange={handleCountryChange}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Profile Picture
        </label>
        <input
          type="file"
          accept=".png"
          onChange={handleProfilePictureChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {formik.errors.profilePicture && formik.touched.profilePicture && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.profilePicture}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
