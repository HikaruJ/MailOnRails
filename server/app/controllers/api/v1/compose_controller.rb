class Api::V1::ComposeController < Api::V1::BaseController
    include MessageHelper

    def create
        UserMailer.send_email(compose_params)
        render status: 200,
             json: { response: 'Email was sent successfully' }
        return
    end

private

    def compose_params
        @compose_params ||= params.permit(:from, :to, :subject, :body)
    end
end