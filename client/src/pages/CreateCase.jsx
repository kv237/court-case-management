import {
  useState,
} from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import BottomNav from "../components/BottomNav";

import {
  createCase,
} from "../api/caseApi";

function CreateCase() {

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({

      case_title: "",

      case_number: "",

      court_name: "",

      case_type: "",

      description: "",

      hearing_date: "",

    });

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  // =====================================
  // HANDLE SUBMIT
  // =====================================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        if (
          !formData.case_title ||
          !formData.case_number
        ) {

          return toast.error(
            "Please fill required fields"
          );

        }

        setLoading(true);

        const response =
          await createCase(
            formData
          );

        toast.success(
          response.message ||
          "Case Created Successfully"
        );

        navigate("/cases");

      } catch (error) {

        console.log(error);

        toast.error(

          error?.response?.data
            ?.message ||

          "Failed to create case"

        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="min-h-screen bg-[#f7f8fc] pb-24">

      {/* HEADER */}

      <div className="bg-white px-5 pt-5 pb-4 shadow-sm">

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate(-1)
            }
          >

            <ArrowLeft
              size={26}
            />

          </button>

          <h1 className="text-2xl font-bold">

            Create Case

          </h1>

        </div>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="px-5 mt-6 space-y-5"
      >

        {/* CASE TITLE */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Case Title

          </label>

          <input
            type="text"
            name="case_title"
            value={
              formData.case_title
            }
            onChange={
              handleChange
            }
            placeholder="Enter Case Title"
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          />

        </div>

        {/* CASE NUMBER */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Case Number

          </label>

          <input
            type="text"
            name="case_number"
            value={
              formData.case_number
            }
            onChange={
              handleChange
            }
            placeholder="Ex: CRP/124/2026"
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          />

        </div>

        {/* COURT NAME */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Court Name

          </label>

          <input
            type="text"
            name="court_name"
            value={
              formData.court_name
            }
            onChange={
              handleChange
            }
            placeholder="District Court"
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          />

        </div>

        {/* CASE TYPE */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Case Type

          </label>

          <select
            name="case_type"
            value={
              formData.case_type
            }
            onChange={
              handleChange
            }
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          >

            <option value="">
              Select Case Type
            </option>

            <option value="Civil">
              Civil
            </option>

            <option value="Criminal">
              Criminal
            </option>

            <option value="Family">
              Family
            </option>

            <option value="Corporate">
              Corporate
            </option>

          </select>

        </div>

        {/* HEARING DATE */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Hearing Date

          </label>

          <input
            type="date"
            name="hearing_date"
            value={
              formData.hearing_date
            }
            onChange={
              handleChange
            }
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          />

        </div>

        {/* DESCRIPTION */}

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-2">

            Description

          </label>

          <textarea
            rows="5"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Enter Case Description"
            className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 outline-none"
          />

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 transition text-white py-4 rounded-2xl text-lg font-semibold shadow-md"
        >

          {loading
            ? "Creating..."
            : "Create Case"}

        </button>

      </form>

      <BottomNav />

    </div>

  );

}

export default CreateCase;