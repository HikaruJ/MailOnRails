class CreateMessageCategories < ActiveRecord::Migration
  def change
    create_table :message_categories do |t|
      t.integer :message_type_id

      t.timestamps
      
      t.references :message
    end
  end
end
