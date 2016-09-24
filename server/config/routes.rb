Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users, controllers: { registrations: 'users' }

  devise_scope :user do
    post 'users/get_user_by_email', :to => 'users#get_user_by_email'
    post 'users/email_exists', :to => 'users#email_exists'
  end

  namespace :api, defaults: {format: "json"} do
    namespace :v1 do
      resources :compose
      resources :inbox
    end
  end
  
  root to: 'root#index'

  #match '*path', via: [:options], to:  lambda {|_| [204, {'Content-Type' => 'text/plain'}, []]}
end