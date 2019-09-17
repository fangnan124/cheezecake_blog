module Api
  module V1
    class PostRevisionsController < ApiController
      before_action :set_post, only: [:index]
      before_action :set_post_revision, only: [:show]

      def index
        @post_revisions = @post.post_revisions.order(id: :desc).page(params[:page] || 1).per(10)
      end

      def show; end

      private

      def set_post
        @post = Post.find_by(id: params[:post_id])
      end

      def set_post_revision
        @post_revision = PostRevision.find_by(id: params[:id])
      end
    end
  end
end
