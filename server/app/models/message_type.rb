class MessageType < ActiveRecord::Base
    scope :inbox, -> { where(type_name: 'inbox') }
    scope :sent, -> { where(type_name: 'sent') }
    scope :drafts, -> { where(type_name: 'drafts') }
    scope :trash, -> { where(type_name: 'trash') }
    scope :spam, -> { where(type_name: 'spam') }
end
