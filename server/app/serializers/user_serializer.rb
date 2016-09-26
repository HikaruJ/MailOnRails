class UserSerializer < ActiveModel::Serializer
  attributes  :email, :first_name, :id, :last_name, :token
  has_one :token, serializer: AccessTokenSerializer
end