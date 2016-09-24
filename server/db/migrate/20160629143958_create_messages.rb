class CreateMessages < ActiveRecord::Migration
  require 'securerandom'

  def change
    create_table :messages do |t|
      ## Fields
      t.string :from, limit: 254
      t.string :to, limit: 254
      t.string :bcc, limit: 254
      t.string :cc, limit: 254
      t.string :subject, limit: 78
      t.text :body, limit: 5000
      t.boolean :is_read, default: false
      t.integer :parent_message_id
      t.uuid :displayId, default: SecureRandom.uuid

      t.timestamps
    end
  end
end
