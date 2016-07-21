class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages, :id => false do |t|
      ## Primary key
      t.integer :id, :limit => 8

      ## Fields
      t.string :subject
      t.text :body

      t.timestamps
    end
  end
end
