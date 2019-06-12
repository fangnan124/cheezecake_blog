module Api
  module V1
    class UsersController < ApiController
      before_action :set_user

      def show; end

      def update
        @user.update!(user_params)
        redirect_to api_v1_user_path(@user), status: :see_other
      end

      private

      def set_user
        @user = User.find(params[:id])
      end

      def user_params
        params.require(:user).permit(:name)
      end
    end
  end
end
