class UsersController < Devise::RegistrationsController
    include UserHelper 
    include MessageHelper

    respond_to :json

    def create
        if email_exists?(params[:username])
            render status: 409,
                json: { response: "User already registered with email #{user_params[:email]}.\r\nPlease register with a different email." }, root: 'user'
            return
        end

        username = params[:username]
        user_params[:email] = get_email(username)
        user = User.new(user_params)
        user.save

        if doorkeeper_oauth_client and user
            doorkeeper_access_token(user)
            add_welcome_message(user)

            render status: 201,
                json: user
            return
        else 
            render status: 422,
                json: user.errors
            return
        end
    end

    def get_user_by_email
        username = params[:username]
        email = get_email(username)
        if email_exists?(email)
            render status: 200,
                json: @user
            return
        else
            render status: 200,
                json: { response: "Email #{user_params[:email]} is not registered in the system." }, root: 'user'
            return
        end
    end

    def email_exists
        username = params[:username]
        email = get_email(username)
        if email_exists?(email)
            render status: 409,
                json: { response: "User already registered with email #{user_params[:email]}.\r\nPlease register with a different email." }, root: 'user'
            return
        end

        render status: 200,
            json: { response: "Email #{user_params[:email]} is not registered in the system." }, root: 'user'
        return
    end

private

    def user_params
        @user_params ||= params.permit(:id, :email, :first_name, :last_name, 
                      :password, :password_confirmation)
    end
end
