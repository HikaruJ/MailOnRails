class MessageCategory < ActiveRecord::Base
    belongs_to :message
    belongs_to :message_type
end
