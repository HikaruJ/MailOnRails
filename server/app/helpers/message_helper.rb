module MessageHelper
    include UserHelper 

    require 'securerandom'

    def add_welcome_message(user)
        message = user.messages.build
        name = "#{user.first_name} #{user.last_name}"
        
        message.from = "admin@#{DOMAIN}"
        message.to = @email
        message.body = "<p>Hi #{name},<p>

        <p>Thank you for signing up to use the MailOnRails email service.</p>
        
        <p>We founded MailOnRails because we wanted to create a trustworthy and inspiring email client</p>
        <p>from which you could do everything that is needed for your daily work.</p>
        <p>We hope you will enjoy the service and recommend it to your friends.</p>".html_safe

        message.subject = "Welcome to MailOnRails"
        message.display_id = SecureRandom.uuid
        message.save

        inboxCategory = message.message_categories.build
        inboxCategory.message_type = MessageType.inbox.first
        inboxCategory.save
    end

    def serialize_message(message)
        MessageSerializer.new(message)
    end

    def serialize_messages(messages)
        ActiveModel::Serializer::CollectionSerializer.new(messages, each_serializer: MessageSerializer, key_transform: :camel_lower)
    end
end
