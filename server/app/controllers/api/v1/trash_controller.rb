class Api::V1::TrashController < Api::V1::BaseController
    #Delete message
    def destroy
        user = current_user
        if user.present?
            message = user.messages.trash.where(display_id: trash_params[:id]).first
            message.destroy if message.present?

            render status: 200,
                json: { response: true }, root: 'trash'
            return
        else
            render status: 422,
                json: user.errors, root: 'trash'
            return
        end
    end

    #Get messages
    def index
        user = current_user
        if user.present?
            render status: 200,
                json: user.messages.trash.order(created_at: :desc).all
            return
        else
            render status: 422,
                json: user.errors, root: 'trash'
            return
        end
    end

private

    def trash_params
        @trash_params ||= params.permit(:id)
    end
end