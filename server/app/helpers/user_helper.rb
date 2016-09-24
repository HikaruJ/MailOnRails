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

    def serialize_user(user)
        UserSerializer.new(user)
    end

    def serialize_users(users)
        ActiveModel::Serializer::CollectionSerializer.new(users, each_serializer: UserSerializer)
    end
end
