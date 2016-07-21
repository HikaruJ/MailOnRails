class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :doorkeeper

  validates :first_name,  presence: true, length: { maximum: 35 }
  validates :last_name, presence: true, length: { maximum:35 }

  has_one :token, -> { order 'created_at DESC' }, class_name: Doorkeeper::AccessToken, foreign_key: :resource_owner_id
  has_many :user_messages

  self.primary_key = "id"
end
