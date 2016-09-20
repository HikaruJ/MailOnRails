module UserHelper
    DOMAIN = 'mailonrails.com'

    def add_welcome_message(username, user_params)
        @email = "#{username}@#{DOMAIN}"
        @user = User.find_by_email(@email.downcase)
        @message = @user.messages.build
        @name = "#{user_params[:first_name]} #{user_params[:last_name]}"
        
        @message.from = "admin@#{DOMAIN}"
        @message.to = @email
        @message.body = "Hi #{@name},

        Thank you for signing up to use the MailOnRails email service.

        We founded MailOnRails because we wanted to create a trustworthy and inspiring email client 
        from which you could do everything that is needed for your daily work.

        We hope you will enjoy the service and recommend it to your friends."

        @message.subject = "Welcome to MailOnRails"
        @message.save

        @messageType = MessageType

        @messageType.message_type = 
    end

    def email_exists?(username)
        @email = "#{username}@#{DOMAIN}"
        user_params[:email] = @email
        @user = User.find_by_email(@email.downcase)
        if @user.present?
            return true
        end

        return false
    end
end
