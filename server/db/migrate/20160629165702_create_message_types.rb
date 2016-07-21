class CreateMessageTypes < ActiveRecord::Migration
  def change
    create_table :message_types do |t|
      t.string :type_name

      t.timestamps
    end
  end
end
