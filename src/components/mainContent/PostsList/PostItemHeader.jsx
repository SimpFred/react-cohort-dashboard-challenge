import styled from "styled-components";
import PropTypes from "prop-types";
import ProfileCircle from "../../ProfileCircle";

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const NameTitleWrapper = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const TitleWrapper = styled.p`
  font-size: 1rem;
  color: #67678e;
  margin: 0;
`;

const PostItemHeader = ({ author, title }) => {
  return (
    <Header>
      <ProfileCircle firstName={author.firstName} lastName={author.lastName} />
      <NameTitleWrapper>
        {author.firstName} {author.lastName}
        <TitleWrapper>{title}</TitleWrapper>
      </NameTitleWrapper>
    </Header>
  );
};

PostItemHeader.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostItemHeader;
