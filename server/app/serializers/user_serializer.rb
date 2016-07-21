class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email
  has_one :token, serializer: AccessTokenSerializer
end