import { useForm } from "react-hook-form";
import { useAddNewCourseMutation } from "../courseApiSlice";
import { showErrorToast, showSuccessToast } from "../../../../components/Toast";
import Loader from "../../../../components/Loader";
import DynamicForm from "../../../../components/DynamicForm";
import { useNavigate } from "react-router-dom";

const NewCourseForm = () => {
  const { register, handleSubmit, control } = useForm();

  const navigate = useNavigate();

  const [addNewCourse, {
    isSuccess,
    isError,
    isLoading,
    error
  }] = useAddNewCourseMutation();

  const onSubmit = (data) => {
    showSuccessToast("Course Added Successfully")
    addNewCourse({ data })
    navigate('/dashboard/admin/courses')
  }

  let content;

  if (isLoading) {
    content = <Loader />
  }

  if (isSuccess) {
    content = showSuccessToast("Course Added Successfully")
  }

  content = (
    <>
      {isError && showErrorToast(error.message)}
      <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
        <div >
          <a onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left arrow"></i></a>
          <h3 className="sign-up__form--title center edit">Create New Course</h3>
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
            placeholder="Your Course Duration - 2"
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
            placeholder="Your Course Price - 699"
            {...register("price")}
          />
        </div>

        <div className="form__group">
          <h2>Videos</h2>
          <DynamicForm control={control} />
        </div>
        <button className="form__button">Create New Course</button>
      </form>
    </>
  )

  return content;
}

export default NewCourseForm