module Api
  module V1
    class PostsController < ApiController
      before_action :set_post, only: [:show, :update, :destroy]
      after_action :increment_views, only: :show

      def index
        @posts = Post.with_post_tag_rels.with_attached_image
        @posts = policy_scope(@posts)
        @posts = @posts.order(updated_at: :desc)
        @posts = @posts.page(params[:page] || 1).per(10)
      end

      def new
        authorize Post
      end

      def show
        authorize @post
      end

      def create
        authorize Post
        @post = Post.new(post_params)
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
        params.permit(
          :title,
          :content,
          :status,
          :image,
          :image_description,
          post_tag_rels_attributes: [
            :id,
            :tag_id,
            :_destroy
          ]
        )
      end

      def increment_views
        return if current_user&.writer_user?

        @post.views += 1
        # (touch: false) Not to update updated_at
        @post.save!(validate: false, touch: false)
      end
    end
  end
end
