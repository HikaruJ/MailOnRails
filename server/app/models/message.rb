class Message < ActiveRecord::Base
    belongs_to :user
    has_many :message_categories

    has_many :children, after_add: :set_user_id, class_name: 'Message', dependent: :destroy, foreign_key: 'parent_message_id' 
    belongs_to :parent, class_name: 'Message', foreign_key: 'parent_message_id' 

private 

    def set_user_id(child)
        child.user_id = child.parent.user_id
    end
end
