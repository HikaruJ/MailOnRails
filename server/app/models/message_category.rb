class MessageCategory < ActiveRecord::Base
    belongs_to :message
    belongs_to :message_type

    validates :message_type_id, presence: { message: "Cannot save message category without a message type" }
end
