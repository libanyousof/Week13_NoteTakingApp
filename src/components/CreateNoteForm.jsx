// TODO: Import useForm, zodResolver, axios, useNavigate, useState, and noteSchema
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { noteSchema } from "../schema/notes";
import axios from "axios";
import { Save } from "lucide-react";

const CreateNoteForm = () => {
  // TODO: Setup isSubmitting state with useState
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: create navigate variable and set to useNavigate()
  const navigate = useNavigate();

  // TODO: Set up the form with useForm from react-hook-form and zodResolver from @hookform/resolvers/zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
  });
  const sendToTheServer = async (data) => {
    // TODO: Send the data to the server
    // TODO: Use axios to create a new note in the server using the endpoint http://localhost:3001/api/notes

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "http://localhost:3001/api/notes",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      navigate("/notes");
    } catch (errors) {
      console.log(errors);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* TODO: Setup the form with TailwindCSS, create a form with the following fields: title, content, and submit button */}

      <div className="flex flex-col gap-6 bg-white rounded-md p-6 shadow-sm">
        <h1 className="text-gray-900 font-bold text-xl">Create a New Form</h1>
        <form
          className="flex flex-col w-full"
          onSubmit={handleSubmit(sendToTheServer)}
        >
          <label htmlFor="title" className="text-gray-500 font-medium text-xl">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            {...register("title")}
            className="border p-2 rounded-md shadow-sm mt-2 text-xl focus:outline-none focus:ring-1 focus:ring-yellow-300"
            placeholder="Note Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}

          <label
            htmlFor="content"
            className="text-gray-500 font-medium mt-6 text-xl"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            {...register("content")}
            className="border border-gray-300 p-2 rounded-md shadow-sm mt-2 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-300 text-xl"
            rows={8}
            placeholder="Write your note here..."
          ></textarea>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}

          {/* <button
            type="submit"
            className="flex gap-2 bg-yellow-500 text-white font-semibold text-xl rounded-md mt-6 p-2 justify-center hover:bg-yellow-600"
          >
            <Save /> Save Note
          </button> */}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex gap-2 text-white font-semibold text-xl rounded-md mt-6 p-2 justify-center 
            ${
              isSubmitting ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
            }`}
          >
            <Save /> {isSubmitting ? "Saving..." : "Save Note"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNoteForm;
