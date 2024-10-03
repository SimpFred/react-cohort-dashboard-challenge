import { useContext, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CohortAppContext } from "../../../context";
import { FaPaperPlane } from "react-icons/fa";
import { update } from "../../../api/api";

const CommentList = styled.div`
  margin-top: 20px;
`;

const Comment = styled.div`
  background-color: #f9f9f9;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  position: relative;
`;

const TextArea = styled.textarea`
  padding: 10px;
  background-color: #e6ebf5;
  color: #6d6d93;
  padding-right: 50px; /* Extra padding för att ge plats åt ikonen */
  border: none;
  border-radius: 4px;
  resize: none;
  width: 100%;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #3498db;
`;

const CommentSection = ({ post }) => {
  const [newComment, setNewComment] = useState("");
  const { posts, setPosts } = useContext(CohortAppContext);

  const onAddComment = async (comment) => {
    const updatedPost = {
      ...post,
      comments: [...(post.comments || []), comment],
    };

    console.log(updatedPost);
    const updatedPostFromApi = await update("post", post.id, updatedPost);
    console.log(updatedPostFromApi);

    const updatedPosts = posts.map((p) => (p.id === post.id ? updatedPost : p));

    setPosts(updatedPosts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div>
      <CommentList>
        {post.comments &&
          post.comments.length > 0 &&
          post.comments.map((comment, index) => (
            <Comment key={index}>{comment}</Comment>
          ))}
      </CommentList>
      <CommentForm onSubmit={handleSubmit}>
        <TextArea
          style={{ padding: "10px" }}
          rows="1"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <IconWrapper onClick={handleSubmit}>
          <FaPaperPlane size={20} />
        </IconWrapper>
      </CommentForm>
    </div>
  );
};

CommentSection.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentSection;
