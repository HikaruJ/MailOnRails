class ApplicationController < ActionController::API
    include ActionController::ImplicitRender
    include ActionController::MimeResponds
    include ActionController::RequestForgeryProtection

    protect_from_forgery
    
    def doorkeeper_oauth_client
        @client = Doorkeeper::Application.find_by_name(DOORKEEPER_APP_NAME)
        if @client.nil?
            @client = Doorkeeper::Application.new(:name => DOORKEEPER_APP_NAME, :redirect_uri => DOORKEEPER_APP_URL)
            @client.save
        end

        return @client
 	end

    def doorkeeper_access_token(user)
        byebug
        @token ||= Doorkeeper::AccessToken.create!(application_id: DOORKEEPER_APP_ID, resource_owner_id: user.id, scopes: "public write preferences", use_refresh_token: true, expires_in: Doorkeeper.configuration.access_token_expires_in) if current_user
    end
end
