module MessageHelper
    include UserHelper 

    def add_welcome_message(user)
        @message = user.messages.build
        @name = "#{user.first_name} #{user.last_name}"
        
        @message.from = "admin@#{DOMAIN}"
        @message.to = @email
        @message.body = "Hi #{@name},

        Thank you for signing up to use the MailOnRails email service.

        We founded MailOnRails because we wanted to create a trustworthy and inspiring email client 
        from which you could do everything that is needed for your daily work.

        We hope you will enjoy the service and recommend it to your friends."

        @message.subject = "Welcome to MailOnRails"
        @message.save

        @inboxCategory = @message.message_categories.build
        @inboxCategory.message_type = MessageType.inbox.first
        @inboxCategory.save
    end
end
