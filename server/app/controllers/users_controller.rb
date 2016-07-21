class UsersController < Devise::RegistrationsController
    respond_to :json

    def create
        @user = User.new(user_params)
        if doorkeeper_oauth_client
            if @user.save
                @access_token ||= Doorkeeper::AccessToken.create!(application_id: DOORKEEPER_APP_ID, resource_owner_id: @user.id, scopes: "public write preferences", use_refresh_token: true, expires_in: Doorkeeper.configuration.access_token_expires_in)
                render status: 201,
                    json: Doorkeeper::OAuth::TokenResponse.new(@access_token).body.merge(user: @user)
                return
            else 
                warden.custom_failure!
                render json: { success: false, error: @user.errors }, status: 422
            end
        else 
            render status: 400
        end
    end

private

    def user_params
        params.permit(:client_id, :client_secret, :email, :first_name, :last_name, 
                      :password, :password_confirmation)
    end
end
