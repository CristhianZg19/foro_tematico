// src/components/CreatePost.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const CreatePost = ({ onPostCreated }) => { // Recibir la función como prop
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const email = localStorage.getItem('email');

    const handleCreatePost = async () => {
        const { error } = await supabase
            .from('posts')
            .insert([{ title, content, email }]);
        
        if (error) {
            console.error(error.message);
        } else {
            onPostCreated(); // Llamar a la función para actualizar la lista
            setTitle('');
            setContent('');
        }
    };

    return (
        <div className="post-container">
            <input
                type="text"
                placeholder="Título del tema"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="post-input"
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="post-textarea"
            />
            <button onClick={handleCreatePost} className="post-button">
                Publicar
            </button>
        </div>
    );
};

export default CreatePost;
