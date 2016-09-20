module UserHelper
    def email_exists?(email)
        @user = User.find_by_email(email.downcase)
        if @user.present?
            user_params[:email] = email
            return true
        end

        return false
    end

    def get_email(username)
        @email = "#{username}@#{DOMAIN}"
    end 
end
