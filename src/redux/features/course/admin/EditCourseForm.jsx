import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDeleteCourseMutation, useUpdateCourseMutation } from "../courseApiSlice";
import { showErrorToast, showSuccessToast } from "../../../../components/Toast";
import DynamicForm from "../../../../components/DynamicForm";
import Loader from "../../../../components/Loader";

const EditCourseForm = ({ course }) => {
  const navigate = useNavigate();

  const [updateCourse, {
    isError,
    isLoading,
    error
  }] = useUpdateCourseMutation();

  const [deleteCourse, {
    isError: isDeleteError,
    isLoading: isDeleteLoading,
    error: deleteError
  }] = useDeleteCourseMutation();

  const { register, handleSubmit, control } = useForm({
    defaultValues: course
  });

  const onSubmit = (data) => {
    updateCourse({
      id: data._id,
      body: {
        ...data
      }
    });
    showSuccessToast(`'${data.name}' course, has been updated successfully.`)
    navigate("/dashboard/admin/courses")
  }

  const onDelete = (data) => {
    if (confirm("Are you sure you want to delete this course?") == true) {
      deleteCourse(data._id);
      showSuccessToast(`'${data.name}' course, has been deleted successfully.`)
      navigate("/dashboard/admin/courses")
    } else {
      showErrorToast(`'${data.name}' course, has not been deleted. ${deleteError.message}`)
    }
  };

  let content;

  if (isLoading || isDeleteLoading) {
    content = <Loader />
  }

  if (isError || isDeleteError) {
    showErrorToast(error.message) || showErrorToast(deleteError.message)
  }

  content = (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        <div >
          <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left arrow"></i></a>
          <h3 className="sign-up__form--title center edit">Edit `{course.name}` Course</h3>
        </div>
        <div className="form__group">
          <label htmlFor="mail" className="form__group--label">
            Course Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="form__group--input"
            placeholder="Your Course Name"
            {...register("name")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="previewUrl" className="form__group--label">
            Image Placeholder URL
          </label>
          <input
            type="url"
            id="previewUrl"
            required
            className="form__group--input"
            placeholder="Your Course Image URL"
            {...register("previewUrl")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="description" className="form__group--label">
            Course Description
          </label>
          <textarea
            type=""
            id="description"
            required
            className="form__group--input"
            placeholder="Your Course Description"
            {...register("description")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="category" className="form__group--label">
            Course Category
          </label>
          <input
            type="text"
            id="category"
            required
            className="form__group--input"
            placeholder="Your Course Category"
            {...register("category")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="duration" className="form__group--label">
            Course Duration
          </label>
          <input
            type="text"
            id="duration"
            required
            className="form__group--input"
            placeholder="Your Course Duration"
            {...register("duration")}
          />
        </div>
        <div className="form__group">
          <label htmlFor="price" className="form__group--label">
            Course Price
          </label>
          <input
            type="number"
            id="price"
            required
            className="form__group--input"
            placeholder="Your Course Price"
            {...register("price")}
          />
        </div>

        <div className="form__group">
          <h2>Videos</h2>
          <DynamicForm value={course.videos} control={control} />
        </div>
        <button className="form__button">Update Course</button>
        <button onClick={handleSubmit(onDelete)} className="form__button-delete">Delete Course</button>
      </form>
    </>
  )


  return content;
}

export default EditCourseForm