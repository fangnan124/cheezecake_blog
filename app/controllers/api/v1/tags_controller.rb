module Api
  module V1
    class TagsController < ApiController
      before_action :set_tag, only: [:show, :update, :destroy]

      def index
        @tags = Tag.all
      end

      def show; end

      def create
        @tag = Tag.new(tag_params)
        @tag.save!
        render :show
      end

      def update
        @tag.update!(tag_params)
        render :show
      end

      def destroy
        @tag.destroy!
        redirect_to api_v1_tags_path, status: :see_other
      end

      private

      def set_tag
        @tag = Tag.find(params[:id])
      end

      def tag_params
        params.require(:tag).permit(:name, :color)
      end
    end
  end
end
