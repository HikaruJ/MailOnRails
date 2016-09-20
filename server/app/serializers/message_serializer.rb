class UserSerializer < ActiveModel::Serializer
  attributes :from, :to, :bcc, :cc, :subject, :body, :is_read
end