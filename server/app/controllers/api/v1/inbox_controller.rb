class Api::V1::InboxController < Api::V1::BaseController
    include MessageHelper

    #Set message read status 
    def create
        user = current_user
        if user.present?
            message = user.messages.inbox.where(display_id: inbox_params[:id]).first
            if message.present?
                message.is_read = inbox_params[:is_read]
                message.save
            end 

            render status: 200,
                json: { response: true }, root: 'user'
            return
        else
            render status: 422,
                json: user.errors, root: 'user'
            return
        end
    end

    #Delete message
    def destroy
        user = current_user
        if user.present?
            message = user.messages.inbox.where(display_id: inbox_params[:id]).first
            category = message.message_categories.first
            category.message_type = MessageType.trash.first
            category.save

            render status: 200,
                json: { response: true }, root: 'user'
            return
        else
            render status: 422,
                json: user.errors, root: 'user'
            return
        end
    end

    #Get messages
    def index
        user = current_user
        if user.present?
            render status: 200,
                json: user.messages.inbox.order(created_at: :desc).all
            return
        else
            render status: 422,
                json: user.errors, root: 'user'
            return
        end
    end

    #Get unread messages
    def show
        user = current_user
        if user.present?
            unread_message_count = user.messages.inbox.where(is_read: false).all.count

            render status: 200,
                json: unread_message_count
            return
        else
            render status: 422,
                json: user.errors, root: 'user'
            return
        end
    end

private

    def inbox_params
        @inbox_params ||=  params.permit(:id, :is_read)
    end
end