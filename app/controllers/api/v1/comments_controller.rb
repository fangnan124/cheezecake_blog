module Api
  module V1
    class CommentsController < ApiController

      before_action :set_post, only: [:index, :create]

      def index
        @comments = @post.comments.order(updated_at: :desc).page(params[:page] || 1).per(10)
      end

      def create
        @comment = @post.comments.build(comment_params)
        @comment.user_id = current_user.id
        @comment.save!
        redirect_to api_v1_post_comments_path(@post)
      end

      def update

      end

      def destroy

      end

      private

      def set_post
        @post = Post.find_by(id: params[:post_id])
      end

      def comment_params
        params.require(:comment).permit(:text, :user_id, :post_id)
      end

    end
  end
end
