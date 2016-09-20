class Api::V1::EmailsController < ApplicationController
    include UserHelper

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    # before_action :doorkeeper_authorize! # Require access token for all actions
    # before_action :authenticate_user!

    respond_to :json

    def create
        UserMailer.send_email(email_params)
        render status: 200,
             json: { response: 'Email was sent successfully' }
        return
    end

    def inbox
        @user = User.first
        if @user.present?
            render status: 200,
                json: { response: @user.messages.inbox }
            return
        else
            render json: { response: @user.errors, success: false }, status: 422
        end
    end

private

    def email_params
        @email_params ||= params.permit(:from, :to, :subject, :body)
    end

    def record_not_found
        render json: { response: 'record could not be found', success: false }, status: 422
    end
end