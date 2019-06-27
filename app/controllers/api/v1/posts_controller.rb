module Api
  module V1
    class PostsController < ApiController
      before_action :set_post, only: [:show, :update, :destroy]
      after_action :increment_views, only: :show

      def index
        @posts = Post.all
        @posts = @posts.status_published unless policy(@posts).show_all?
        @posts = @posts.order(updated_at: :desc)
        @posts = @posts.page(params[:page] || 1).per(7)
      end

      def show; end

      def create
        @post = Post.new(post_params)
        authorize @post
        @post.save!
        redirect_to api_v1_post_path(@post)
      end

      def update
        authorize @post
        @post.update!(post_params)
        redirect_to api_v1_post_path(@post), status: :see_other
      end

      def destroy
        authorize @post
        @post.destroy!
        redirect_to api_v1_posts_path, status: :see_other
      end

      private

      def set_post
        @post = Post.find(params[:id])
      end

      def post_params
        params.require(:post).permit(:title, :content, :status, post_tag_rels_attributes: [:_destroy, :id, :tag_id])
      end

      def increment_views
        return if current_user&.writer_user?

        @post.views += 1
        @post.save!
      end
    end
  end
end
