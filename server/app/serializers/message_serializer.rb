class MessageSerializer < ActiveModel::Serializer
  attributes :bcc, :body, :cc, :created_at, :display_id, :from, :is_read, :subject, :to, :type_id, :type_name  
  
  def type_id
    message_category = MessageCategory.where(message_id: object.id).first
    return message_category.message_type_id
  end

  def type_name
    message_category = MessageCategory.where(message_id: object.id).first
    message_type = MessageType.where(id: message_category.message_type_id).first
    return message_type.type_name
  end
end