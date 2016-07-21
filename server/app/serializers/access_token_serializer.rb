class AccessTokenSerializer < ActiveModel::Serializer
  attributes :token, :expires_in_seconds
end