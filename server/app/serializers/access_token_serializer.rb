class AccessTokenSerializer < ActiveModel::Serializer
  attributes :expires_in_seconds, :token, :refresh_token 
end