FactoryGirl.define do

  factory :user do
    username "foo"
    password "123456"
    email { "#{username}@example.com" }
  end
end