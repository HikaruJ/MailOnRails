class RootController < ApplicationController
  clear_respond_to
  respond_to :json

  def index
    render json: 'Please check API documentation', root: 'errors'
  end
end