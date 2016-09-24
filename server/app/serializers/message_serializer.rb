class MessageSerializer < ActiveModel::Serializer
  attributes :bcc, :body, :cc, :created_at, :displayId, :from, :is_read, :subject, :to   
end