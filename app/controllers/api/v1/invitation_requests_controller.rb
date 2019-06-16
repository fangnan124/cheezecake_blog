module Api
  module V1
    class InvitationRequestsController < ApiController
      before_action :set_invitation_request, only: [:show, :edit, :update, :destroy, :approve]

      def index
        @invitation_requests = InvitationRequest.all
        @invitation_requests = @invitation_requests.order(updated_at: :desc)
        @invitation_requests = @invitation_requests.page(params[:page] || 1).per(10)
      end

      def show; end

      def new
        @invitation_request = InvitationRequest.new
      end

      def edit; end

      def create
        @invitation_request = InvitationRequest.new(invitation_request_params)
        @invitation_request.save!
        redirect_to api_v1_invitation_request_path(@invitation_request), status: :see_other
      end

      def update
        @invitation_request.update!(invitation_request_params)
        redirect_to api_v1_invitation_request_path(@invitation_request), status: :see_other
      end

      # def destroy
      #   @invitation_request.destroy
      #   respond_to do |format|
      #     format.html { redirect_to api_v1_invitation_requests_url }
      #     format.json { head :no_content }
      #   end
      # end

      def approve
        @invitation_request.status = :approved
        @invitation_request.generate_or_renew_code
        @invitation_request.save!
        render :show
      end

      private

      def set_invitation_request
        @invitation_request = InvitationRequest.find(params[:id])
      end

      def invitation_request_params
        params.require(:invitation_request).permit(:email, :message, :code, :status, :expire_at, :user_id)
      end
    end
  end
end
