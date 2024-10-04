import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Circle = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #64dc78;
  color: #000046;
  display: flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
`;

const getInitials = (firstName, lastName) => {
  if (!firstName || !lastName) return "";
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const ProfileCircle = ({ id, firstName, lastName }) => {
  console.log(id + " : id in ProfileCircle");
  const initials = getInitials(firstName, lastName);
  return <Circle to={`/profile/${id}`}>{initials}</Circle>;
};

ProfileCircle.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.number,
};

export default ProfileCircle;
