import styled from "styled-components";
import ProfileCircle from "../ProfileCircle";
import PropTypes from "prop-types";

const NameHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  color: #000046;
  margin-bottom: 20px;
  text-align: center;
  margin-left: 20px;
`;

const NameText = styled.span`
  margin-left: 10px;
`;

const ProfileHeader = ({ firstName, lastName }) => (
  <NameHeader>
    <ProfileCircle
      width="60px"
      height="60px"
      firstName={firstName}
      lastName={lastName}
    />
    <NameText>
      {firstName} {lastName}
    </NameText>
  </NameHeader>
);

ProfileHeader.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default ProfileHeader;
