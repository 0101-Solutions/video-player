import propTypes from "prop-types";
import { useSelector } from "react-redux";

import { selectSchoolById } from "./schoolApiSlice";

const School = ({ infoId }) => {
  const info = useSelector((state) => selectSchoolById(state, infoId));

  const { firstName, lastName, branch } = info.user;

  const { paymentStatus, courses, total, createdAt } = info;

  const normalizeDate = (date) => {
    const options = {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    return new Date(date).toLocaleDateString("en-US", options);
  };

  const date = normalizeDate(createdAt);

  const courseNames = courses.map(course => course.course.name);

  if (info) {
    return (
      <tbody>
        <tr>
          <td>{firstName}{" "}{lastName}</td>
          <td className="text-capitalize">{paymentStatus}</td>
          <td>{branch}</td>
          <td>{courses ? courseNames : <strong>No courses purchased</strong>}</td>
          <td>$ {total}</td>
          <td>{date}</td>
        </tr>
      </tbody>
    );
  } else {
    return <tbody><tr><td>Sorry, that info does not exist</td></tr></tbody>;
  }
};

School.propTypes = {
  infoId: propTypes.string.isRequired,
};

export default School