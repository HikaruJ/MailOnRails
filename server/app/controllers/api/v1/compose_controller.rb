class Api::V1::ComposeController < Api::V1::BaseController
    before_action :doorkeeper_authorize!
    before_action :authenticate_user!

    include MessageHelper

    def create
        user = current_user
        if user.present?
            message = user.messages.sent.new(compose_params)
            message.is_read = true
            message.save

            sentCategory = message.message_categories.build
            sentCategory.message_type = MessageType.sent.first
            sentCategory.save

            UserMailer.compose_mail(compose_params).deliver

            render status: 200,
                json: { response: 'Email was sent successfully' }, root: 'compose'
            return
        else
            render status: 422,
                json: user.errors, root: 'compose'
            return
        end
    end

private

    def compose_params
        @compose_params ||= params.permit(:from, :to, :subject, :body)
    end
end