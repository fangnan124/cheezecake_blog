module Api
  module V1
    class TagsController < ApiController
      def index
        @tags = Tag.all
      end
    end
  end
end
