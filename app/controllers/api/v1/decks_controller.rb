class Api::V1::DecksController < ApplicationController  
    protect_from_forgery unless: -> { request.format.json? }
  
    def index
      render json: Deck.order("created_at DESC")
    end
end