require 'spec_helper'

feature 'Authentication', js: true do
  feature 'login' do
    scenario 'with valid inputs' do
      @user = build(:user)
      visit 'http://mailonrails.com:9000/login'
      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Login").click

      expect(page).to have_content('Sign out')
    end
  end
end