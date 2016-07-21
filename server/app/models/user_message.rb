class UserMessage < ActiveRecord::Base
    belongs_to :user
    has_one :message
    has_one :message_type
end
