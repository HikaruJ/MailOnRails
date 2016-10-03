class Api::V1::BaseController < ApplicationController
  clear_respond_to
  respond_to :json

  before_action :doorkeeper_authorize!
  before_action :authenticate_user!

  rescue_from ActiveRecord::RecordNotFound do |e|
    render json: errors_json(e.message), status: :not_found
  end

private

  def authenticate_user!
    if doorkeeper_token
      existing_user = current_user
    end

    return if existing_user

    render json: { errors: ['User is not authenticated!'] }, status: :unauthorized
  end

  def current_user
    @current_user ||= User.find(doorkeeper_token.resource_owner_id)
  end

  def errors_json(messages)
    { errors: [*messages] }
  end
end