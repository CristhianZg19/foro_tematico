import React, {useEffect, useState} from 'react';
import {supabase} from '../supabaseClient';

const PostList = ({posts, onDeletePost}) => {
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});

    const currentUserEmail = localStorage.getItem('email');
    console.log('Email del usuario actual:', currentUserEmail);

    useEffect(() => {
        posts.forEach((post) => {
            fetchComments(post.id);
        });
    }, [posts]);

    const fetchComments = async (postId) => {
        const {data, error} = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postId);
        if (error) console.error(error.message);
        else setComments((prev) => ({...prev, [postId]: data}));
    };

    const handleAddComment = async (postId) => {
        const {error} = await supabase.from('comments').insert([{
            post_id: postId,
            content: newComment[postId],
            email: currentUserEmail
        }]);
        if (error) {
            console.error(error.message);
        } else {
            setNewComment((prev) => ({...prev, [postId]: ''}));
            fetchComments(postId);
        }
    };

    const handleDeleteComment = async (commentId) => {
        const {error} = await supabase.from('comments').delete().eq('id', commentId);
        if (error) {
            console.error('Error al eliminar el comentario:', error.message);
        } else {
            posts.forEach((post) => {
                fetchComments(post.id);
            });
        }
    };

    const handleDeletePost = async (postId) => {
        const {error: deleteCommentsError} = await supabase
            .from('comments')
            .delete()
            .eq('post_id', postId);

        if (deleteCommentsError) {
            console.error('Error al eliminar comentarios:', deleteCommentsError.message);
            return;
        }

        const {error} = await supabase.from('posts').delete().eq('id', postId);
        if (error) console.error('Error al eliminar el post:', error.message);
        else onDeletePost(postId);  // Call the onDeletePost callback to update state
    };

    return (
        <div className="post-list-container">
            {posts.slice().reverse().map((post) => (
                <div key={post.id} className="post-item">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-content">{post.content}</p>
                    <p className="post-author">Autor: {post.email}</p>
                    <span className="post-date">Fecha: {new Date(post.created_at).toLocaleString()}</span>
                    {post.email === currentUserEmail && (

                        <div>
                            <button className="btn-delete-post" onClick={() => handleDeletePost(post.id)}>Eliminar</button>
                        </div>
                    )}
                    <div>
                        <h3>Comentarios:</h3>
                        <div className="comments-section">
                            {comments[post.id] && comments[post.id].map((comment) => (
                                <div key={comment.id} className="comment-item">
                                    <p className="coment-user">{comment.content}</p>
                                    {comment.email === currentUserEmail && (
                                        <button className="btn-delete" onClick={() => handleDeleteComment(comment.id)}>X</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="Añadir un comentario"
                            value={newComment[post.id] || ''}
                            className="comment-input"
                            onChange={(e) => setNewComment((prev) => ({...prev, [post.id]: e.target.value}))}
                        />
                        <button className="comment-button" onClick={() => handleAddComment(post.id)}>
                            Comentar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
