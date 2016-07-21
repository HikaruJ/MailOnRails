class CreateUserMessages < ActiveRecord::Migration
  def change
    create_table :user_messages, :id => false do |t|
      ## Primary key
      t.integer :id, :limit => 8

      ## Fields
      t.integer :user_id, :limit => 8
      t.integer :message_id, :limit => 8
      t.integer :message_type_id
      t.boolean :is_read

      t.timestamps
    end
  end
end
