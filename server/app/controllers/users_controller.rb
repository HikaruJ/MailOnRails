class UsersController < Devise::RegistrationsController
    respond_to :json

    DOMAIN = 'mailonrails.com'

    def create
        if email_exists?
            render status: 409,
                json: { response: "User already registered with email #{user_params[:email]}.\r\nPlease register with a different email." }
            return
        end

        user_params[:email] = @email
        @user = User.new(user_params)
        @user.save

        if doorkeeper_oauth_client and @user
            @access_token = doorkeeper_access_token(@user)
            render status: 201,
                json: { response: Doorkeeper::OAuth::TokenResponse.new(@access_token).body.merge(user: @user) }
            return
        else 
            render json: { response: @user.errors, success: false }, status: 422
        end
    end

    def get_user_by_email
        if email_exists?
            render status: 200,
                json: { response: {user: @user} }
            return
        else
            render status: 200,
                json: { response: "Email #{user_params[:email]} is not registered in the system." }
            return
        end
    end

    def email_exists
        if email_exists?
            render status: 409,
                json: { response: "User already registered with email #{user_params[:email]}.\r\nPlease register with a different email." }
            return
        end

        render status: 200,
            json: { response: "Email #{user_params[:email]} is not registered in the system." }
        return
    end

private

    def email_exists?
        @email = "#{params[:username]}@#{DOMAIN}"
        user_params[:email] = @email
        @user = User.find_by_email(@email.downcase)
        if @user.present?
            return true
        end

        return false
    end

    def user_params
        @user_params ||= params.permit(:id, :email, :first_name, :last_name, 
                      :password, :password_confirmation)
    end
end
