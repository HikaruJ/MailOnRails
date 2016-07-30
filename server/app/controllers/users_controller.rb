class UsersController < Devise::RegistrationsController
    respond_to :json

    def create
        if email_exists?
            render status: 409,
                json: { response: "User already registered with email #{user_params[:email]}.\r\nPlease register with a different email." }
            return
        end

        @user = User.new(user_params)
        @user.save

        if doorkeeper_oauth_client and @user
            @access_token ||= Doorkeeper::AccessToken.create!(application_id: DOORKEEPER_APP_ID, resource_owner_id: @user.id, scopes: "public write preferences", use_refresh_token: true, expires_in: Doorkeeper.configuration.access_token_expires_in)
            render status: 201,
                json: { response: Doorkeeper::OAuth::TokenResponse.new(@access_token).body.merge(user: @user) }
            return
        else 
            warden.custom_failure!
            render json: { response: @user.errors, success: false }, status: 422
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
        @user = User.find_by_email(params[:email].downcase)
        if @user.present?
            return true
        end

        return false
    end

    def user_params
        params.permit(:id, :email, :first_name, :last_name, 
                      :password, :password_confirmation)
    end
end
