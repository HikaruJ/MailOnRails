class Api::V1::SentController < Api::V1::BaseController
    include MessageHelper

    before_action :doorkeeper_authorize!, except: :show
    before_action :authenticate_user!, except: :show

    #Set message read status 
    def create
        user = current_user
        if user.present?
            message = user.messages.sent.where(display_id: sent_params[:id]).first
            if message.present?
                message.is_read = sent_params[:is_read]
                message.save
            end 

            render status: 200,
                json: { response: true }, root: 'sent'
            return
        else
            render status: 422,
                json: user.errors, root: 'sent'
            return
        end
    end

    #Delete message
    def destroy
        user = current_user
        if user.present?
            message = user.messages.sent.where(display_id: sent_params[:id]).first
            message.destroy if message.present?

            render status: 200,
                json: { response: true }, root: 'sent'
            return
        else
            render status: 422,
                json: user.errors, root: 'sent'
            return
        end
    end

    #Get sent messages
    def index
        user = current_user
        if user.present?
            render status: 200,
                json: user.messages.sent.order(created_at: :desc).all
            return
        else
            render status: 422,
                json: user.errors, root: 'sent'
            return
        end
    end

     #Get unread messages
    def show
        user = current_user
        if user.present?
            unread_message_count = user.messages.sent.where(is_read: false).all.count

            render status: 200,
                json: unread_message_count
            return
        else
            render status: 422,
                json: user.errors, root: 'sent'
            return
        end
    end

private

    def sent_params
        @sent_params ||=  params.permit(:id, :is_read)
    end
end