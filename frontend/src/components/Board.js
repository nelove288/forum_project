import React, { useState } from "react";
import "./Board.css";

function Board() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      // 수정 중
      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingId ? { ...post, title, content } : post
        )
      );
      setEditingId(null);
    } else {
      // 새 글
      const newPost = {
        id: Date.now(),
        title,
        content,
      };
      setPosts([newPost, ...posts]);
    }

    setTitle("");
    setContent("");
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="board-container">
      <h1 className="board-title">📋 게시판</h1>

      <form className="board-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <div className="form-buttons">
          <button type="submit">{editingId ? "수정 완료" : "글 작성"}</button>
          {editingId && (
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelEdit}
            >
              취소
            </button>
          )}
        </div>
      </form>

      <div className="post-list">
        {posts.length === 0 ? (
          <p className="no-posts">게시글이 없습니다.</p>
        ) : (
          posts.map((post) => (
            <div className="post-item" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <div className="post-actions">
                <button onClick={() => handleEdit(post)}>수정</button>
                <button onClick={() => handleDelete(post.id)}>삭제</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
