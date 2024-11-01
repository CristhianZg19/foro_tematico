import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import CreatePost from './CreatePost';
import PostList from './PostList';
import '../style/forum.css';

const Forum = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        const loggedIn = localStorage.getItem('email');
        if (!loggedIn) {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase.from('posts').select('*');
            if (error) console.error(error.message);
            else {
                setAllPosts(data);
                setFilteredPosts(data);
            }
        };
        fetchPosts();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = allPosts.filter((post) =>
            post.title.toLowerCase().includes(term) ||
            post.content.toLowerCase().includes(term)
        );
        setFilteredPosts(filtered);
    };

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error closing session:', error.message);
        } else {
            localStorage.removeItem('loggedIn');
            window.location.href = '/';
        }
    };

    const fetchPosts = async () => {
        const { data, error } = await supabase.from('posts').select('*');
        if (error) console.error(error.message);
        else {
            setAllPosts(data);
            setFilteredPosts(data);
        }
    };

    const handleDeletePost = (postId) => {
        setAllPosts((prev) => prev.filter((post) => post.id !== postId));
        setFilteredPosts((prev) => prev.filter((post) => post.id !== postId));
    };

    return (
        <div className="padreForum">
            <div className="forum-container">
                <div className="user-email">
                    <span>{localStorage.getItem('email')}</span>
                </div>
                <div className="logout-button">
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </div>
                <div className="search-container" style={{ justifyContent: 'center' }}>
                    <input
                        type="text"
                        placeholder="Buscar publicaciones..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </div>
                <div className="create-post">
                    <CreatePost onPostCreated={fetchPosts} />
                </div>
                <PostList posts={filteredPosts} onDeletePost={handleDeletePost} />
            </div>
        </div>
    );
};

export default Forum;
