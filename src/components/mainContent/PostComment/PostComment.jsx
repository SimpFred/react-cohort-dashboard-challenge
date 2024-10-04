import { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CohortAppContext } from "../../../context";
import { FaPaperPlane } from "react-icons/fa";
import { update } from "../../../api/api";
import ProfileCircle from "../../ProfileCircle";
import { Link } from "react-router-dom";

const CommentList = styled.div`
  margin: 20px auto;
`;

const Comment = styled.div`
  background-color: #e6ebf5;
  border-radius: 4px;
  padding: 0;
  margin-bottom: 10px;
  display: inline-block;
  max-width: 100%;
  width: auto;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 15px;
  position: relative;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 10px;
  margin-left: 10px;
  background-color: #e6ebf5;
  color: #6d6d93;
  border: none;
  border-radius: 4px;
  resize: none;
  width: 100%;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 60%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #3498db;
`;

const CommentContainer = styled.div`
  margin-left: 15px;
  display: flex;
  align-items: center;
`;

const CommentText = styled(Comment)`
  flex: 1;
  margin-left: 10px;
  background-color: #e6ebf5;
  padding: 8px 0 8px 15px;
  font-size: 1rem;
  display: inline-block;
  width: auto;
`;

const CommentHeader = styled(Link)`
  color: #000046;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
`;

const ShowMoreButton = styled.button`
  background: none;
  border: none;
  color: #6d6d93;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 1rem;

  &:hover {
    text-decoration: none;
  }
`;

const CommentSection = ({ post, showAllComments = true }) => {
  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(showAllComments);

  const { posts, setPosts, userProfile } = useContext(CohortAppContext);

  const onAddComment = async (comment) => {
    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), comment],
    };

    const updatedPostFromApi = await update("post", post.id, updatedPost);

    const updatedPosts = posts.map((p) =>
      p.id === post.id ? updatedPostFromApi : p
    );

    setPosts(updatedPosts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        text: newComment,
        contactId: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
      };
      onAddComment(comment);
      setNewComment("");
    }
  };

  const commentsToShow = post.comments
    ? showAll
      ? post.comments
      : post.comments.slice(-3)
    : [];

  return (
    <div>
      <CommentList>
        {post.comments && post.comments.length > 3 && (
          <ShowMoreButton onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Show all"} comments
          </ShowMoreButton>
        )}
        {post.comments &&
          post.comments.length > 0 &&
          commentsToShow.map((comment, index) => (
            <CommentContainer key={index}>
              <ProfileCircle
                id={comment.contactId}
                firstName={comment.firstName}
                lastName={comment.lastName}
              />
              <CommentText>
                <CommentHeader to={`/profile/${comment.contactId}`}>
                  {comment.firstName} {comment.lastName}
                </CommentHeader>
                <p style={{ margin: 1 }}>{comment.text}</p>
              </CommentText>
            </CommentContainer>
          ))}
      </CommentList>
      <CommentForm onSubmit={handleSubmit}>
        <ProfileCircle
          firstName={userProfile.firstName}
          lastName={userProfile.lastName}
        />
        <TextArea
          rows="1"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <IconWrapper onClick={handleSubmit}>
          <FaPaperPlane style={{ marginRight: "15px" }} size={20} />
        </IconWrapper>
      </CommentForm>
    </div>
  );
};

CommentSection.propTypes = {
  post: PropTypes.object.isRequired,
  showAllComments: PropTypes.bool,
};

export default CommentSection;
