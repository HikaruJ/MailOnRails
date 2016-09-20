class AddUserToMessages < ActiveRecord::Migration
  def change
    add_reference :messages, :user, index: true

    change_table :messages do |t|
      add_foreign_key(:messages, :users)
    end
  end
end
