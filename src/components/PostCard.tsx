import React from 'react';
import type { Post } from '../types';
import { MessageSquare } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.body}</p>
      <div className="flex items-center text-gray-500">
        <MessageSquare className="w-4 h-4 mr-2" />
        <span>Post #{post.id}</span>
      </div>
    </div>
  );
}
