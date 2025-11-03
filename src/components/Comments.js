'use client';

import { useEffect, useRef } from 'react'; // Import useRef

const Comments = ({ comments }) => { // Accept comments prop
  
  const commentsEndRef = useRef(null); // Ref for auto-scrolling

  // Auto-scroll to the latest comment
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

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
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No comments yet. Connect to a live stream!</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} className="flex items-start gap-3 comment-enter">
              <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold">{comment.user.nickname}</p>
                <p className="text-sm">{comment.comment}</p>
              </div>
            </div>
          ))
        )}
        <div ref={commentsEndRef} /> {/* Element to scroll to */}
      </div>
    </aside>
  );
};

export default Comments;