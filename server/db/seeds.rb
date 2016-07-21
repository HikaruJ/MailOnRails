# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

## Populate Message types table
message_types = ['inbox', 'sent', 'drafts', 'trash', 'spam']

message_types.each do |name|
  MessageType.create!( type_name: name)
end