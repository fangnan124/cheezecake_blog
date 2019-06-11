module Api
  module V1
    class CommentsController < ApiController

      before_action :set_post, only: [:index, :create]
      before_action :set_comment, only: [:update, :destroy]

      def index
        @comments = @post.comments.order(created_at: :desc).page(params[:page] || 1).per(10)
      end

      def create
        @comment = @post.comments.build(comment_params)
        @comment.user_id = current_user.id
        @comment.save!
        redirect_to api_v1_post_comments_path(@post)
      end

      def update
        @comment.update!(comment_params)
        @post = @comment.post
        redirect_to api_v1_post_comments_path(@post), status: :see_other
      end

      def destroy
        @post = @comment.post
        @comment.destroy!
        redirect_to api_v1_post_comments_path(@post), status: :see_other
      end

      private

      def set_post
        @post = Post.find_by(id: params[:post_id])
      end

      def set_comment
        @comment = Comment.find_by(id: params[:id])
      end

      def comment_params
        params.require(:comment).permit(:text, :user_id, :post_id)
      end

    end
  end
end
