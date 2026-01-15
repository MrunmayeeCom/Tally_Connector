import React, { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import API from "../api/AxiosInstance";

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
        website: formData.website,
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

      source: "tally Connector",
    };

    try {
      await API.post(
        "/api/partner-program/create",
        payload
      );

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
      alert(
        error?.response?.data?.message ||
          "Submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#002855] to-[#0066CC]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Partner Application Form
          </h2>
          <p className="text-white/90">
            Apply to become a certified partner
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="companyName"
                placeholder="Company Name *"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="contactPerson"
                placeholder="Contact Person *"
                value={formData.contactPerson}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="email"
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="website"
                placeholder="Website"
                value={formData.website}
                onChange={handleChange}
                className="input"
              />

              <input
                name="country"
                placeholder="Country *"
                value={formData.country}
                onChange={handleChange}
                required
                className="input"
              />

              <input
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                required
                className="input"
              />

              {/* BUSINESS TYPE */}
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Business Type *</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Consulting">Consulting</option>
                <option value="Reseller">Reseller</option>
                <option value="Other">Other</option>
              </select>

              {/* YEARS IN BUSINESS – MATCH BACKEND */}
              <select
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Years in Business *</option>
                <option value="0-1">0–1 years</option>
                <option value="1-3">1–3 years</option>
                <option value="3-5">3–5 years</option>
                <option value="5-10">5–10 years</option>
                <option value="10+">10+ years</option>
              </select>

              {/* EMPLOYEES – MATCH BACKEND */}
              <select
                name="numberOfEmployees"
                value={formData.numberOfEmployees}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Employees *</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="201-500">201–500</option>
                <option value="500+">500+</option>
              </select>

              <input
                name="existingClients"
                type="number"
                placeholder="Existing Clients"
                value={formData.existingClients}
                onChange={handleChange}
                className="input"
              />

              {/* JOIN AS */}
              <select
                name="joinAs"
                value={formData.joinAs}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">Join As *</option>
                <option value="channel_partner">Channel Partner</option>
                <option value="distributor">Distributor</option>
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Why do you want to become a partner? *"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="input resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#0066CC] text-white rounded-lg font-semibold hover:bg-[#004C99]"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>

      {/* tailwind helper */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 0.5rem;
            outline: none;
          }
          .input:focus {
            border-color: #00bcd4;
          }
        `}
      </style>
    </section>
  );
};

export default ApplicationForm;
