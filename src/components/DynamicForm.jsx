import propTypes from 'prop-types';
import { useFieldArray, Controller } from 'react-hook-form';

const DynamicForm = ({ control, value }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'videos',
    keyName: 'id',
    defaultValue: value,
  });

  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <Controller
            defaultValue={field.title}
            control={control}
            name={`videos[${index}].title`}
            render={({ field }) => <input className="form__group--input" type="text" {...field} placeholder={`Video Title - ${index + 1}`} />}
          />
          <Controller
            control={control}
            defaultValue={field.url}
            name={`videos[${index}].url`}
            render={({ field }) => <input className="form__group--input" type="url" {...field} placeholder={`Video Url - ${index + 1}`} />}
          />
          <button type="button" style={{ "marginBottom": "1rem" }} onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" style={{ "display": "flex" }} onClick={() => append({})}>
        Add Field(s)
      </button>
    </div>
  );
};

DynamicForm.propTypes = {
  control: propTypes.object.isRequired,
  value: propTypes.array,
};

export default DynamicForm;
