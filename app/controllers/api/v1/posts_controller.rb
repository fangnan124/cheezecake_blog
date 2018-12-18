module Api
  module V1
    class PostsController < ApiController
      before_action :set_post, only: [:show, :update, :destroy]

      def index
        @posts = Post.all
                   .order(updated_at: :desc)
                   .page(params[:page] || 1)
                   .per(7)
      end

      def show; end

      def create
        @post = Post.new(post_params)
        @post.save!
        redirect_to api_v1_post_path(@post)
      end

      def update
        @post.update!(post_params)
        redirect_to api_v1_post_path(@post), status: :see_other
      end

      def destroy
        @post.destroy!
        redirect_to api_v1_posts_path, status: :see_other
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
        params.require(:post).permit(:title, :content)
      end
    end
  end
end
