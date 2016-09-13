class Api::V1::EmailsController < ApplicationController
    # before_action :doorkeeper_authorize! # Require access token for all actions
    # before_action :authenticate_user!
    respond_to :json

    def create
        UserMailer.send_email(email_params)
        render status: 200,
             json: { response: "Email was sent successfully" }
        return
    end

private

    def email_params
        @email_params ||= params.permit(:from, :to, :subject, :body)
    end
end