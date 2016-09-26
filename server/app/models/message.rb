class Message < ActiveRecord::Base
    before_create :set_display_id

    belongs_to :user
    has_many :message_categories, dependent: :destroy

    has_many :children, after_add: :set_user_id, class_name: 'Message', dependent: :destroy, foreign_key: 'parent_message_id' 
    belongs_to :parent, class_name: 'Message', foreign_key: 'parent_message_id' 

    validates :body, presence: { message:'Cannot save a message without content' }, length: { minimum: 2, maximum: 1000 }
    validates :to, presence: { message:'Cannot save a message without recipient' }, length: { minimum: 2, maximum: 254 }
    validates :from, presence: { message:'Cannot save a message without a sender' }, length: { minimum: 2, maximum: 254 }
    validates :subject, presence: { message:'Cannot save a message without a subject' }, length: { minimum: 2, maximum: 78 }

    scope :inbox, -> { includes(:message_categories).where('message_categories.message_type_id' => MessageType.inbox) }
    scope :sent, -> { includes(:message_categories).where('message_categories.message_type_id' => MessageType.sent) }
    scope :drafts, -> { includes(:message_categories).where('message_categories.message_type_id' => MessageType.drafts) }
    scope :trash, -> { includes(:message_categories).where('message_categories.message_type_id' => MessageType.trash) }
    scope :spam, -> { includes(:message_categories).where('message_categories.message_type_id' => MessageType.spam) }

private 

    def set_display_id
        self.display_id = SecureRandom.uuid
    end

    def set_user_id(child)
        child.user_id = child.parent.user_id
    end
end
