class Api::V1::CardsController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def create
        card = Card.new(card_params)
        card.deck_id = params[:deck_id]

        if card.save
            render json: card
        else
            render json: {error: card.errors.full_messages}, status: :unprocessable_entity            
        end
    end

    private

    def card_params
        params.require(:card).permit(:question, :answer, :difficulty)
    end
end