import React, { useState } from "react";
import { submitPartnerApplication } from "../api/partnerProgram";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    city: "",
    businessType: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    existingClients: "",
    joinAs: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      contactInformation: {
        fullName: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
      },
      companyInformation: {
        companyName: formData.companyName,
        website: formData.website || "",
        country: formData.country,
        city: formData.city,
      },
      businessDetails: {
        businessType: formData.businessType,
        yearsInBusiness: formData.yearsInBusiness,
        numberOfEmployees: formData.numberOfEmployees,
        existingClients: Number(formData.existingClients) || 0,
      },
      partnershipDetails: {
        joinAs: formData.joinAs,
        motivation: formData.message,
      },
      source: "tally",
    };

    try {
      await submitPartnerApplication(payload);
      alert("Application submitted successfully!");
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        city: "",
        businessType: "",
        yearsInBusiness: "",
        numberOfEmployees: "",
        existingClients: "",
        joinAs: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Partner application failed:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Submission failed. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-black rounded-3xl p-10 shadow-2xl">

      <h2 className="text-2xl font-semibold mb-8 text-center">
        Partner Application Form
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        {/* Company Info */}
        <input
          name="companyName"
          placeholder="Company Name *"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg col-span-2 outline-none focus:border-blue-400"
        />
        <input
          name="contactPerson"
          placeholder="Contact Person *"
          value={formData.contactPerson}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg col-span-2 outline-none focus:border-blue-400"
        />

        <input
          name="email"
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        />
        <input
          name="phone"
          placeholder="Phone *"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        />

        <input
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="border text-sm p-3 rounded-lg col-span-2 outline-none focus:border-blue-400"
        />

        <input
          name="country"
          placeholder="Country *"
          value={formData.country}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        />
        <input
          name="city"
          placeholder="City *"
          value={formData.city}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        />

        {/* Business Type */}
        <select
          name="businessType"
          value={formData.businessType}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg col-span-2 outline-none focus:border-blue-400"
        >
          <option value="">Business Type *</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Consulting">Consulting</option>
          <option value="Reseller">Reseller</option>
          <option value="Other">Other</option>
        </select>

        {/* Years in Business */}
        <select
          name="yearsInBusiness"
          value={formData.yearsInBusiness}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        >
          <option value="">Years in Business *</option>
          <option value="0-1">0–1 years</option>
          <option value="1-3">1–3 years</option>
          <option value="3-5">3–5 years</option>
          <option value="5-10">5–10 years</option>
          <option value="10+">10+ years</option>
        </select>

        {/* Employees */}
        <select
          name="numberOfEmployees"
          value={formData.numberOfEmployees}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        >
          <option value="">Employees *</option>
          <option value="1-10">1–10</option>
          <option value="11-50">11–50</option>
          <option value="51-200">51–200</option>
          <option value="201-500">201–500</option>
          <option value="500+">500+</option>
        </select>

        {/* Existing Clients */}
        <input
          name="existingClients"
          type="number"
          placeholder="Existing Clients"
          value={formData.existingClients}
          onChange={handleChange}
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        />

        {/* Join As */}
        <select
          name="joinAs"
          value={formData.joinAs}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg outline-none focus:border-blue-400"
        >
          <option value="">Join As *</option>
          <option value="channel_partner">Channel Partner</option>
          <option value="distributor">Distributor</option>
        </select>

        {/* Why Partner */}
        <textarea
          name="message"
          placeholder="Why do you want to become a partner? *"
          value={formData.message}
          onChange={handleChange}
          required
          className="border text-sm p-3 rounded-lg col-span-2 h-24 outline-none focus:border-blue-400 resize-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>

      </form>
    </div>
  );
};

export default ApplicationForm;