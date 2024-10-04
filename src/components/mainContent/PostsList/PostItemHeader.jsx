import styled from "styled-components";
import PropTypes from "prop-types";
import ProfileCircle from "../../ProfileCircle";
import { Link } from "react-router-dom";

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
`;

const NameTitleWrapper = styled.div`
  flex: 1;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;

const TitleWrapper = styled(Link)`
  font-size: 1rem;
  color: #67678e;
  margin: 0;
`;

const PostItemHeader = ({ author, title, postId }) => {
  return (
    <Header>
      <ProfileCircle
        id={author.id}
        firstName={author.firstName}
        lastName={author.lastName}
      />
      <NameTitleWrapper>
        {author.firstName} {author.lastName}
        <TitleWrapper to={`/post/${postId}`}>{title}</TitleWrapper>
      </NameTitleWrapper>
    </Header>
  );
};

PostItemHeader.propTypes = {
  author: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default PostItemHeader;
