class Api::V1::InboxController < Api::V1::BaseController
    include MessageHelper

    def create
        @user = current_user
        if @user.present?
            render status: 200,
                json: { response: @user.messages.inbox.where(is_read: false).count }
            return
        else
            render status: 422,
                json: { response: @user.errors }
            return
        end
    end

    def index
        @user = current_user
        if @user.present?
            render status: 200,
                json: { response: serialize_messages(@user.messages.inbox) }
            return
        else
            render status: 422,
                json: { response: @user.errors }
            return
        end
    end
end