'use client';

import { useState, useEffect } from 'react';

const mockComments = [
  {
    user: 'user1',
    comment: '¡Hola! ¡Qué buen live!',
    avatar: 'https://picsum.photos/seed/user1/32/32'
  },
  {
    user: 'user2',
    comment: '¿Desde dónde transmites?',
    avatar: 'https://picsum.photos/seed/user2/32/32'
  },
  {
    user: 'user3',
    comment: '¡Me encanta tu contenido!',
    avatar: 'https://picsum.photos/seed/user3/32/32'
  },
];

const Comments = () => {
  const [comments, setComments] = useState(mockComments);

  // Simulate new comments
  useEffect(() => {
    const interval = setInterval(() => {
      const newComment = {
        user: `user${Math.floor(Math.random() * 100)}`,
        comment: 'Este es un nuevo comentario.',
        avatar: `https://picsum.photos/seed/user${Math.floor(Math.random() * 100)}/32/32`
      };
      setComments(prevComments => [...prevComments, newComment]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-96 ml-4 flex flex-col">
      <div className="bg-white rounded-t-xl p-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg flex items-center gap-2 text-gray-900">
            <i className="fas fa-comments"></i>
            Comentarios
          </h2>
          <div className="flex items-center gap-2">
            <button className="text-gray-500 hover:text-gray-900 transition-colors">
              <i className="fas fa-cog"></i>
            </button>
            <button id="pauseComments" className="text-gray-500 hover:text-gray-900 transition-colors">
              <i className="fas fa-pause"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="commentsContainer" className="flex-1 bg-white overflow-y-auto scrollbar-hide p-4 space-y-3 shadow-inner">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start gap-3 comment-enter">
            <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full" />
            <div>
              <p className="text-sm font-semibold">@{comment.user}</p>
              <p className="text-sm">{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Comments;
