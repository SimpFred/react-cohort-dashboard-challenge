import styled from "styled-components";
import PropTypes from "prop-types";

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #64dc78;
  color: #000046;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
`;

const getInitials = (firstName, lastName) => {
  if (!firstName || !lastName) return "";
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const ProfileCircle = ({ firstName, lastName }) => {
  const initials = getInitials(firstName, lastName);
  return <Circle>{initials}</Circle>;
};

ProfileCircle.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

export default ProfileCircle;
